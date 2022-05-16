const app = require("./app");
const config = require("./config");

// Listens to the specified port number
// Separated from app for testing purposes
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
