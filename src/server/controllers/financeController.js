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
      amount: Number.parseFloat(item.amount.toFixed(2)),
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
            { $set: { 'expenses.$[item]': {...newItem, _id: item._id} } },
            { arrayFilters: [{ 'item._id': item._id }],
              returnDocument: 'after',
              lean: true }).exec();
        } else {
          user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { 'incomes.$[item]': {...newItem, _id: item._id} } },
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

  // deleteItem: async (req, res, next) => {
  //   const itemId = req.params.itemId;
  //   const userId = req.body.userId;
  //   try {
  //     const user = User.findOne
  //   }
  // },
};

export default financeController;