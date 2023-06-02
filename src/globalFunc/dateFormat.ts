export const toFormatDateShort = (dateString: string) => {
  const dateObject = new Date(dateString);
  const formattedDateString = dateObject.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  return formattedDateString;
};
export const toFormatDateFull = (dateString: string) => {
  const options: object = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};

export const toFormatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return formattedTime;
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  return formattedDate;
};

export const actualDate = (created_at: string) => {
  let currentDate = getCurrentDate(); // format of current date like MM/DD/YY
  let shortDate = toFormatDateShort(created_at); // format of notes date like MM/DD/YY
  let timeDate = toFormatDateTime(created_at); // show time only
  if (currentDate === shortDate) {
    //if notes is written today -> return time only
    return timeDate;
  }
  return shortDate; //if notes is written earlier -> return date without time
};
