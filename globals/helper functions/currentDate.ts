export function getCurrentDateFormatted() {
  const date = new Date();

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  } as const;

  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
}
