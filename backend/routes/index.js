const router = require('express').Router();

const { validateAuth, validateUserBody } = require('../middleware/validation');
const auth = require('../middleware/auth');

const { createUser, login, getCurrentUser, updateProfile } = require('../controllers/users');

const habitsRoute = require('./habitsRoute');
const { emptyRoute } = require('./emptyRoute');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuth, login);

router.use(auth);

router.use('/users/me', getCurrentUser);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUserBody, updateProfile)
router.use('/myhabits', habitsRoute);
router.use('/', emptyRoute);

module.exports = router;
