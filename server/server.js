require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const multer = require('multer');
const path = require("path");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.DB_URL, { })
  .then(() => {
       console.log("Connected to Database");
  })
  .catch(() => {
       console.log("Database disconnected");
  });

app.use('/api', routes);

let PORT = process.env.PORT || 3300;

app.listen(PORT, function() {
    console.log("Server started on port: " + PORT);
});
