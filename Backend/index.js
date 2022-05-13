const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const path = require("path");
const postRoute = require("./routes/post");
app.use(express.json());
dotenv.config({ path: "./config/.env" });
require("./DB/db");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/posts", postRoute);
app.use(express.static(path.join(__dirname, "images")));

app.listen(7000, () => {
  console.log("Backend server is running!");
});
