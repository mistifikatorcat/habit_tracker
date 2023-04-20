const router = require('express').Router();

const { validateHabit, validateObjectId } = require('../middleware/validation');
const { getAllHabits, newHabit, editHabit, deleteHabit } = require('../controllers/habits');

router.get('/', getAllHabits);
router.post('/', validateHabit, newHabit);
router.patch('/:_id', validateObjectId, editHabit);
router.delete('/:_id', validateObjectId, deleteHabit);

module.exports = router;
