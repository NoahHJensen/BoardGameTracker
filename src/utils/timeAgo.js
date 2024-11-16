/**
 * Returns a human-readable string representing the time elapsed since the given date.
 * It calculates the number of days between the current date and the provided date string.
 *
 * @param {string} dateString - A date string (e.g., "2024-11-16") to calculate the time difference from.
 * @returns {string} A string indicating how long ago the date was (e.g., "idag", "1 dag siden", "3 dage siden").
 */
function timeAgo(dateString) {
	const date = new Date(dateString);
	const now = new Date();
	const timeDifference = Math.abs(now - date);
	const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

	if (daysAgo === 0) {
		return "idag";
	} else if (daysAgo === 1) {
		return "1 dag siden";
	} else {
		return `${daysAgo} dage siden`;
	}
}

module.exports = timeAgo;
