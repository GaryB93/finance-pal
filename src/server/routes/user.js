import express from 'express';
import userController from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.use('/login',
  userController.verifyUser,
  (req, res) => {
    res.status(200).send();
  }
);

export default userRouter;