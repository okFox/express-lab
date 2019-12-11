const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true
  },
  dateOfEvent: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
    min: 1
  }
})

module.exports = mongoose.model('Attempt', attemptSchema);
