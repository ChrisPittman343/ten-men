const app = require("./app");

// Listens to the specified port number
// Separated from app for testing purposes
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
