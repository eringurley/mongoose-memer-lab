const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      toptext,
      bottomtext,
      image
    } = req.body;

    Meme
      .create({ toptext, bottomtext, image })
      .then(meme => res.send(meme))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Meme
      .find(req.params.id)
      .then(memes => res.send(memes))
      .catch(next);
  });
