import { createReducer, createAction } from '@reduxjs/toolkit';

interface Item {
  date: Date,
  category?: string,
  description: string,
  amount: number,
}

interface FinanceState {
  incomes: Array<Item>,
  expenses: Array<Item>,
}

const initialState: FinanceState = {
  incomes: [],
  expenses: [],
}

interface FinanceAction {
  incomes: [],
  expenses: [],
}

export const financesFetched = createAction<FinanceAction>('finances/retrieved');

const financeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(financesFetched, (state, action) => {
      state.incomes = action.payload.incomes;
      state.expenses = action.payload.expenses;
    });
});

export default financeReducer;