const { Schema, model } = require('mongoose');

const CandidateSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    require: true,
  },
  votes: {
    type: Array,
  },
});

module.exports = model('Candidate', CandidateSchema);
