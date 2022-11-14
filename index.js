const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./controller/office-list");

require("dotenv").config();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use("/v1", router);


app.listen(PORT, () => {
    console.log("Running server" + " " + PORT);
  });