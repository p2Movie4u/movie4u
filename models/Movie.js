const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const movieSchema = new Schema({
  api_id: Number,
  title: String,
  year: Date,
  popularity: Number,
  runtime: String,
  genres: Array,
  producers: [{
    name: String,
    logo_path: String
  }],
  overview: String,
  language: String,
  poster: String,
  revenue: Number,
  budget: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
