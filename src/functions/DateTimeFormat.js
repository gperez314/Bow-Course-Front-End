// Function to format the date from 'YYYY-MM-DD' to 'Month Day, YYYY' including time
export const formatDateTime = (dateStr, locale = "en-US") => {
  // Create a new Date object from the date string
  const dateObj = new Date(dateStr);

  // Define options for formatting date and time
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format
  };
  
  // Format the date and time
  return dateObj.toLocaleString(locale, options);
};