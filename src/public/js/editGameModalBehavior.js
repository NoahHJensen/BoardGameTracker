document.addEventListener("DOMContentLoaded", () => {
	// Get elements
	const editGameBtn = document.getElementById("editGameBtn");
	const modal = document.getElementById("editGameModal");
	const closeModalBtn = document.getElementById("closeModalBtn");
	const cancelModalBtn = document.getElementById("cancelModalBtn");
	const saveGameBtn = document.getElementById("saveGameBtn");
	const modalBackground = document.getElementById("modal-background");

	// Open modal
	editGameBtn.addEventListener("click", () => {
		modal.classList.add("is-active");
	});

	// Close modal
	function closeModal() {
		modal.classList.remove("is-active");
	}

	closeModalBtn.addEventListener("click", closeModal);
	cancelModalBtn.addEventListener("click", closeModal);
	modalBackground.addEventListener("click", closeModal);

	saveGameBtn.addEventListener("click", () => {
		// Example: Add custom form handling logic here
		document.getElementById("editGameForm").submit(); // Submits the form
	});
});
