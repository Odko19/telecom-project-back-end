const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/officeList.route");
const routerImage = require("./routes/mail.route");
const routerLoginUser = require("./routes/user.auth.route");
const PORT = process.env.PORT;

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/v1", router);
app.use("/v1", routerImage);
app.use("/v1", routerLoginUser);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log("Running server" + " " + PORT);
});
