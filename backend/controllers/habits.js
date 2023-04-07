const Habit = require('../models/habit');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const BadReq = require('../errors/BadReq');

const getAllHabits = (req, res, next) => {
  const owner = req.user._id;
  Habit.find({owner})
    .then((habit) => {
      // console.log('getAllArticles on Articles controller');
      // console.log(Articles);
      res.status(200).send(habit);
      console.log(habit);
    })
    .catch((err) => { next(err); });
};

const newHabit = (req, res, next) => {
  // console.log('here');
  const {
    keyword, title, description, date,
  } = req.body;
  const id = req.user._id;
  Habit.create({
    title,
    description,
    keyword,
    owner: id,
  })
    .then((habit) => {
      // console.log(Article);
      // console.log('createArticle on Articles controller');

      res.status(201).send(habit);
      console.log('success')
    })
    .catch((err) => {
      // console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadReq(err.message));
      }
    })
    .catch((err) => {
      // console.log(err);
      next(err);
    });
};

const deleteHabit = (req, res, next) => {
  const { habitId } = req.params; //_id
  Habit.findById(habitId)
    .orFail(() => {
      throw new NotFound('Habit is not found');
    })
    .then((habit) => {
      if (!habit.owner.equals(req.user._id)) {
        next(new Forbidden("You can't delete someone else's habit"));
      } else {
        Habit.findByIdAndRemove(habitId)
          .then((habit) => res.status(200).send(habit));
      }
    })
    .catch((err) => {
      // console.log(err);
      next(err);
    });
};

const editHabit = (req, res, next) => {
  const {body} = req;
  const {habitId} = req.params;
  Habit.findById(habitId)
    .orFail(() => {
      throw new NotFound('Habit is not found');
    })
    .then((habit) => {
      if (!habit.owner.equals(req.user._id)) {
        next(new Forbidden("You can't edit someone else's habit"));
      } else {
        Habit.findByIdAndUpdate(habitId, body, {new: true, runValidators: true})
          .then((habit) => res.status(200).send(habit));
      }
    })
    .catch((err) => {
      // console.log(err);
      next(err);
    });

}


module.exports = {
  newHabit, deleteHabit, getAllHabits, editHabit
};
