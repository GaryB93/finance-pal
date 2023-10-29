import express from 'express';
import financeController from '../controllers/financeController.js';
const financeRouter = express.Router();

financeRouter.get('/:userId',
  financeController.finances,
  (req, res) => {
    res.status(200).json(res.locals.finances);
  }
);

financeRouter.post('/item',
  financeController.saveItem,
  (req, res) => {
    res.status(200).json(res.locals.items);
  }
);

export default financeRouter;