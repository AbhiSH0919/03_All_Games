"use strict";

const set = document.querySelector(".set");

const output = function (e) {
	const sound = new Audio(`resources/sounds/${e.dataset.sound}.mp3`);
	sound?.play();

	e.classList.add("pressed"); // =====VISUAL BEHAVIOUR=====
	setTimeout(() => {
		e.classList.remove("pressed");
	}, 220);
};

set.addEventListener("click", function (e) {
	// ==========EVENT DELEGATION==========
	if (e.target.classList.contains("drum")) {
		output(e.target);
	}
});

document.addEventListener("keypress", function (e) {
	for (let i = 0; i < set.children.length; i++) {
		// ==========KEYBOARD EVENT==========
		set.children[i]?.textContent.toLowerCase() === e.key.toLowerCase() &&
			output(set.children[i]);
	}
});

const init = function () {
	[...set.children].forEach((ele) => {
		// ==========BACKGROUND IMAGES==========
		ele.style.backgroundImage = `url(resources/images/${ele.dataset.sound}.jpg)`;
	});
};
init(); // =====INITIAL CALL=====
