import { Item } from "../reducers/financeReducer";

/** This function filters through an array of items by the selected month and year */
export const filterItems = (items: Array<Item>, month: string, year: string) => {
  return items.filter(item => {
    const date = new Date(item.date);
    return (
      date.getMonth().toString() === month &&
      date.getFullYear().toString() === year
    );
  });
};