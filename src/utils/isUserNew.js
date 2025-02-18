/**
 * Checks if the user was created within the last hour.
 * @param {string} createdAt - The user's creation timestamp (ISO format).
 * @returns {boolean} - Returns true if the user was created within the last hour, otherwise false.
 */
export function isUserNew(createdAt) {
    if (!createdAt) return false; // Handle undefined/null values

    // Convert createdAt string to a Date object
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = currentDate - createdAtDate;

    // Convert milliseconds to hours
    const differenceInHours = timeDifferenceMs / (1000 * 60 * 60);

    // Return true if the difference is less than 1 hour, else false
    return differenceInHours < 1;
}
