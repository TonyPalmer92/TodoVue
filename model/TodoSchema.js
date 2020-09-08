const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true
  },
  edit: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
})

module.exports = mongoose.model('Todos', TodoSchema)