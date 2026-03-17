/**
 * Adds a suffix to a string, ensuring it appears only once at the end.
 * Removes all instances of the suffix from the string before appending.
 *
 * @param input - The input string.
 * @param suffix - The suffix to append.
 * @returns The string with the suffix properly appended.
 */
export const useAddSuffix = (input: string, suffix: string): string => {
  // Remove all instances of the suffix from the input
  let filteredValue = input.replaceAll(suffix, "").trim();

  if (input.endsWith(suffix.slice(0, -1))) {
    filteredValue = input.slice(0, -suffix.length);
  }

  // Append the suffix if there is content
  return filteredValue ? filteredValue + suffix : "";
};
