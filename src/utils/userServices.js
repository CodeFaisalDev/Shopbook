export const postUser = async (user) => {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (error) {
    console.error("Error sending user data:", error);
    return { success: false, error };
  }
}

export const getUser = async (userId) => {
  try {
    const response = await fetch(`/api/auth?id=${userId}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, error };
  }
};