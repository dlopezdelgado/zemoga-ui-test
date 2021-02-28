const { response } = require('express');
const Candidate = require('../models/Candidate');

const getAllCandidates = async (req, res = response) => {
  try {
    const candidates = await Candidate.find();

    res.status(200).json(candidates);
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Internal Server Error',
    });
  }
};

module.exports = {
  getAllCandidates,
};
