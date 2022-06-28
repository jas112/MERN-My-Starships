const express = require('express');
const router = express.Router();
const { getStarships, setStarship, updateStarship, deleteStarship } = require('../controllers/starshipController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getStarships).post(protect, setStarship);
router.route('/:id').put(protect, updateStarship).delete(protect, deleteStarship);

module.exports = router;