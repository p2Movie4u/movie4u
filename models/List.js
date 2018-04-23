const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  genre: String,
  movies: Array
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const List = mongoose.model('List', movieSchema);
module.exports = List;
