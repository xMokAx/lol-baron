module.exports = {
  apps: [
    {
      name: "lol-next",
      script: "yarn start"
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-18-196-101-204.eu-central-1.compute.amazonaws.com",
      key: "C:/Users/Moka/.ssh/lol-app.pem",
      ref: "origin/master",
      repo:
        "https://git-codecommit.eu-central-1.amazonaws.com/v1/repos/lol-next",
      path: "/home/ubuntu/lol-next",
      "post-deploy":
        "yarn install && yarn build && pm2 startOrRestart ecosystem.config.js"
    }
  }
};
