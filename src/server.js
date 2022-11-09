// const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const port = require("./config/constant").PORT
const dbURI = require("./config/constant").mongoURI;
const cors = require('cors')
const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://improperties.herokuapp.com",
  ],
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use( cors(corsOptions));



app.use(express.urlencoded({ limit: "1000000mb", extended: true }));
app.use(express.json({ limit: "1000000mb", extended: true }));


//MongoDB connection
const conn = mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true,

  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", (req, res) => {
  return res.status(200).send("We're up and running!!");
});
app.use("/api/auth", require("./routes/authRoutes/authUserRoutes"));
app.use("/api/user", require("./routes/userRoutes/userRoute"));
app.use("/api/property", require("./routes/propertyRoutes/propertyRoute"));
app.use("/api/blog", require("./routes/blogRoutes/blogRoute"));

app.use("*", (req, res) => {
  return res.status(404).json({ error: { messgage: "Route Not Found" } });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("Server Running on port " + PORT);
});