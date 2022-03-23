// Selectors
const inputUser = document.getElementById('input-user');
const button = document.querySelector('.btn');
const warningText = document.querySelector('.warning-text');

const nameText = document.querySelector('.name-text');
const agifyText = document.querySelector('.agify-text');
const genderizeText = document.querySelector('.genderize-text');
const nationalizeText = document.querySelector('.nationalize-text');
const remarksText = document.querySelector('.remarks-text');

// Global variable
var myModal = new bootstrap.Modal(document.getElementById('myModal'));

button.addEventListener('click', function () {
	if (inputUser.value === '') {
		warningText.innerHTML = `<p class="text-danger">Please enter a username</p>`;
		nameText.innerHTML = '';
		agifyText.innerHTML = '';
		genderizeText.innerHTML = '';
		nationalizeText.innerHTML = '';
		remarksText.innerHTML = ``;

		myModal.show();
	} else {
		warningText.innerHTML = ``;
		myModal.show();
		// Calling all the functions
		nameText.innerHTML = `You name is <b>${inputUser.value}</b>`;
		console.log(inputUser.value);
		agify_api(inputUser.value);
		nationalize(inputUser.value);
		genderize(inputUser.value);
		remarksText.innerHTML = `Did I get this right? Let me know! &#10084;&#65039;`;
	}
	//removing the value in the input text
	inputUser.value = '';
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
	if (ageData.age == null) {
		const age = Math.floor(Math.random() * 30);
		agifyText.innerHTML = `<b>${age}</b> years old`;
	} else {
		agifyText.innerHTML = `<b>${ageData.age}</b> years old`;
	}
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
		var randomCountryCodes = [
			'AT',
			'CA',
			'CN',
			'DO',
			'JP',
			'PH',
			'EG',
			'FI',
			'FR',
			'HK',
		];
		var randomCountryCode =
			randomCountryCodes[Math.floor(Math.random() * randomCountryCodes.length)];

		nationalizeText.innerHTML = `${randomCountryCode}`;

		const country_details_link = `https://restcountries.com/v3.1/alpha/${randomCountryCode}`;

		fetch(country_details_link)
			.then((response) => response.json())
			.then((data) =>
				data.forEach((element) => {
					nationalizeText.innerHTML = `
						<div>
							You're a <b>${element.demonyms.eng.f}</b> 
							living in <b>${element.name.common}</b>
							<img src="${element.flags.png}" class="mt-3"/>
						</div>
					`;
				})
			);
	} else {
		const country_details_link = `https://restcountries.com/v3.1/alpha/${countryID}`;

		fetch(country_details_link)
			.then((response) => response.json())
			.then((data) =>
				data.forEach((element) => {
					nationalizeText.innerHTML = `
						<div>
							You're a <b>${element.demonyms.eng.f}</b> 
							living in <b>${element.name.common}</b>
							<img src="${element.flags.png}" class="mt-3"/>
						</div>
					`;
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
	if (genderData.gender === null) {
		var genders = ['female', 'male'];
		var randomGender = genders[Math.floor(Math.random() * genders.length)];
		genderizeText.innerHTML = `<b>${randomGender}</b>`;
	} else {
		genderizeText.innerHTML = `<b>${genderData.gender}</b>`;
	}
}
