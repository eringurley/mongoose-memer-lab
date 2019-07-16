const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  bottomtext: {
    type: String
  },
  toptext: {
    type: String
  },
  image: {
    type: String
  }
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;

