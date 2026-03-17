export function getInitials(name: string): string {
  if (!name) return "";

  return name
    .split(" ") // Split the name into parts
    .filter((part) => part.trim() !== "") // Remove any empty parts
    .map((part) => part[0].toUpperCase()) // Get the first letter of each part and convert to uppercase
    .join(""); // Join the initials together
}
