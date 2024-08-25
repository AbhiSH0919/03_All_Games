"use strict";
// ==========Select Element & Create Variables==========
const container = document.querySelector(".container");
const playerOne = document.querySelector(".playerOne");
const playerTwo = document.querySelector(".playerTwo");
const reload = document.querySelector(".reload");
const box = document.querySelectorAll(".box");
let activePlayerIndex = 0;
let activePlayerIcon;

const board = [...box];
const newboard = [[], [], []];

for (let i = 0; i < board.length; i++) {
	i < 3
		? newboard[0].push(board[i])
		: i > 2 && i < 6
		? newboard[1].push(board[i])
		: newboard[2].push(board[i]);
}

const gameStart = function () {
	container.style.background = "#4a4e4d";
	container.removeAttribute("disabled", true);
	playerOne.innerHTML = "Player One";
	playerTwo.innerHTML = "Player Two";
	box.forEach((box) => (box.innerHTML = ""));
	reload.addEventListener("click", gameStart);
};
gameStart(); // ===Initial call===

// ==========Player Switch After One Play==========
const gameWin = function () {
	container.style.background = "#333";
	document.getElementById(`activePlayer--${activePlayerIndex}`).innerText +=
		" Win 🏆";
	container.setAttribute("disabled", true);
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
	for (let i = 0; i < newboard.length; i++) {
		if (
			// Check rows
			newboard[i][0].innerHTML !== "" &&
			newboard[i][0].innerHTML === newboard[i][1].innerHTML &&
			newboard[i][0].innerHTML === newboard[i][2].innerHTML
		) {
			gameWin();
		} else if (
			// Check Collumn
			newboard[0][i].innerHTML !== "" &&
			newboard[0][i].innerHTML === newboard[1][i].innerHTML &&
			newboard[0][i].innerHTML === newboard[2][i].innerHTML
		) {
			gameWin();
		} else if (
			// Check diagonals
			newboard[0][0].innerHTML !== "" &&
			newboard[0][0].innerHTML === newboard[1][1].innerHTML &&
			newboard[0][0].innerHTML === newboard[2][2].innerHTML
		) {
			gameWin();
			return;
		} else if (
			newboard[0][2].innerHTML !== "" &&
			newboard[0][2].innerHTML === newboard[1][1].innerHTML &&
			newboard[0][2].innerHTML === newboard[2][0].innerHTML
		) {
			gameWin();
			return;
		} else {
			switchPlayer();
		}
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
