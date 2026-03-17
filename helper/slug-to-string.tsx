export function slugToString(slug: string = ""): string {
  return slug
    .split("-") // Split the slug by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words with a space
}
