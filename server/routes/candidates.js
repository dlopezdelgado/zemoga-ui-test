/*
  Routes for Candidates
  host + /api/candidates
*/

const { Router } = require('express');
const { getAllCandidates } = require('../controllers/candidates');

const router = Router();

router.get('/', getAllCandidates);


module.exports = router;