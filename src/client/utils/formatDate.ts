/** This function takes in date object and returns
 *  the same date in the format 'YYYY-MM-DD'
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};