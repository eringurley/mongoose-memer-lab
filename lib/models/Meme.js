const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  bottomtext: {
    type: String
  },
  toptext: {
    type: String
  },
  image: {
    imageURL: String,
    required: true
  }
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;

