import express from 'express';
import dataController from '../controllers/dataController.js';
const dataRouter = express.Router();

dataRouter.get('/:userId',
  dataController.finances,
  (req, res) => {
    res.status(200).json(res.locals.finances);
  }
);

export default dataRouter;