const timeConvert = (ms) => {
	var minutes = Math.floor(ms / 60000);
	var seconds = ((ms % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const randomNumber = (min, max) => {
	return Math.floor(Math.random() * max + min);
}

function getRandomSearch() {
	const characters = 'abcdefghijklmnopqrstuvwxyz';

	const randomCharacter = characters.charAt(randomNumber(1, characters.length));

	return randomCharacter;
}

export {
	timeConvert,
	randomNumber,
	getRandomSearch
};