const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: 'https://pizzadelivery.onrender.com',
  credentials: true,
  optionSuccessStatus:200,
}))

const connectDB = require("./config/config");
require("colors");

const morgan = require("morgan");

//config dotenv
dotenv.config();

//connection mongodb
connectDB();



//middlewares
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/pizzas", require("./routes/pizzaRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoute"));

  app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', function (req, res) {
     res.sendFile(path.join(__dirname, 'build', 'index.html'));
   });

  app.get("/", (req, res) => {
    res.send("<h1>Hello From Node Server vai nodemon</h1>");
  });


const port = process.env.PORT || 5000;
if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"))
}
app.listen(port, () => {
    console.log("SERVER RUNNING")
});
