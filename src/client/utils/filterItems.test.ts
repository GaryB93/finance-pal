import { filterItems } from "./filterItems";
import { Item } from "../reducers/financeReducer";

describe('filterItems function', () => {
  const items: Array<Item> = [
    {
      date: '2023-10-24',
      description: 'An item',
      amount: 320.45,
    },
    {
      date: '2023-10-24',
      description: 'An item',
      amount: 23.56,
    },
    {
      date: '2023-09-23',
      description: 'An item',
      amount: 44.25,
    },
  ];

  test('should return a list with 2 items', () => {
    const month = '9';
    const year = '2023';
    const filteredList = filterItems(items, month, year);
    expect(filteredList.length).toEqual(2);
  });

  test('should return an empty list', () => {
    const month = '11';
    const year = '2023';
    const filteredList = filterItems(items, month, year);
    expect(filteredList.length).toEqual(0);
  });

  test('should return a list with one item', () => {
    const month = '8';
    const year = '2023';
    const filteredList = filterItems(items, month, year);
    expect(filteredList.length).toEqual(1);
  })
});