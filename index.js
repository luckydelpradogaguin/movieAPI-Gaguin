const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_STRING);

//Routes Middleware
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas")
);

if (require.main === module) {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
  });
}

module.exports = { app, mongoose };
