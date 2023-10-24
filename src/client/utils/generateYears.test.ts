import { generateYears } from "./generateYears";

describe('generateYears function', () => {
  test('should generate array list starting from the year a profile was created to current year', () => {
    const yearCreated = new Date('2020-10-10');
    const years = generateYears(yearCreated.toString());
    expect(years[0]).toEqual(yearCreated.getFullYear());
    expect(years[years.length - 1]).toEqual(new Date().getFullYear());
  });
})