const { Router } = require('express');
const Recipes = require('../models/Recipe');

module.exports = Router()
  .post('/', (req, res) => {
    Recipes
      .create(req.body)
      .then(recipe => res.send(recipe));
  })

  .get('/:id', (req, res) => {
    Recipes
      .findById(req.params.id)
      .then(recipe => res.send(recipe));
  })

  .get('/', (req, res) => {
    Recipes
      .find()
      .then(recipes => res.send(recipes));
  })

  .patch('/:id', (req, res) => {
    Recipes
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(recipe => res.send(recipe));
  })

  .delete('/:id', (req, res) => {
    Recipes
      .findByIdAndDelete(req.params.id)
      .then(recipe => res.send(recipe));
  });
