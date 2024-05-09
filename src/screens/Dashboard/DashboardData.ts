export const getLastWeek = (datevalue: any) => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - datevalue
  );
  return lastWeek;
};
export const weekValue = (datevalue: any) => {
  const lastWeek = getLastWeek(datevalue);
  const lastWeekMonth = lastWeek.getMonth() + 1;
  const lastWeekDay = lastWeek.getDate();
  const lastWeekYear = lastWeek.getFullYear();
  const lastWeekDate =
    ("00" + lastWeekMonth.toString()).slice(-2) +
    "-" +
    ("00" + lastWeekDay.toString()).slice(-2) +
    "-" +
    ("0000" + lastWeekYear.toString()).slice(-4);

  return lastWeekDate;
};
export const handleCalculateDifference = (startDate: any, endDate: any) => {
  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();
  if (isNaN(startDateTime) || isNaN(endDateTime)) {
    return "Invalid date format";
  } else {
    const timeDifference = Math.abs(endDateTime - startDateTime);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
    // Alternatively, you can calculate the difference in other units like hours, minutes, etc.
  }
};

export const getLastMonth = (datevalue: any) => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth() - datevalue,
    today.getDate()
  );
  return lastWeek;
};
export const weekValueMonth = (datevalue: any) => {
  const lastWeek = getLastMonth(datevalue - 1);
  const lastWeekMonth = lastWeek.getMonth() + 1;
  const lastWeekDay = lastWeek.getDate();
  const lastWeekYear = lastWeek.getFullYear();
  const lastWeekDate =
    ("00" + lastWeekMonth.toString()).slice(-2) +
    "-" +
    "01".slice(-2) +
    "-" +
    ("0000" + lastWeekYear.toString()).slice(-4);

  return lastWeekDate;
};

export const getNextMonth = () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth() + 7,
    today.getDate()
  );
  return lastWeek;
};
export const weekValueNextMonth = () => {
  const lastWeek = getNextMonth();
  const lastWeekMonth = lastWeek.getMonth() + 1;
  const lastWeekDay = lastWeek.getDate();
  const lastWeekYear = lastWeek.getFullYear();
  const lastWeekDate =
    ("00" + lastWeekMonth.toString()).slice(-2) +
    "-" +
    ("00" + lastWeekDay.toString()).slice(-2) +
    "-" +
    ("0000" + lastWeekYear.toString()).slice(-4);

  return lastWeekDate;
};
