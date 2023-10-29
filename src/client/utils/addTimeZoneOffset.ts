/** This function takes in a local date object and accounts
 *  timezone difference so as to save to DB appropriately
 */
export const addTimeZoneOffset = (date: Date): string => {
  const timeOffsetInMS = date.getTimezoneOffset() * 60000;
  date.setTime(date.getTime() + timeOffsetInMS);
  return date.toISOString();
};