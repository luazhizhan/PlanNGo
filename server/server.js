const express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

const dbConfig = require("./configs/dbConfig");
const connection = require("./helpers/connection");
const query = require("./helpers/query");

const app = express();

app.use(bodyParser.json());
app.use(methodOverride());

app.get("/", (_req, res) => {
  res.json("Hello world");
});

app.get("/user-info", async (_req, res) => {
  const conn = await connection(dbConfig).catch(e => {});
  const results = await query(conn, "select * from userInfo;").catch(
    console.log
  );
  res.json(results);
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), function() {
  console.log("listening to Port", app.get("port"));
});
