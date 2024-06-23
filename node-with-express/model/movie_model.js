const mongoose = require("mongoose");



const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},
  year: { type: String, required: true },
  rated: { type: String, required: true },
  released: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: [String], required: true },
  director: { type: String, required: true },
  writer: { type: [String], required: true },
  actor: { type: [String], required: true },
  plot: { type: String, required: true },
  language: { type: [String], required: true },
  country: { type: String, required: true },
  awards: { type: String, required: true },
  poster: { type: String, required: true },
  metascore: { type: Number, required: true },
  imdbRating: { type: Number, required: true },
  imdbVotes: { type: String, required: true },
  imdbID: { type: String, required: true },
  type: { type: String, required: true },
  response: { type: String, required: true },
  images: { type: [String], required: true },
  createdAt: { type: Date, default: new Date() }
}, { collection: 'movie' });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
const Model = mongoose.model("Movies", movieSchema);
module.exports = Model;