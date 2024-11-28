const express = require("express");
const router = express.Router();
const Movie = require("../models/Movies");
const { errorHandler } = require("../auth");

// [add movie]
module.exports.addMovie = async (req, res) => {
  try {
    const { title, director, year, description, genre } = req.body;
    const newMovie = new Movie({ title, director, year, description, genre });
    const savedMovie = await newMovie.save();
    return res.status(201).send(savedMovie);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// [get all movies]
module.exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).lean().exec();
    return res.status(200).send({ movies: movies });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// [get movie by id]
module.exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean().exec();
    return res.status(200).send(movie);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// [update movie by id]
module.exports.updateMovieById = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).send({
      message: "Movie updated successfully",
      updatedMovie: updatedMovie,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// [delete movie by id]
module.exports.deleteMovieById = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: "Movie deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// [add movie comment]
module.exports.addMovieComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const userId = req.user.id; // Assuming `req.user` contains authenticated user info

    // Find the movie by ID
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    // Add the comment with userId
    const newComment = { userId, comment };
    movie.comments.push(newComment);

    // Save the updated movie
    const updatedMovie = await movie.save();

    // Respond with the updated movie
    return res.status(200).send({
      message: "Comment added successfully",
      updatedMovie,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// [get movie comments]
module.exports.getMovieComments = async (req, res) => {
  try {
    // Find the movie by ID
    const movie = await Movie.findById(req.params.id);

    // Check if the movie exists
    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    // Return the comments array
    return res.status(200).send({
      comments: movie.comments.map((comment) => ({
        userId: comment.userId, // User ID from the comment
        comment: comment.comment, // Comment content
        _id: comment._id, // Comment ID
      })),
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
