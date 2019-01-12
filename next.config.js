const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withOffline = require("next-offline");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withPlugins([
  [
    withBundleAnalyzer,
    {
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "../bundles/server.html"
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "../bundles/client.html"
        }
      }
    }
  ],
  withCss,
  withSass,
  [
    withOffline,
    {
      // generate service worker in dev mode
      // generateInDevMode: true,
      workboxOpts: {
        // Files matching against any of these patterns will be included in the precache manifest.
        globPatterns: ["static/site.webmanifest", "static/browserconfig.xml"],
        // The base directory you wish to match globPatterns against, relative to the current working directory.
        globDirectory: ".",
        // Whether or not the service worker should skip over the waiting lifecycle stage
        skipWaiting: true,
        // Whether or not the service worker should start controlling any existing clients as soon as it activates.
        clientsClaim: true,
        // A required list of JavaScript files that should be passed to importScripts() inside the generated service worker file.
        importScripts: ["sw.js"],
        runtimeCaching: [
          {
            urlPattern: "/",
            handler: "networkFirst",
            options: {
              cacheName: "home-page",
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              },
              matchOptions: {
                ignoreSearch: true
              }
            }
          },
          {
            urlPattern: /((\/)(champions|champion|overview|statistics)(\/)(platplus|platinum|gold|silver|bronze))|((\/summoner\/)(eune|euwest|na|ru|br|kr|jp|tr|lan|las|oce|pbe))/,
            handler: "networkFirst",
            options: {
              cacheName: "html-cache",
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 * 15
              },
              matchOptions: {
                ignoreSearch: true
              }
            }
          },
          {
            urlPattern: /(?:lolapi|ggapi)/,
            handler: "networkFirst",
            options: {
              cacheName: "lol-gg-api",
              networkTimeoutSeconds: 8,
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              matchOptions: {
                ignoreSearch: true
              }
            }
          },
          {
            // urlPattern: /^((?!\/static).)*\.(?:png|jpg|jpeg|svg|gif)$/,
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|ico)/,
            handler: "cacheFirst",
            options: {
              cacheName: "image-cache",
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
          },
          {
            urlPattern: /^https:\/\/www\.googletagmanager\.com/,
            handler: "networkFirst",
            options: {
              cacheName: "gtm-cache",
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }
  ]
]);
