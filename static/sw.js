// Initialize offline google analytics which will store failed analytics requests and try again later when connection is back
// it will also cache the analytics.js library
workbox.googleAnalytics.initialize({
  // using a custom dimension(cd1) to track online vs. offline interactions
  parameterOverrides: {
    cd1: "offline"
  },
  // Using a custom metric to track time requests spent in the queue
  hitFilter: params => {
    const queueTimeInSeconds = Math.round(params.get("qt") / 1000);
    params.set("cm1", queueTimeInSeconds);
  }
});
