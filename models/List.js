const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const listSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie'},
  status: {type: String, default:"watchlist", enum:["watchlist", "watched"]}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const List = mongoose.model('List', listSchema);
module.exports = List;
