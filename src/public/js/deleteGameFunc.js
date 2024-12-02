function deleteGame(playid) {
	if (
		confirm(
			"Er du sikker på du vil slette dette spil?\nDette kan ikke fortrydes!"
		)
	) {
		fetch("/played-games/delete/" + playid, {
			method: "DELETE",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("network response was not ok");
				}
				return res.json();
			})
			.then((data) => {
				console.log("Play deleted successfully:", data);
				window.location.href = "/played-games";
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}
}
