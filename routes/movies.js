const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movies");
const { verify } = require("../auth");

// [add movie]
router.post("/addMovie", verify, movieController.addMovie);

// [get all movies]
router.get("/getMovies", movieController.getAllMovies);

// [get movie by id]
router.get("/getMovie/:id", movieController.getMovieById);

// [update movie]
router.patch("/updateMovie/:id", verify, movieController.updateMovieById);

// [delete movie]
router.delete("/deleteMovie/:id", verify, movieController.deleteMovieById);

// [add movie comment]
router.patch("/addComment/:id", verify, movieController.addMovieComment);

// [get movie comments]
router.get("/getComments/:id", movieController.getMovieComments);

module.exports = router;
