const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  top: {
    type: String
  },
  bottom: {
    type: String
  },
  image: {
    type: String
  }
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;

