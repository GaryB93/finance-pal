import { formatDate } from './formatDate';

describe('getDate function', () => {
  test('should convert from date object to string in the format YYYY-MM-DD', () => {
    const date = new Date('2023-10-27');
    const dateString = formatDate(date);
    expect(dateString).toEqual('2023-10-27');
  });
});