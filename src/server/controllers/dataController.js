import User from "../models/userModel.js";

const dataController = {
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
};

export default dataController;