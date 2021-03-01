/*
  Routes for Candidates
  host + /api/candidates
*/

const { Router } = require('express');
const { getAllCandidates, updateCandidate } = require('../controllers/candidates');

const router = Router();

router.get('/', getAllCandidates);

router.put('/:id', updateCandidate);


module.exports = router;