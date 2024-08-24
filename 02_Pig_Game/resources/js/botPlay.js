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
let currentScore, activePlayer, diceNumber, rollingChance, computerInterval;
const targetScore = 20;

// ===GETING PLAYER NAME===
let playerName = prompt("What is your Name?");
// ===============================================================================================

// ========================================INITIAL GAME STATUS====================================
// ===INITIAL GAME STATUS FUNCTION===
const initialGameStatus = function () {
	currentScore = 0;
	activePlayer = 0;
	rollingChance = 0;
	diceNumber = 0;

	// ===PLAYERS SECTION MAIN SCORE AND CURRENT SCORE===
	document.getElementById("score--0").textContent = currentScore;
	document.getElementById("current--0").textContent = currentScore;
	document.getElementById("score--1").textContent = currentScore;
	document.getElementById("current--1").textContent = currentScore;

	// ===PLAYERS SCORE IN INITIAL===
	scores[0] = currentScore;
	scores[1] = currentScore;

	// ===GAME BUTTONS DISPLAY STYLE===
	btnNewEl.style.display = "none";
	diceEl.style.display = "none";
	btnRollEl.style.display = "block";
	btnHoldEl.style.display = "block";

	// ===PLAYERS INITIAL STATE===
	const players = document.querySelectorAll(".player");
	players.forEach((player) => {
		player.classList.remove("player--winner");
		player.classList.remove("player--active");
	});
	players[activePlayer].classList.add("player--active");

	// ===PLAYERS NAME===
	playerName === null || playerName === ""
		? (playerName = "player")
		: (playerName = playerName);
	document.getElementById(`name--0`).textContent = playerName;
	document.getElementById(`name--1`).textContent = `ghost 👻`;
};

// ========================================DICE ROLL==============================================
// ===GENERATE DICE ROLL FUNCTION===
const generateDiceRoll = function () {
	btnNewEl.style.display = "block";
	diceEl.style.display = "block";
	const diceSound = document.querySelector(".diceSound");
	diceSound.play();
	setTimeout(() => {
		diceSound.pause();
		diceSound.currentTime = 0;
	}, 800);

	diceNumber = Math.trunc(Math.random() * 6) + 1; // ===GENERATE ROLL DICE===
	diceEl.src = `../../images/dice-${diceNumber}.png`;
	rollingChance++;

	if (diceNumber === 1) {
		switchPlayer();
	} else if (rollingChance >= 3 && diceNumber === 1) {
		switchPlayer();
	} else if (rollingChance >= 3 && diceNumber !== 1) {
		scoreUpdate();
		switchPlayer();
	} else {
		//===UPDATING CURRENT SCORE===
		currentScore += diceNumber;
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore;
	}
	gameWin(); // ===CHECK GAME WINNER===
};

// ========================================SCORE UPDATE===========================================
// ===SCORE UPDATE FUNCTION===
const scoreUpdate = function () {
	currentScore += diceNumber;
	scores[activePlayer] += currentScore;

	document.getElementById(`score--${activePlayer}`).textContent =
		scores[activePlayer];
	currentScore = 0;
	gameWin();
};

// ========================================PLAYER WIN GAME========================================
// ===GAME WIN FUNCTION===
const gameWin = function () {
	// ===PLAYER WIN WHEN SCORE IS GRETER THAN TARGET===
	if (
		scores[activePlayer] + currentScore >= targetScore ||
		scores[activePlayer] >= targetScore ||
		currentScore >= targetScore
	) {
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer] + currentScore;

		document.getElementById(`current--${activePlayer}`).textContent = 0;

		document
			.querySelector(`.player--${activePlayer}`)
			.classList.add("player--winner");

		document.getElementById(`name--${activePlayer}`).textContent =
			activePlayer === 0 ? `${playerName} Win 🏆` : `Ghost👻 Win 🏆`; //===WINNER NAME===

		btnRollEl.style.display = "none";
		btnHoldEl.style.display = "none";
	}
};

// ========================================PLAYER SWITCH==========================================
// ===SWICTH PLAYER FUNCTION===
const switchPlayer = function () {
	clearTimeout(computerInterval);
	rollingChance = 0;
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent =
		currentScore;

	activePlayer = activePlayer === 0 ? 1 : 0; //===PLAYER SWITCH CONDITION===

	player_0El.classList.toggle("player--active");
	player_1El.classList.toggle("player--active");

	// ===SWITCHED TO COMPUTER PLAY===
	if (
		activePlayer === 1 &&
		scores[0] < targetScore &&
		scores[0] + currentScore < targetScore &&
		scores[1] + currentScore < targetScore
	) {
		currentScore = 0;

		setTimeout(() => {
			computerPlay();
		}, 2500);
	}
};

// ========================================COMPUTER PLAY==========================================
// ===COMPUTER DICE ROLLING FUNCTION===
const computerPlay = function () {
	diceEl.style.display = "block";
	generateDiceRoll(); // ===GENERATE DICE===

	// ===COMPUTER ROLL DICE AGAIN===
	if (
		diceNumber !== 1 &&
		activePlayer === 1 &&
		scores[0] < targetScore &&
		scores[1] + currentScore < targetScore
	) {
		computerInterval = setTimeout(() => {
			computerPlay();
		}, 2500);

		// ===COMPUTER HOLD SCORES===
		const randomHold = Math.trunc(Math.random() * 4) + 1;
		if (randomHold === 2 || randomHold === 4) {
			setTimeout(() => {
				diceNumber = 0;
				scoreUpdate();
				switchPlayer();
			}, 1500);
		}
	}
};

// ========================================PLAYER PLAY============================================
// ===PLAYER DICE ROLLING===
btnRollEl.addEventListener("click", function () {
	if (activePlayer === 0) {
		generateDiceRoll(); // ===generate dice===
	}
});

// ===PLAYER HOLD SCORES===
btnHoldEl.addEventListener("click", function () {
	if (activePlayer === 0) {
		diceNumber = 0;
		scoreUpdate(); // ===score update===
		switchPlayer(); // ===switch player===
	}
});

// ===NEW GAME BUTTON CLICK===
btnNewEl.addEventListener("click", function () {
	initialGameStatus(); // ===GAME INITIAL STATUS / NEW GAME===
});
// ===============================================================================================

initialGameStatus(); //===INITIAL CALL===

// ========================================NOTE===================================================
const playerSection = document.querySelector(".playSection");
const btnNext = document.querySelector(".btn--next");
const btnHelp = document.querySelector(".help");
const btnBack = document.querySelector(".back");

btnNext.addEventListener("click", function () {
	playerSection.style.display = "none";
});

btnHelp.addEventListener("click", function () {
	playerSection.style.display = "block";
	btnNext.focus();
});

btnBack.addEventListener("click", function () {
	history.back();
});
// ===============================================================================================
