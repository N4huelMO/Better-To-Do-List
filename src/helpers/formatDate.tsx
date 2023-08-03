export const formatDate = (date: number) => {
  const formatted = new Date(date);

  const options: any = { day: "2-digit", year: "2-digit", month: "numeric" };

  return formatted.toLocaleDateString("en-us", options);
};
