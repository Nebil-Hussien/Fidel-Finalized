// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").parse();
// }
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const dotenv = require("dotenv");

const config = require("./db");
dotenv.config({ path: "./.env" });

//mongodb connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
const publicVapidKey =
  "BEa0jYyRbEmVJF7hg-oMlhyeaKMPucV6Iw0Y1fifK21c3vVb5q8CYt4YDkmr6MtImqomDwzMOR0H8UOumu1Rkdk";
const privateVapidKey = "JzFZMQYUUHufCBfg7Ydn3jBCUQgdvC_FPzZYGV5GwO8";
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", (error) => console.log("Connected to MongoDB"));

module.exports = () => {
  let server = express(),
    create,
    start;
  let app;

  // const httpServer = http.createServer(server);
  // const io = socketIo.listen(server);

  create = (config) => {
    let routes = require("../routes");

    // mysql.createConnection(dbOptions);

    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);

    server.use(cors());
    app = require("http").createServer(server);
    const io = require("socket.io")(app, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    server.use(express.static("public"));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use((req, res, next) => {
      res.io = io;
      next();
    });
    server.use(function (err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res.status(err.status).send({ message: err.message });
        logger.error(err);
        return;
      }
      next();
    });
    routes.init(server);
  };
  start = async () => {
    let hostname = server.get("hostname");
    port = server.get("port");
    app.listen(port, async () => {
      console.log(" FIDEL API running - http://" + hostname + ":" + port);
    });
  };

  return {
    create: create,
    start: start,
  };
};
