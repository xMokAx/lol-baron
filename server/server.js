const next = require("next");
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cookieSession = require("cookie-session");
const { join } = require("path");

const appSecret = "lolgga11jm23j";

const ggElo = ["platplus", "platinum", "gold", "silver", "bronze"];

const regions = [
  "eune",
  "euwest",
  "na",
  "ru",
  "br",
  "kr",
  "jp",
  "tr",
  "lan",
  "las",
  "oce",
  "pbe"
];
const sortProps = [
  "gameName",
  "role",
  "winRate",
  "playRate",
  "banRate",
  "averageGames",
  "kills",
  "deaths",
  "assists",
  "largestKillingSpree",
  "damageComposition.total",
  "totalDamageTaken",
  "totalHeal",
  "minionsKilled",
  "neutralMinionsKilledEnemyJungle",
  "neutralMinionsKilledTeamJungle",
  "goldEarned",
  "positions.overallPerformanceScore",
  "positions.overallPerformanceScoreDelta"
];

const roleFilters = ["all", "top", "middle", "jungle", "adc", "support"];

const orderFilters = ["descend", "ascend"];

//  an object with the urls to be proxied
const proxy = {
  "/lolapi": {
    target: "http://localhost:5000/"
    // pathRewrite: { "^/lolapi": "/" },
    // changeOrigin: true
  },
  "/ggapi": {
    target: "http://localhost:5000/"
  }
};

