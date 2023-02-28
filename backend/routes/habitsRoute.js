const router = require('express').Router();

const { validateHabit, validateObjectId } = require('../middleware/validation');
const { getAllHabits, createHabit, editHabit, deleteHabit } = require('../controllers/habits');

router.get('/', getAllHabits);
router.post('/', validateHabit, createHabit);
router.patch('/', validateObjectId, editHabit);
router.delete('/:_id', validateObjectId, deleteHabit);

module.exports = router;
