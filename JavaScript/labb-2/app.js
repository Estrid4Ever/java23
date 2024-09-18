console.log("Labb 2");
console.log("Lycka till!");

let currentDayIndex = new Date().getDate();

async function fetchMenu(path) {
	const data = await fetch(path).then((response) => response.json());

	return data;
}

async function renderMenu() {
	const url = "./data/menu.json";
	const menuData = await fetchMenu(url);
	
	var selectedMenu = document.querySelector(".options--active");

	const menuOption = menuData[selectedMenu.value]

	const menuContent = document.querySelector("#content");

	const menuList = document.createElement('ul')
	menuContent.replaceChildren(menuList)

	menuOption.forEach(element => {
		const menuListItem = document.createElement('li');
		menuListItem.classList.add('separator')
		menuListItem.classList.add('menu__option')

		const div = document.createElement('div');

		const name = document.createElement('h3');
		name.textContent = element.name
		name.classList.add('dish__name')
		name.style.marginBottom = 16

		const price = document.createElement('p');
		price.textContent = element.price + "kr"
		price.classList.add('dish__price')

		div.appendChild(name)
		div.appendChild(price)
		div.classList.add('menu__title')

		// div.style.display = "flex"
		// div.style.justifyItems = "space-between"

		menuListItem.appendChild(div)

		const description = document.createElement('p');
		description.textContent = element.description
		description.style.marginTop = 0

		menuListItem.appendChild(description)

		menuList.appendChild(menuListItem)
		
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
			button.classList.remove('options--active')
		});
		
		element.classList.add('options--active')
		renderMenu()
	});
}

