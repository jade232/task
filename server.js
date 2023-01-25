const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { router } = require("./routes/routes");
const cors = require("cors");

const app = express();
const port = process.env.PORT;
const db_url = process.env.db_connecting_url;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(db_url)
  .then(() => {
    console.log(`Database connected Successfully`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server running in the port: ${port}`);
});

app.use("/jd/test", router);
