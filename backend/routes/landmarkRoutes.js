const express = require('express');
const router = express.Router();

const {
  getLandmarks,
  createLandmark,
  updateLandmark,
  deleteLandmark
} = require('../controller/landmarkController');

// Routes
router.get('/', getLandmarks);
router.post('/', createLandmark);
router.put('/:id', updateLandmark);
router.delete('/:id', deleteLandmark);

module.exports = router;