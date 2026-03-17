export function getFirstName(name: string): string {
  if (!name) return "";

  return name.split(" ")[0].trim(); // Split by spaces and return the first part
}
