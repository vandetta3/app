const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const routes = require("./routeApi");
////middleware
app.use(bodyParser.json());
app.use("/api", routes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
