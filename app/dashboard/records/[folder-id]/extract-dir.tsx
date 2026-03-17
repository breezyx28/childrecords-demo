type DirectoryResult = {
  directories: string[];
  currentDir: string;
};

export function getDirectoriesAndCurrentDir(item: {
  directory: string;
  filename: string;
}): DirectoryResult {
  const _Dir =
    item.directory === "/"
      ? String(item.directory) + String(item.filename)
      : item.directory + "/" + item.filename;
  // Remove the leading "/" and split the directory path into parts
  const directories = _Dir.split("/").filter((dir) => dir.trim() !== ""); // Filter out empty strings caused by leading "/"

  // Get the last element of the array as the current directory
  const currentDir = directories[directories.length - 1] || "";

  return {
    directories,
    currentDir,
  };
}
