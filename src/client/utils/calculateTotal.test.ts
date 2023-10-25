import { calculateTotal } from "./calculateTotal";
import { Item } from "../reducers/financeReducer";

describe('calculateTotal function', () => {
  const items: Array<Item> = [
    {
      _id: '',
      date: '2023-10-24',
      description: 'An item',
      amount: 320.45,
      category: 'income',
    },
    {
      _id: '',
      date: '2023-10-24',
      description: 'An item',
      amount: 23.56,
      category: 'income',
    },
    {
      _id: '',
      date: '2023-09-23',
      description: 'An item',
      amount: 44.25,
      category: 'income',
    },
  ];

  let sum = 0;
  items.forEach(item => {
    sum += item.amount;
  });

  test('should sum up the amounts of all items given', () => {
    const total = calculateTotal(items);
    expect(total).toEqual(sum);
  });
});