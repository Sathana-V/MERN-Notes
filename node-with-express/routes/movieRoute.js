const express = require("express");
const movieRoutes = express.Router();
const movieController = require("../controller/movieController");
movieRoutes.param("id", movieController.checkForId);
movieRoutes
  .route("/")
  .get(movieController.getAllMovies)
  .post(movieController.validateMovieData, movieController.createNewMovie);

movieRoutes
  .route("/:id")
  .get(movieController.getMovie)
  .delete(movieController.deleteMovie)
  .put(movieController.updateMovie);
module.exports = movieRoutes;
