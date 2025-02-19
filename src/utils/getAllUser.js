
const getAllUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`)
    if(!res.ok) throw new Error("Failed to fetch users")

    return await res.json()
  } catch (error) {
    console.error("Error fetching users:", error);
    return []
  }
}

export default getAllUser