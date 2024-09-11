console.log("Labb 2");
console.log("Lycka till!");

const asideBTN = document.querySelector("#menu-toggle");
asideBTN.addEventListener("click", toggleAside);

function toggleAside() {
	const aside = document.querySelector("#specials-menu");

	if (aside.classList.contains("specials__menu--open")) {
		aside.classList.remove("specials__menu--open");
	} else {
		aside.classList.add("specials__menu--open");
	}
}
