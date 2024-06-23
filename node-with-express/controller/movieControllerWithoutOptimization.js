const movieModel = require("../model/movie_model");

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
    // Extract the query parameters from the request
    let queryString = { ...req.query };

    // Fields to be excluded from the query
    const limitedFields = ["sort", "page", "limit", "fields"];

    // Remove the limited fields from queryString
    for (const field of limitedFields) {
      delete queryString[field];
    }

    // Convert the query string object to JSON string
    let queryObj = JSON.stringify(queryString);

    
    // Replace operators with MongoDB query operators
    queryObj = queryObj.replace(
      /\b(ge|le|gte|lte|eq)\b/g,
      (match) => `$${match}`
    );

    // Parse the modified JSON string back to an object
    queryObj = JSON.parse(queryObj);

    
    console.log(queryObj);
    let allMovies = movieModel.find(queryObj);
    if (req.query.sort) {
      allMovies.sort(req.query.sort); // if you use await bef movieModel then sort will be taken as js function not mongoose so pass query
    } else {
      allMovies.sort("createdAt");
    }

    if (req.query.fields) {
      // select('-duration') excludes it
      // select('duration') only displays duration
      // // select('-duration time') Cannot do inclusion on field time in exclusion projection
      const fields = req.query.fields.split(",").join(" ");
      allMovies.select(fields);
    }

    //pagination
    if (req.query.page) {
      const movieCount = await movieModel.countDocuments();
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const skip = (page - 1) * limit;
      if (skip > movieCount) {
        throw Error("Page not found");
      }
      allMovies.skip(skip).limit(limit);
    }

    allMovies = await allMovies;

    // const allMovies = await movieModel.find(req.query);

    //below two fails because it reruns exact match
    // const allMovies = await movieModel.find({duration : req.query.duration});
    // const allMovies = await movieModel.find().where('duration').equals( req.query.duration);

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
