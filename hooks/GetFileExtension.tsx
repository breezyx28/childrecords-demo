export const getFileExtension = (filename: string) => {
  const parts = filename.split(".");
  if (parts.length === 1 || (parts[0] === "" && parts.length === 2)) {
    return "pdf"; // No file extension found
  }
  // @ts-ignore
  return parts.pop().toLowerCase(); // Return the file extension in lowercase
};
