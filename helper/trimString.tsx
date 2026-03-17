export const trimString = (text: string, term: string) => {
  return text?.replaceAll(term, "");
};

export const truncateString = (
  text: string,
  maxLength: number = 30,
  suffix = ""
) => {
  return text.length > maxLength
    ? text.slice(0, maxLength) + "..." + suffix
    : text;
};
