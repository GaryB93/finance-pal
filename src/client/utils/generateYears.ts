/** This function generates an array of years starting at the date 
 *  the user's profile was created and ending on the current year
*/
export const generateYears = (userCreated: string): Array<number> => {
  const years: Array<number> = [];
  const today = new Date();

  let start = new Date(userCreated).getFullYear();
  while (start <= today.getFullYear()) {
    years.push(start);
    start++;
  }
  
  return years;
};