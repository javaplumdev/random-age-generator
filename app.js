const inputUser = document.getElementById('input-user');
const button = document.querySelector('.btn');

// Global variables

button.addEventListener('click', function () {
	console.log(inputUser.value);
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
	country_details(userCountry);
}

// Country nationalize detials
function country_details(userCountry) {
	const countryDetails = userCountry;
	let countryID;

	countryDetails.forEach((element) => {
		countryID = element.country_id;
	});

	if (countryID == undefined) {
		const country_details_link = `https://restcountries.com/v3.1/alpha/ph`;

		fetch(country_details_link)
			.then((response) => response.json())
			.then((data) =>
				data.forEach((element) => {
					console.log(element.name.common);
					console.log(element.demonyms.eng.f);
					console.log(element.flags.png);
				})
			);
	} else {
		const country_details_link = `https://restcountries.com/v3.1/alpha/${countryID}`;

		fetch(country_details_link)
			.then((response) => response.json())
			.then((data) =>
				data.forEach((element) => {
					console.log(element.name.common);
					console.log(element.demonyms.eng.f);
					console.log(element.flags.png);
				})
			);
	}
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
