const express = require("express");
const router = require("./router/");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config({ path: __dirname + "/../.env" });

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds149885.mlab.com:49885/hotels`,
  {
    useNewUrlParser: true
  }
);

const app = express();

app.use(cors());

router(app);

app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is up on ${process.env.SERVER_PORT}`);
});
