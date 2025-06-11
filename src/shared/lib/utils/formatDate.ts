export const formatToYYYYMMDD = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${isoDateString}`);
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error(`Error formatting date: ${isoDateString}`, error);
    return "";
  }
};
