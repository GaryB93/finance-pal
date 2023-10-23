import { Item } from "../reducers/financeReducer";

/** This function calculates the totals for the income items and expense items respectively */
export const calculateTotals = (items: Array<Item>, year: string, month: string): number => {
  return items.reduce((acc, curr) => {
    const date = new Date(curr.date);
    if (date.getFullYear().toString() === year &&
      date.getMonth().toString() === month) {
        return acc + curr.amount;
    }
    return acc;
  }, 0);
};