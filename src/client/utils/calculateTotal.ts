import { Item } from "../reducers/financeReducer";

/** This function calculates the total dollar amount for the array
 *  of items passed */
export const calculateTotal = (items: Array<Item>): number => {
  return items.reduce((acc, curr) => acc + curr.amount, 0);
};