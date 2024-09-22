console.log("Labb 2");
console.log("Lycka till!");

let currentDayIndex = new Date();

async function fetchData(path) {
	const data = await fetch(path).then((response) => response.json());

	return data;
}

const weekdayTranslation = new Map([
	['Monday', 'Måndag'],
	['Tuesday', 'Tisdag'],
	['Wednesday', 'Onsdag'],
	['Thursday', 'Torsdag'],
	['Friday', 'Fredag'],
	['Saturday', 'Lördag'],
	['Sunday', 'Söndag']
]);

async function renderAndShowRelevantSpecial() {

	await renderSpecial(new Date().getDate());

	hideLoaderShowSpecial();

}

async function renderSpecial(dateModifier) {
	const url = "../src/data/specials.json";
	const specialsData = await fetchData(url);

	const weeklySpecialsMenu = specialsData.weeklySpecialsMenu;

	currentDayIndex.setDate(dateModifier);

	Object.keys(weeklySpecialsMenu).forEach(day => {

		if (day.substring(0, 3) == currentDayIndex.toUTCString().substring(0, 3)) {

			var endTimeLunchSpecial = parseInt(weeklySpecialsMenu[day][0].time.substring(6, 8));

			var isDinnertime = 0;
			var mealType = "Lunch";

			if (parseInt(currentDayIndex.getHours()) >= endTimeLunchSpecial) {
				isDinnertime = 1;
				mealType = "Middag";
			}

			setDaySpecialContent(isDinnertime, mealType, day, weeklySpecialsMenu);

		}

	});
}

module.exports = renderSpecial;


renderAndShowRelevantSpecial();

function hideLoaderShowSpecial() {
	const loadingSpinner = document.querySelector("#js-loading");
	const specialsContent = document.querySelector("#specials__content");

	if (loadingSpinner.classList.toString() == "loading-spinner") {
		loadingSpinner.classList.add("hidden");
		specialsContent.classList.replace("specials__content", "specials__content--open");
	}
}

addYesterdaySpecialsButtonEventListener();

function addYesterdaySpecialsButtonEventListener() {
	const yesterdaySpecialsButton = document.querySelector(".button");

	yesterdaySpecialsButton.addEventListener('click', () => {

		if (yesterdaySpecialsButton.classList.toString() == "button") {
			renderSpecial(new Date().getDate());
			yesterdaySpecialsButton.classList.add("button--specials");
		} else {
			renderSpecial(currentDayIndex.getDate() - 1);
			yesterdaySpecialsButton.classList.remove("button--specials");
		}

	});
}



function setDaySpecialContent(isDinnertime, mealType, day, weeklySpecialsMenu) {
	const specialsTitle = document.querySelector("#specials-title");
	specialsTitle.textContent = "Dagens " + mealType;

	const specialsName = document.querySelector("#specials-dish-name");
	specialsName.textContent = weeklySpecialsMenu[day][isDinnertime].name;

	const specialsPrice = document.querySelector("#specials-price");
	specialsPrice.textContent = weeklySpecialsMenu[day][isDinnertime].price + "kr";

	const specialsDescription = document.querySelector("#specials__content>p");
	specialsDescription.textContent = weeklySpecialsMenu[day][isDinnertime].description;
}


async function renderSpecialsMenu() {
	const url = "../src/data/specials.json";
	const specialsData = await fetchData(url);

	const specialsContent = document.querySelector("#specials-menu");

	const specialsList = document.createElement('div');
	specialsContent.appendChild(specialsList);

	const weeklySpecialsMenu = specialsData.weeklySpecialsMenu;

	Object.keys(weeklySpecialsMenu).forEach(day => {
		const specialsDay = document.createElement('div');

		const dayHeader = document.createElement('h4');
		dayHeader.textContent = weekdayTranslation.get(day);

		const lunch = document.createElement('p');
		lunch.textContent = 'Lunch: ' + weeklySpecialsMenu[day][0].name;

		const dinner = document.createElement('p');
		dinner.textContent = 'Middag: ' + weeklySpecialsMenu[day][1].name;

		specialsDay.appendChild(dayHeader);
		specialsDay.appendChild(lunch);
		specialsDay.appendChild(dinner);

		specialsList.appendChild(specialsDay);
	});
}

renderSpecialsMenu();

async function renderMenu() {
	const url = "../src/data/menu.json";
	const menuData = await fetchData(url);

	var selectedMenu = document.querySelector(".options--active");

	const menuOption = menuData[selectedMenu.value];

	const menuContent = document.querySelector("#content");

	const menuList = document.createElement('ul');
	menuContent.replaceChildren(menuList);

	menuOption.forEach(element => {
		const menuListItem = document.createElement('li');
		menuListItem.classList.add('separator');
		menuListItem.classList.add('menu__option');

		const div = document.createElement('div');

		const name = document.createElement('h3');
		name.textContent = element.name;
		name.classList.add('dish__name');
		name.style.marginBottom = 16;

		const price = document.createElement('p');
		price.textContent = element.price + "kr";
		price.classList.add('dish__price');

		div.appendChild(name);
		div.appendChild(price);
		div.classList.add('menu__title');

		menuListItem.appendChild(div);

		const description = document.createElement('p');
		description.textContent = element.description;
		description.style.marginTop = 0;

		menuListItem.appendChild(description);

		menuList.appendChild(menuListItem);

	});
}

renderMenu();

const asideBTN = document.querySelector("#menu-toggle");
asideBTN.addEventListener("click", toggleAside);

function toggleAside() {
	const aside = document.querySelector("#specials-menu");
	const asideBars = document.querySelector(".menu-toggle");

	if (aside.classList.contains("specials__menu--open")) {
		aside.classList.remove("specials__menu--open");
		asideBars.classList.remove("nav-open");
	} else {
		aside.classList.add("specials__menu--open");
		asideBars.classList.add("nav-open");
	}
}

const menuRadio = document.querySelectorAll(".options");

for (const element of menuRadio) {
	element.addEventListener("click", () => {
		menuRadio.forEach(button => {
			button.classList.remove('options--active');
		});

		element.classList.add('options--active');
		renderMenu();
	});
}