const dev = process.env.NODE_ENV !== "production";
// pass dev === true to next
const app = next({
  dev
});
const handle = app.getRequestHandler();
// const serveStatic = app.serveStatic();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());
    // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
    // Helmet is actually just a collection of nine smaller middleware functions that set security-related HTTP headers
    server.use(helmet());
    // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
    server.use(bodyParser.json());
    // Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
    server.use(cookieParser(appSecret));

    server.use((req, res, next) => {
      // first time the user send a request there is no cookies
      const signedCookie = req.signedCookies.lolggapi;
      if (!signedCookie) {
        // console.log("NO COOKIE");
        // create a jwt
        // const timestamp = new Date().getTime();
        // no need for iat: timestamp ia is includedby default
        // , {expiresIn: "30d"} no need to provide this option because the cookie will expire in 30 days anyway
        let token = jwt.sign(
          {
            sub: "appjwt"
          },
          appSecret
        );
        // Express headers are auto converted to lowercase
        // appened it to the request to verify the user to the api server
        req.headers["x-access-token"] = token;
        res.cookie("lolggapi", token, {
          maxAge: 2592000000,
          httpOnly: true,
          signed: true
        });
        next();
      } else {
        // if the user has the lolggapi cookie we know he used our app before and jump to the next middleware
        // console.log("SIGNED COOKIE:", signedCookie);
        next();
      }
    });

    server.use(
      cookieSession({
        name: "session",
        keys: [appSecret],

        // Cookie Options
        maxAge: 2592000000
      })
    );

    // Set up the proxy.
    if (proxy) {
      const proxyMiddleware = require("http-proxy-middleware");
      Object.keys(proxy).forEach(function(context) {
        server.use(proxyMiddleware(context, proxy[context]));
      });
    }

    server.post("/pref", (req, res) => {
      req.session = req.body;
      return res.end("Preferences were set successfully");
    });

    const lolMiddleware = (req, res, next) => {
      const { prefRegion } = req.session;
      // if the region is wrong
      if (!regions.includes(req.params.region)) {
        // use the prefRegion or the default "eune"
        const region = prefRegion || "eune";
        const { summonerName } = req.params;
        const redirect = `/summoner/${region}/${summonerName}`;
        // redirect the user to the right url
        return res.redirect(redirect);
      } else {
        next();
      }
    };

    server.get("/summoner/:region/:summonerName", lolMiddleware, (req, res) => {
      // the page we want to render
      const actualPage = "/summoner";

      let { region, summonerName } = req.params;
      // make sure summoner name only includes uni code characters, numbers, _ , .
      summonerName = summonerName
        .toLowerCase()
        .replace(new RegExp("([^0-9_.\\p{L}]+)", "giu"), "");
      // without babel node supports this .replace(/([^0-9_.\\p{L}]+)/giu, "");

      // make sure the region only contains characters from a to z
      region = region.toLowerCase().replace(/([^a-z]+)/gi, "");

      const queryParams = {
        region,
        summonerName
      };
      // render the page with the needed parameters
      app.render(req, res, actualPage, queryParams);
    });

    const ggMiddleware = (req, res, next) => {
      let redirect,
        selectedElo,
        shouldRedirect = false;

      const { prefElo } = req.session;
      let { elo } = req.params;
      elo = elo.toLowerCase();
      selectedElo = elo;
      // if the elo is wrong
      if (!ggElo.includes(elo)) {
        // set should redirect to true
        shouldRedirect = true;
        // use the prefElo or default platplus to redirect to
        redirect = prefElo || "platplus";
        selectedElo = prefElo || "platplus";
      }
      // if shouldRedirect is true and champion page is requested
      if (shouldRedirect && req.originalUrl.includes("/champion/")) {
        let { champName, role } = req.params;
        champName = champName.replace(/([^a-z]+)/gi, "").toLowerCase();
        role = role.replace(/([^a-z]+)/gi, "");
        // set redirect to this link
        redirect = `/champion/${selectedElo}/${champName}/${role}`;
        // if the statistics page is requested
      } else if (req.originalUrl.includes("/statistics")) {
        let sortBy = req.query.sortBy || "winRate";
        let order = req.query.order ? req.query.order.toLowerCase() : "descend";
        let roleFilter = req.query.roleFilter
          ? req.query.roleFilter.toLowerCase()
          : "all";
        let search = req.query.search ? req.query.search.toLowerCase() : "";
        // if sortBy is wrong
        if (!sortProps.includes(sortBy)) {
          shouldRedirect = true;
          // set it to the default winRate
          sortBy = "winRate";
        }
        // if order is wrong
        if (!orderFilters.includes(order)) {
          shouldRedirect = true;
          // set it to ascend or descend depending on sortBy
          order =
            sortBy === "gameName" ||
            sortBy === "role" ||
            sortBy === "positions.overallPerformanceScore" ||
            sortBy === "deaths"
              ? "ascend"
              : "descend";
        }
        // if roleFilter is wrong
        if (!roleFilters.includes(roleFilter)) {
          shouldRedirect = true;
          // set it to the default all
          roleFilter = "all";
        }
        // if there is search and it contains anything except letters from a to z and space
        if (search && search.match(/([^a-z ]+)/gi)) {
          shouldRedirect = true;
          // replace unwanted characters
          search = search.toLowerCase().replace(/([^a-z ]+)/gi, "");
        }
        if (shouldRedirect) {
          search = search ? `&search=${search}` : "";
          // set redirect to this link
          redirect = `/statistics/${selectedElo}?sortBy=${sortBy}&order=${order}&roleFilter=${roleFilter}${search}`;
        }
      }
      // if redirect is true
      if (shouldRedirect) {
        // set it to false
        shouldRedirect = false;
        // redirect the user to the right url
        return res.redirect(redirect);
      } else {
        next();
      }
    };

    server.get("/champions/:elo", ggMiddleware, (req, res) => {
      const actualPage = "/champions";

      let { elo } = req.params;
      elo = elo.toLowerCase();
      const queryParams = {
        elo
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/champion/:elo/:champName/:role", ggMiddleware, (req, res) => {
      const actualPage = "/champion";

      let { elo, champName, role } = req.params;
      elo = elo.toLowerCase();
      champName = champName.replace(/([^a-z]+)/gi, "").toLowerCase();
      role = role.replace(/([^a-z]+)/gi, "");

      const queryParams = {
        elo,
        champName,
        role
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/overview/:elo", ggMiddleware, (req, res) => {
      const actualPage = "/overview";

      let { elo } = req.params;
      elo = elo.toLowerCase();
      const queryParams = {
        elo
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/statistics/:elo", ggMiddleware, (req, res) => {
      const actualPage = "/statistics";

      let { elo } = req.params;
      elo = elo.toLowerCase();
      let sortBy = req.query.sortBy || "winRate";
      let order = req.query.order ? req.query.order.toLowerCase() : "descend";
      let roleFilter = req.query.roleFilter
        ? req.query.roleFilter.toLowerCase()
        : "all";
      let search = req.query.search ? req.query.search.toLowerCase() : "";
      const queryParams = {
        elo,
        sortBy,
        order,
        roleFilter,
        search
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/service-worker.js", (req, res) => {
      const filePath = join(__dirname, "../", ".next", "service-worker.js");
      res.set("Cache-Control", "no-cache");
      app.serveStatic(req, res, filePath);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.use((err, req, res, next) => {
      // if there is an error caused by bad url
      if (err instanceof URIError) {
        // set error message
        err.message = "Failed to decode param: " + req.url;
        // set error status code
        err.status = err.statusCode = 400;
        // redirect the user to the same url but it will be encoded
        return res.redirect(`http://${req.get("Host")}${req.url}`);
        // return app.render(req, res, "/_error")
      }
    });

    // server listens at port 3000
    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    // if any eror is catched in the app log its stack and exit the process
    console.error(ex.stack);
    process.exit(1);
  });
