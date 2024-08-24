"use strict";
// ====================Select Elements & create Variables==================== //
const startGameBtn = document.querySelector(".--js-startGame");
const level = document.querySelector(".--js-gameLevel");
const gameMsg = document.querySelector(".--js-gameMsg");
const btnColor = document.querySelectorAll(".--js-color-btn");
const colorAudio = document.querySelectorAll(".--js-colorAudio");

let computerNo = [];
let playerNo = [];

let count = 0;
let CompTimeout;

// ====================INITIAL====================
const init = function () {
	btnColor.forEach((btn) => {
		btn.setAttribute("disabled", "true");
	});
	startGameBtn.addEventListener("click", startGame); //===GAME-START
};

// ====================GAME-OVER====================
const gameOver = function () {
	level.textContent = "Game Over";
	gameMsg.textContent = `Your Level Is : ${computerNo.length}`;
	startGameBtn.innerText = `Start Again`;
	startGameBtn.removeAttribute("disabled", "true");
	const wrongAudio = document.querySelector(".--js-wrongAudio");
	wrongAudio.play();
	clearTimeout(CompTimeout);

	setTimeout(init, 1500); //===START-GAME-AGAIN
};

/**
 * [=====CHECK-ARRAY-NUMBERS=====]
 * [===CHECK-SEQUENCE-VICE===]
 * [===CHECK-FULL-SEQUENCE===]
 */
const checkResult = function () {
	for (let i = 0; i < playerNo.length; i++) {
		if (playerNo[i] !== computerNo[i] || playerNo.length > computerNo.length) {
			gameOver();
		}
	}

	if (playerNo.length === computerNo.length) {
		const compNumJoin = computerNo.join("");
		const playerNumJoin = playerNo.join("");
		compNumJoin === playerNumJoin ? compTone() : gameOver();
	}
};

// ====================VISUALLY-ACTION====================
const action = function () {
	btnColor.forEach((btn) => {
		btn.classList.remove("active");
	});
	btnColor[count - 1].classList.add("active");
	colorAudio[count - 1].play();

	setTimeout(() => {
		btnColor[count - 1].classList.remove("active");
		colorAudio[count - 1].pause();
		colorAudio[count - 1].currentTime = 0;
	}, 700);
};

// ====================RANDUM NUMBER====================
const rdNumber = function () {
	return Math.trunc(Math.random() * 4) + 1;
};

// ====================comp tone====================
const compTone = function () {
	CompTimeout = setTimeout(() => {
		playerNo = [];
		count = rdNumber();
		computerNo.push(count);
		level.innerText = `Level = ${computerNo.length}`;

		action();
	}, 1100);
};

// ====================PLAYER BUTTON CLICK====================
btnColor.forEach((btn, index) => {
	btn.addEventListener("click", function () {
		count = index + 1;
		playerNo.push(count);
		btn.setAttribute("disabled", "true");
		setTimeout(() => {
			btn.removeAttribute("disabled", "true");
		}, 700);
		action();
		checkResult();
	});
});

// ====================GAME START====================
const startGame = function () {
	btnColor.forEach((btn) => {
		btn.removeAttribute("disabled", "true");
	});
	computerNo = [];
	playerNo = [];
	startGameBtn.innerText = "The Simon Game";
	startGameBtn.setAttribute("disabled", "true");
	gameMsg.innerHTML = ` Let's Play have a Fun! <br/> Incries your brain power`;
	rdNumber();
	compTone();
};

init(); //===INITIAL-CALL
