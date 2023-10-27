import User from "../models/userModel.js";

const financeController = {
  finances: async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const user = await User.findOne({ _id: userId }).exec();
      res.locals.finances = { incomes: user.incomes, expenses: user.expenses };
      return next();
    } catch (err) {
      return next(err);
    }
  },

  saveItem: async (req, res, next) => {
    try {
      console.log(req.body);
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

export default financeController;