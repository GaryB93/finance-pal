export const generateYears = (currentDate: Date): Array<number> => {
  const years: Array<number> = [];

  let start = 2020;
  while (start <= currentDate.getFullYear()) {
    years.push(start);
    start++;
  }
  
  return years;
};