const movieModel = require("../model/movie_model");
const ApiFeatures = require("../utils/apiFeatures");
exports.validateMovieData = (req, res, next) => {
  if (!req.body || !req.body.title) {
    res.status(505).json({
      status: "failed",
      data: {
        message: "Movie Data is invalid",
      },
    });
  }
  next();
};
exports.createNewMovie = (req, res) => {
  movieModel
    .create(req.body)
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: {
          message: "Created Successfully",
          doc: data,
        },
      });
    })
    .catch((error) => {
      res.status(505).json({
        status: "failed",
        data: {
          message: error.message,
        },
      });
    });
};
exports.checkForId = async (req, res, next, value) => {
  try {
    const user = await movieModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        data: {
          message: "Movie not founds with id : " + req.params.id,
        },
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      data: {
        message: "Invalid id format : " + req.params.id,
      },
    });
  }
  next();
};
exports.getAllMovies = async (req, res) => {
  try {
    const features = new ApiFeatures(movieModel.find(), req.query)
      .filter()
      .sort()
      .limitFields();

    // Await pagination to ensure it finishes
    await features.pagination();
    const allMovies = await features.query;



    res.status(200).json({
      status: "success",
      length: allMovies.length,
      data: allMovies,
    });
  } catch (error) {
    res.status(505).json({
      status: "failed",
      data: {
        message: error.message,
      },
    });
  }
};

exports.getMovie = async (req, res) => {
  console.log("here");
  try {
    const allMovies = await movieModel.findById(req.params.id, { __v: 0 });
    res.status(200).json({
      status: "success",
      data: allMovies,
    });
  } catch (error) {
    res.status(505).json({
      status: "failed while fethcing",
      data: {
        message: error.message,
      },
    });
  }
};
exports.updateMovie = async (req, res) => {
  try {
    const updateMovie = await movieModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runvalidations: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        message: "Updated Successfully",
        doc: updateMovie,
      },
    });
  } catch (error) {
    res.status(505).json({
      status: "failed while udpating",
      data: {
        message: error.message,
      },
    });
  }
};
exports.deleteMovie = async (req, res) => {
  try {
    const updateMovie = await movieModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        message: "Deleted Successfully",
        doc: updateMovie,
      },
    });
  } catch (error) {
    res.status(505).json({
      status: "failed while deleting",
      data: {
        message: error.message,
      },
    });
  }
};
