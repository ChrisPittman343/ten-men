const config = {
  secret: process.env.SECRET,
  port: process.env.PORT,
  dev: process.env.NODE_ENV === "development",
  password: process.env.PASSWORD,
  steamURL: "https://steamcommunity.com/my/gcpd/730/?tab=matchhistoryscrimmage",
};

module.exports = config;
