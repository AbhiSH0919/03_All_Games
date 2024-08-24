"use strict";
// ==========Select Element & Create Variables==========
const container = document.querySelector(".container");
const playerOne = document.querySelector(".playerOne");
const playerTwo = document.querySelector(".playerTwo");
const reload = document.querySelector(".reload");
const box = document.querySelectorAll(".box");
let activePlayerIndex = 0;
let activePlayerIcon;

const gameStart = function () {
	container.style.background = "#4a4e4d";
	container.removeAttribute("disabled", true);
	playerOne.innerHTML = "Player One";
	playerTwo.innerHTML = "Player Two";
	box.forEach((box) => (box.innerHTML = ""));
};
gameStart(); // ===Initial call===

// ==========Player Switch After One Play==========
const gameWin = function () {
	container.style.background = "#333";
	document.getElementById(`activePlayer--${activePlayerIndex}`).innerText +=
		" Win 🏆";
	container.setAttribute("disabled", true);
	reload.addEventListener("click", gameStart);
};

// ==========Player Switch After One Play==========
const switchPlayer = function () {
	activePlayerIndex++;
	if (activePlayerIndex < 0) activePlayerIndex = 1;
	if (activePlayerIndex > 1) activePlayerIndex = 0;
	playerOne.style.background = playerTwo.style.background = "#aaa";
	document.getElementById(
		`activePlayer--${activePlayerIndex}`
	).style.background = "#fff";
};

// ==========CheckWinner ? gameWin() : switchPlayer()==========
const checkWinner = function (e) {
	// =====Crazy Condition=====
	if (
		(box[0].innerHTML === activePlayerIcon &&
			box[1].innerHTML === activePlayerIcon &&
			box[2].innerHTML === activePlayerIcon) ||
		(box[3].innerHTML === activePlayerIcon &&
			box[4].innerHTML === activePlayerIcon &&
			box[5].innerHTML === activePlayerIcon) ||
		(box[6].innerHTML === activePlayerIcon &&
			box[7].innerHTML === activePlayerIcon &&
			box[8].innerHTML === activePlayerIcon) ||
		(box[0].innerHTML === activePlayerIcon &&
			box[3].innerHTML === activePlayerIcon &&
			box[6].innerHTML === activePlayerIcon) ||
		(box[1].innerHTML === activePlayerIcon &&
			box[4].innerHTML === activePlayerIcon &&
			box[7].innerHTML === activePlayerIcon) ||
		(box[2].innerHTML === activePlayerIcon &&
			box[5].innerHTML === activePlayerIcon &&
			box[8].innerHTML === activePlayerIcon) ||
		(box[0].innerHTML === activePlayerIcon &&
			box[4].innerHTML === activePlayerIcon &&
			box[8].innerHTML === activePlayerIcon) ||
		(box[2].innerHTML === activePlayerIcon &&
			box[4].innerHTML === activePlayerIcon &&
			box[6].innerHTML === activePlayerIcon)
	) {
		gameWin();
	} else {
		switchPlayer();
	}
};

container.addEventListener("click", function (e) {
	if (e.target.innerHTML === "") {
		activePlayerIcon =
			activePlayerIndex === 0 ? `<span>⭕</span>` : `<span>❌</span>`;

		e.target.innerHTML = activePlayerIcon;

		checkWinner();
	}
});
