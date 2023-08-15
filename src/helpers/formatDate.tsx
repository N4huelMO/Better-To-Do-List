export const formatDate = (date: number | string) => {
  const inputDate = new Date(date + "T00:00:00Z");

  const year = inputDate.getUTCFullYear().toString().slice(-2);
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getUTCDate().toString().padStart(2, "0");

  return `${month}/${day}/${year}`;
};
