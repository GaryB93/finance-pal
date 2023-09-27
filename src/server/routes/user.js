import express from 'express';
const userRouter = express.Router();

userRouter.use('/login', (req, res) => {
  console.log(req.body);
  res.send('login');
});

export default userRouter;