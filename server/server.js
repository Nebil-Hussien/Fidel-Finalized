const server = require("./configs/app");
const config = require("./configs/config/config");
require("./configs/db");

//create the basic server setup for
server.create(config);

//start the server
server.start();
