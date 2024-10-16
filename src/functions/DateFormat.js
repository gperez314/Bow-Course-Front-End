// Function to format the date from 'YYYY-MM-DD' to 'Month Day, YYYY'
export const formatDate = (dateStr, locale = "en-US") => {
  // Create a new Date object in UTC
  const dateObj = new Date(dateStr + 'T00:00:00Z');

  // Define options for formatting
  const options = { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
  return dateObj.toLocaleDateString(locale, options);
};
