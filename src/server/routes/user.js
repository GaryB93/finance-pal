import express from 'express';
import userController from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post('/login',
  userController.login,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

userRouter.post('/signup',
  userController.signup,
  (req, res) => {
    res.status(201).json(res.locals.user);
  }
);

userRouter.get('/security_question/:username',
  userController.verifyUsername,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

userRouter.post('/security_answer',
  userController.checkSecurityAnswer,
  (req, res) => {
    res.status(200).json(res.locals.message);
  }
);

userRouter.put('/password',
  userController.changePassword,
  (req, res) => {
    res.status(201).json(res.locals.message);
  }
);

export default userRouter;