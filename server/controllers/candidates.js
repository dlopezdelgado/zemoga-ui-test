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

const updateCandidate = async (req, res = response) => {
  const candidateId = req.params.id;

  try {
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({
        ok: false,
        msg: 'Candidate was not found',
      });
    }

    const candidateData = {
      ...req.body
    };

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      candidateData,
      { new: true }
    );

    res.json(updatedCandidate);


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Internal Error, contact admin',
    });
  }
};

module.exports = {
  getAllCandidates,
  updateCandidate,
};
