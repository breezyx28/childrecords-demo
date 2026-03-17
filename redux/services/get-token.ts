// Function to fetch the token from the server-side API route
export const fetchToken = async () => {
  try {
    const response = await fetch("/api/auth/token");
    const data = await response.json();
    if (response.ok) {
      return data.token; // Return the token
    }
    throw new Error(data.message || "Failed to fetch token");
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
