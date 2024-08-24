"use strict";
// =================================SELECTING ELEMENTS & CREATING VARIABLES=================================
const diceEl = document.querySelector(".dice");
// ===CLICKABLE BUTTONS===
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");
// ===PLAYERS ELEMENTS===
const player_0El = document.querySelector(".player--0");
const player_1El = document.querySelector(".player--1");

const scores = [0, 0]; //===TWO PLAYER SCORES STORE===
const targetScore = 20;
let currentScore = 0;
let activePlayer = 0;

// ===PLAYER NAME===
let playerName1 = prompt("What is your Name? (Player 01)");
let playerName2 = prompt("What is your Name? (Player 02)");

playerName1 === null || playerName1 === ""
	? (playerName1 = "Player 01")
	: (playerName1 = playerName1);

playerName2 === null || playerName2 === ""
	? (playerName2 = "Player 02")
	: (playerName2 = playerName2);

document.querySelector("#name--0").textContent = playerName1;
document.querySelector("#name--1").textContent = playerName2;

// ===INITIAL GAME STATUS FUNCTION===
const initialGameStatus = function () {
	currentScore = 0;

	// ===PLAYERS SECTION MAIN SCORE AND CURRENT SCORE===
	document.getElementById("score--0").textContent = currentScore;
	document.getElementById("current--0").textContent = currentScore;
	document.getElementById("score--1").textContent = currentScore;
	document.getElementById("current--1").textContent = currentScore;

	document.querySelector("#name--0").textContent = playerName1;
	document.querySelector("#name--1").textContent = playerName2;

	// ===PLAYERS SCORE IN INITIAL===
	scores[0] = currentScore;
	scores[1] = currentScore;

	// ===GAME BUTTONS===
	btnRollEl.style.display = "block";
	btnHoldEl.style.display = "block";
	btnNewEl.style.display = "none";
	diceEl.style.display = "none";

	const players = document.querySelectorAll(".player");
	players[activePlayer].classList.remove("player--winner");

	const btnBack = document.querySelector(".back");
	btnBack.addEventListener("click", function () {
		history.back();
	});
};

// ===SWICTH PLAYER FUNCTION===
const switchPlayer = function () {
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent =
		currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;

	player_0El.classList.toggle("player--active");
	player_1El.classList.toggle("player--active");
};

// ===PLAYER DICE ROLLING===
btnRollEl.addEventListener("click", function () {
	const diceSound = document.querySelector(".diceSound");
	diceSound.play();
	setTimeout(() => {
		diceSound.pause();
		diceSound.currentTime = 0;
	}, 800);
	diceEl.style.display = "block";
	btnNewEl.style.display = "block";

	const diceNumber = Math.trunc(Math.random() * 6) + 1; // ===GENERATE ROLL DICE===
	diceEl.src = `../../images/dice-${diceNumber}.png`;

	// ===IF DICE IS 1===
	if (diceNumber === 1) {
		switchPlayer(); // ===SWICTH TO NEXT PLAYER===
	} else {
		currentScore += diceNumber;
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore;
	}
});

// ===PLAYER HOLD SCORES===
btnHoldEl.addEventListener("click", function () {
	scores[activePlayer] += currentScore;
	document.getElementById(`score--${activePlayer}`).textContent =
		scores[activePlayer];

	// ===WIN PLAYER===
	if (scores[activePlayer] >= targetScore) {
		document
			.querySelector(`.player--${activePlayer}`)
			.classList.add("player--winner");

		document.querySelector(`#name--${activePlayer}`).textContent =
			activePlayer === 0 ? `${playerName1} Win` : `${playerName2} Win`;

		currentScore = 0;
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore;
		diceEl.style.display = "none";
		btnRollEl.style.display = "none";
		btnHoldEl.style.display = "none";
	} else {
		switchPlayer(); // ===SWITCH TO NEXT PLAYER===
	}
});

// ===NEW GAME BUTTON CLICK===
btnNewEl.addEventListener("click", function () {
	initialGameStatus(); // ===GAME INITIAL STATUS / NEW GAME===
});

initialGameStatus();
