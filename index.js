// Dependencies
const http = require("http");

// Configs
const port = process.env.PORT || 3000;
const app = require("./app");
const server = http.createServer(app);


server.listen(port, () => {
    console.log("running on port " + port);
});