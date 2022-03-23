const inputUser = document.getElementById('input-user');
const button = document.querySelector('.btn');

// Global variables

button.addEventListener('click', function () {
	agify_api(inputUser.value);
	nationalize(inputUser.value);
	genderize(inputUser.value);
});

// For guessing the user age

function agify_api(name) {
	const agify_url = `https://api.agify.io/?name=${name}`;
	fetch(agify_url)
		.then((response) => response.json())
		.then((data) => show_age(data));
}

function show_age(data) {
	const ageData = data;
	console.log(ageData.age);
}

// For guessing the user national

function nationalize(name) {
	const nationalize_url = `https://api.nationalize.io?name=${name}`;
	fetch(nationalize_url)
		.then((response) => response.json())
		.then((data) => show_national(data));
}

function show_national(data) {
	const showNational = data;

	const userCountry = showNational.country;

	userCountry.forEach((element) => {
		console.log(element.country_id);
		console.log(element.probability);
	});
}

//For guessing the user gender

function genderize(name) {
	const genderize_url = `https://api.genderize.io?name=${name}`;
	fetch(genderize_url)
		.then((response) => response.json())
		.then((data) => show_gender(data));
}

function show_gender(data) {
	const genderData = data;
	console.log(genderData.gender);
}
