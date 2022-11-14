const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/officeList.route");
const routerImage= require("./routes/image.route")

require("dotenv").config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/v1", router);
app.use("/v2", routerImage);


app.listen(PORT, () => {
    console.log("Running server" + " " + PORT);
  });