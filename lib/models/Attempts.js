const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Recipe'
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
  },


});

module.exports = mongoose.model('Attempt', attemptSchema);


