const btnBot = document.querySelector(".--js-bot");
const btnPlayer = document.querySelector(".--js-player");

btnBot.addEventListener("click", function () {
	window.open("resources/games/bot/index.html", "_self");
});

btnPlayer.addEventListener("click", function () {
	window.open("resources/games/player/index.html", "_self");
});
