// ===============Select Elements Jquery Type==================================
$target_visible = document.getElementById("target");
$game_message = document.querySelector(".game_message");
$guess_input = document.querySelector(".input");
$user_guesses = document.querySelector(".user_guesses");
$score_Ele = document.querySelector(".score");
$check_guess = document.querySelector(".check_guess");
$play_again = document.getElementById("play_again");
$play_next = document.getElementById("play_next");
$body = document.querySelector(".body");

// ===============Player Name==================================================
let user_Name = prompt("What is your name?");

!user_Name || user_Name === " " ? (user_Name = "Mr. X") : user_Name;
$game_message.textContent = user_Name + ", Start guessing...!";

// ===============Generate Target Number=======================================
let target_Number = Math.trunc(Math.random() * 10) + 1;

let score = 10;
let scoreMinus = 2;
let guesses = 0;
let targetScore = 100;
$play_again.style.display = "none";
$play_next.style.display = "none";

// ===============Guess check function=========================================
const checkGuessNumber = function () {
	user_input = Number($guess_input.value);
	console.log(user_input, "user-input TESTING");

	//  =============Player Guesses==============================================
	guesses = guesses + 1;
	$user_guesses.textContent = user_Name + ", your guesses is : " + guesses;

	//  =============Player Score================================================
	score = score - scoreMinus;
	console.log(score, "score");
	$score_Ele.textContent = score < 1 ? 0 : score;

	//  =============Wrong Number================================================
	if (user_input !== target_Number) {
		$target_visible.classList.add("shake");
	}
	setTimeout(() => {
		$target_visible.classList.remove("shake");
	}, 100);
	//  =============Not A Number================================================
	if (isNaN(user_input)) {
		$game_message.textContent = user_Name + ", 🔢 Only numbers valid...👻";
	}
	//  =============Invalid Number==============================================
	else if (user_input < 1 || user_input > 10) {
		$game_message.textContent =
			user_Name + ", Please enter numbers between 1️⃣ and 🔟";
	}
	//  =============Player Win==================================================
	else if (user_input === target_Number) {
		$target_visible.textContent = target_Number;
		$body.style.background = "rgb(0, 172, 9)";
		win_score = score + scoreMinus + 10;
		$score_Ele.textContent = win_score + " 🤩";
		$game_message.innerHTML = `Congratulations ${user_Name}, You win 🎊 <br>Your score is : ${win_score}
       😍😍`;

		$check_guess.style.display = "none";
		$play_next.style.display = "block";
		$play_next.classList.add("animation");
		$target_visible.classList.add("animation");

		setTimeout(() => {
			$target_visible.classList.remove("animation");
		}, 5000);

		$guess_input.style.display = "none";
	}
	//  =============High Number=================================================
	else if (user_input > target_Number) {
		$game_message.textContent =
			user_Name + ", Your guessing number is too high..! 😨";
	}
	//  =============Low Number==================================================
	else if (user_input < target_Number) {
		$game_message.textContent =
			user_Name + ", Your guessing number is too small..! 🙄";
	}
	//  =============Score 0 and Player Loss============================
	if (score < 2) {
		if (user_input != target_Number) {
			console.log("you loss the game input value is 0 TESTING");
			$target_visible.textContent = target_Number;
			$game_message.textContent =
				"💩 " + user_Name + ", You are loss the game...!";
			$body.style.background = "rgb(172, 0, 0)";
			$play_again.style.display = "block";
			$check_guess.style.display = "none";
			$play_again.classList.add("animation");
			$target_visible.classList.add("animation");
			$guess_input.style.display = "none";

			setTimeout(() => {
				$target_visible.classList.remove("animation");
			}, 5000);
			win_score = 0;
			guesses = 0;
			scoreMinus = 2;
		}
	}
};

// ===============mouse click - checkGuessNumber===============================
$check_guess.addEventListener("click", function () {
	checkGuessNumber();
	$guess_input.value = "";
});

// ===============Keyboard Enter key - checkGuessNumber========================
$guess_input.addEventListener("keydown", function (event) {
	if (event.key === "Enter" && $guess_input.value != "") {
		checkGuessNumber();
		$guess_input.value = "";
	}
});

// ===============Play-Again===================================================
$play_again.addEventListener("click", function () {
	$body.style.background = "#333";
	target_Number = Math.trunc(Math.random() * 10) + 1;
	$target_visible.textContent = "?";
	$game_message.textContent = user_Name + ", Start guessing again...!";
	$guess_input.value = "";
	guesses = 0;
	$user_guesses.textContent = user_Name + ", your guesses is : " + guesses;
	score = 10;
	$score_Ele.textContent = score;
	targetScore = 100;
	scoreMinus = 2;
	document.querySelector(".highscore").textContent = targetScore;
	$play_again.style.display = "none";
	$check_guess.style.display = "block";
	$guess_input.style.display = "block";
});

// ===============Play-Next====================================================
$play_next.addEventListener("click", function () {
	$body.style.background = "#333";
	target_Number = Math.trunc(Math.random() * 10) + 1;
	console.log(target_Number, "play next target number TESTING");
	$target_visible.textContent = "?";
	$game_message.textContent = user_Name + ", Start guessing again...!";
	$guess_input.value = "";
	$user_guesses.textContent = user_Name + ", your guesses is : " + guesses;
	score = win_score;
	$score_Ele.textContent = score;
	$play_next.style.display = "none";
	$check_guess.style.display = "block";
	$guess_input.style.display = "block";
	//===============Player Make 99+ Score======================================
	if (score > targetScore - 1) {
		$game_message.innerHTML =
			"Congratulations " +
			user_Name +
			", 🎊 You make 99+ score 😇<br>Try guessing more...😇";
		$body.style.background = "#1089b5";
		targetScore = targetScore + 100;
		document.querySelector(".highscore").textContent = targetScore;

		scoreMinus = scoreMinus < 10 ? 10 : scoreMinus + 10;
	}
});

// ===============Testing======================================================
console.log(user_Name, "user name TESTING");
console.log(target_Number, "targetNumber TESTING");
