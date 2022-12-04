const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

app.use(cors({
  origin: "https://pizzadelivery.onrender.com",
  credentials: true
}))

const connectDB = require("./config/config");
require("colors");
const morgan = require("morgan");

//config dotenv
dotenv.config();

//connection mongodb
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/pizzas", require("./routes/pizzaRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Hello From Node Server vai nodemon</h1>");
  });
}

const port = process.env.PORT || 5000;
if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"))
}
app.listen(port, () => {
    console.log("SERVER R UNNING")
});
