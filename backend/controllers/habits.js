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
    })
    .catch((err) => { next(err); });
};

const newHabit = (req, res, next) => {
  // console.log('here');
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const id = req.user._id;
  Habit.create({
    title,
    description,
    owner: id,
  })
    .then((habit) => {
      // console.log(Article);
      // console.log('createArticle on Articles controller');

      res.status(201).send(habit);
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

const changeHabitStatus = (req, res, next) => {
  const {body} = req;
  const {habitId} = req.params;
  Habit.findById(habitId)
  .orFail(() => {
    throw new NotFound('Habit is not found');
  })
  .then((habit) => {
    const daysPassed = habit.daysPassed;
    let status;
    switch (true) {
      case (daysPassed < 7):
        status = ' new ';
        break;
      case (daysPassed < 21):
        status = ' feeling the water ';
      break;
      case (daysPassed < 40):
        status = ' forming ';
        break;

        case (daysPassed < 66):
          status = ' almost there ';
          break; 
          
        default:
          status = 'completed'  
    }
    habit.status = status;
    Habit.findByIdAndUpdate(habitId, body, {new: true })
    .then((habit) => res.status(200).send(habit))
    .catch((err) => {
      // console.log(err);
      next(err);
  })
})
}

/* const updateLikes = (req, res, operator, next) => {
  const { articleId } = req.params;
  const { _id } = req.user;
  // console.log(operator);
  Article.findByIdAndUpdate(
    articleId,
    { [operator]: { likes: _id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      thrw new NotFound('Article is not found');
    })
    .then((Article) => res.status(200).send(Article))
    .catch((err) => {
    //  console.log(err);
      next(err);
    });
};

const likeArticle = (req, res, next) => updateLikes(req, res, '$addToSet', next);

const dislikeArticle = (req, res, next) => updateLikes(req, res, '$pull', next); */

module.exports = {
  newHabit, deleteHabit, getAllHabits, editHabit, changeHabitStatus
};
