import User from "../models/userModel.js";

const userController = {
  verifyUser: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username }).exec();
      if (user) {
        console.log('here');
        return next();
      }
    } catch(err) {
      console.log(err);
      return next();
    }
  },
};

export default userController;