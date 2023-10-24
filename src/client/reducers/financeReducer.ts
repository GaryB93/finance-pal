import { createReducer, createAction } from '@reduxjs/toolkit';

export interface Item {
  date: string,
  category?: string,
  description: string,
  amount: number,
}

interface FinanceState {
  incomes: Array<Item>,
  expenses: Array<Item>,
  month: string,
  year: string,
}

const initialState: FinanceState = {
  incomes: [],
  expenses: [],
  month: new Date().getMonth().toString(),
  year: new Date().getFullYear().toString(),
}

interface FinanceAction {
  incomes: [];
  expenses: [];
  month: string;
  year: string;
}

export const financesFetched = createAction<FinanceAction>('finances/retrieved');
export const monthSelected = createAction<string>('finances/monthSelected');
export const yearSelected = createAction<string>('finances/yearSelected');

const financeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(financesFetched, (state, action) => {
      state.incomes = action.payload.incomes;
      state.expenses = action.payload.expenses;
    })
    .addCase(monthSelected, (state, action) => {
      state.month = action.payload;
    })
    .addCase(yearSelected, (state, action) => {
      state.year = action.payload;
    })
});

export default financeReducer;