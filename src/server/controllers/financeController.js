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
    const { userId, type, item } = req.body;
    const newItem = {
      date: item.date,
      description: item.description,
      category: item.category,
      amount: item.amount,
    };
    try {
      let user;
      if (item._id === '') {
        if (type === 'expense') {
          user = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { expenses: newItem }},
            { returnDocument: 'after', lean: true }).exec();
        } else {
          user = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { incomes: newItem}},
            { returnDocument: 'after', lean: true }).exec();
        }
      } else {
        if (type === 'expense') {
          user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { 'expenses.$[item]': item } },
            { arrayFilters: [{ 'item._id': item._id }],
              returnDocument: 'after',
              lean: true }).exec();
        } else {
          user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { 'incomes.$[item]': item } },
            { arrayFilters: [{ 'item._id': item._id }],
              returnDocument: 'after',
              lean: true }).exec();
        }
      }
      res.locals.items = {
        incomes: user.incomes,
        expenses: user.expenses,
      };
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

export default financeController;