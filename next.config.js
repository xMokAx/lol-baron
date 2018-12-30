const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withOffline = require("next-offline");

module.exports = withPlugins([
  withCss,
  withSass,
  [
    withOffline,
    {
      workboxOpts: {
        globPatterns: ["static/**/*"],
        globDirectory: ".",
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /(?:lolapi|ggapi)/,
            handler: "networkFirst",
            options: {
              cacheName: "lol-gg-api",
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              matchOptions: {
                ignoreSearch: true
              }
            }
          },
          {
            urlPattern: /(http:\/\/localhost:3000\/)|((\/)(champions|champion|overview|statistics)(\/)(platplus|platinum|gold|silver|bronze))|((\/summoner\/)(eune|euwest|na|ru|br|kr|jp|tr|lan|las|oce|pbe))/gi,
            handler: "networkFirst",
            options: {
              cacheName: "html-pages",
              networkTimeoutSeconds: 6,
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              matchOptions: {
                ignoreSearch: true
              }
            }
          },
          {
            // must match the full url if it's not the same origin
            urlPattern: /^https:\/\/ddragon\.leagueoflegends\.com/,
            handler: "cacheFirst",
            options: {
              cacheName: "ddragon-images",
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "staleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets"
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: "cacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ]
      }
    }
  ]
]);
