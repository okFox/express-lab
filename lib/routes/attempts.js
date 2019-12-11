const { Router } = require('express');
const Attempts = require('../models/Attempts');

module.exports = Router()
  .post('/', (req, res) => {
    Attempts
      .create(req.body)
      .then(attempt => res.send(attempt));
  })

  .get('/:id', (req, res) => {
    Attempts
      .findById(req.params.id)
      .then(attempt => res.send(attempt));
  })

  .get('/', (req, res) => {
    Attempts
      .find()
      .then(attempts => res.send(attempts));
  })

  .patch('/:id', (req, res) => {
    Attempts
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(attempt => res.send(attempt));
  })

  .delete('/:id', (req, res) => {
    Attempts
      .findByIdAndDelete(req.params.id)
      .then(attempt => res.send(attempt));
  });