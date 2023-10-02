import User from "../models/userModel.js";

const userController = {
  login: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username }).exec();
      if (user && user.password === password) {
        res.locals.user = { userId: user._id, username: user.username };
      }
      return next();
    } catch(err) {
      console.log(err);
      return next();
    }
  },

  signup: async (req, res, next) => {
    const {
      username,
      password,
      question,
      answer,
    } = req.body;

    try {
      const user = await User.findOne({ username: username }).exec();
      if (!user) {
        const newUser = new User({
          username: username,
          password: password,
          securityQuestion: question,
          securityAnswer: answer,
        });

        const doc = await newUser.save();
        res.locals.user = { userId: doc._id, username: doc.username };
      }
      return next();
    } catch(err) {
      console.log(err);
      return next();
    }
  },

  verifyUsername: async (req, res, next) => {
    const username = req.params.username;
    try {
      const user = await User.findOne({ username: username }).exec();
      if (user) {
        res.locals.user = { 
          userId: user._id,
          username: user.username,
          question: user.securityQuestion,
        };
      }
      return next();
    } catch(err) {
      console.log(err);
      return next();
    }
  },

  checkSecurityAnswer: async (req, res, next) => {
    const { userId, answer } = req.body;
    try {
      const user = await User.findOne({ _id: userId }).exec();
      if (user && user.securityAnswer === answer) {
        res.locals.message = 'answer is correct';
      }
      return next();
    } catch (err) {
      console.log(err);
      return next();
    }
  },

  changePassword: async (req, res, next) => {
    const { userId, password } = req.body;
    try {
      const user = await User.updateOne({ _id: userId }, { password: password }).exec();
      res.locals.message = user.acknowledged ? 'success' : 'failure'
      return next();
    } catch (err) {
      console.log(err);
      return next();
    }
  },
};

export default userController;