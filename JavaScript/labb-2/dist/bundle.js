/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script/app.js":
/*!***************************!*\
  !*** ./src/script/app.js ***!
  \***************************/
/***/ ((module) => {

eval("console.log(\"Labb 2\");\nconsole.log(\"Lycka till!\");\n\nlet currentDayIndex = new Date();\n\nasync function fetchData(path) {\n\tconst data = await fetch(path).then((response) => response.json());\n\n\treturn data;\n}\n\nconst weekdayTranslation = new Map([\n\t['Monday', 'Måndag'],\n\t['Tuesday', 'Tisdag'],\n\t['Wednesday', 'Onsdag'],\n\t['Thursday', 'Torsdag'],\n\t['Friday', 'Fredag'],\n\t['Saturday', 'Lördag'],\n\t['Sunday', 'Söndag']\n]);\n\nasync function renderAndShowRelevantSpecial() {\n\n\tawait renderSpecial(new Date().getDate());\n\n\thideLoaderShowSpecial();\n\n}\n\nasync function renderSpecial(dateModifier) {\n\tconst url = \"../src/data/specials.json\";\n\tconst specialsData = await fetchData(url);\n\n\tconst weeklySpecialsMenu = specialsData.weeklySpecialsMenu;\n\n\tcurrentDayIndex.setDate(dateModifier);\n\n\tObject.keys(weeklySpecialsMenu).forEach(day => {\n\n\t\tif (day.substring(0, 3) == currentDayIndex.toUTCString().substring(0, 3)) {\n\n\t\t\tvar endTimeLunchSpecial = parseInt(weeklySpecialsMenu[day][0].time.substring(6, 8));\n\n\t\t\tvar isDinnertime = 0;\n\t\t\tvar mealType = \"Lunch\";\n\n\t\t\tif (parseInt(currentDayIndex.getHours()) >= endTimeLunchSpecial) {\n\t\t\t\tisDinnertime = 1;\n\t\t\t\tmealType = \"Middag\";\n\t\t\t}\n\n\t\t\tsetDaySpecialContent(isDinnertime, mealType, day, weeklySpecialsMenu);\n\n\t\t}\n\n\t});\n}\n\nmodule.exports = renderSpecial;\n\n\nrenderAndShowRelevantSpecial();\n\nfunction hideLoaderShowSpecial() {\n\tconst loadingSpinner = document.querySelector(\"#js-loading\");\n\tconst specialsContent = document.querySelector(\"#specials__content\");\n\n\tif (loadingSpinner.classList.toString() == \"loading-spinner\") {\n\t\tloadingSpinner.classList.add(\"hidden\");\n\t\tspecialsContent.classList.replace(\"specials__content\", \"specials__content--open\");\n\t}\n}\n\naddYesterdaySpecialsButtonEventListener();\n\nfunction addYesterdaySpecialsButtonEventListener() {\n\tconst yesterdaySpecialsButton = document.querySelector(\".button\");\n\n\tyesterdaySpecialsButton.addEventListener('click', () => {\n\n\t\tif (yesterdaySpecialsButton.classList.toString() == \"button\") {\n\t\t\trenderSpecial(new Date().getDate());\n\t\t\tyesterdaySpecialsButton.classList.add(\"button--specials\");\n\t\t} else {\n\t\t\trenderSpecial(currentDayIndex.getDate() - 1);\n\t\t\tyesterdaySpecialsButton.classList.remove(\"button--specials\");\n\t\t}\n\n\t});\n}\n\n\n\nfunction setDaySpecialContent(isDinnertime, mealType, day, weeklySpecialsMenu) {\n\tconst specialsTitle = document.querySelector(\"#specials-title\");\n\tspecialsTitle.textContent = \"Dagens \" + mealType;\n\n\tconst specialsName = document.querySelector(\"#specials-dish-name\");\n\tspecialsName.textContent = weeklySpecialsMenu[day][isDinnertime].name;\n\n\tconst specialsPrice = document.querySelector(\"#specials-price\");\n\tspecialsPrice.textContent = weeklySpecialsMenu[day][isDinnertime].price + \"kr\";\n\n\tconst specialsDescription = document.querySelector(\"#specials__content>p\");\n\tspecialsDescription.textContent = weeklySpecialsMenu[day][isDinnertime].description;\n}\n\n\nasync function renderSpecialsMenu() {\n\tconst url = \"../src/data/specials.json\";\n\tconst specialsData = await fetchData(url);\n\n\tconst specialsContent = document.querySelector(\"#specials-menu\");\n\n\tconst specialsList = document.createElement('div');\n\tspecialsContent.appendChild(specialsList);\n\n\tconst weeklySpecialsMenu = specialsData.weeklySpecialsMenu;\n\n\tObject.keys(weeklySpecialsMenu).forEach(day => {\n\t\tconst specialsDay = document.createElement('div');\n\n\t\tconst dayHeader = document.createElement('h4');\n\t\tdayHeader.textContent = weekdayTranslation.get(day);\n\n\t\tconst lunch = document.createElement('p');\n\t\tlunch.textContent = 'Lunch: ' + weeklySpecialsMenu[day][0].name;\n\n\t\tconst dinner = document.createElement('p');\n\t\tdinner.textContent = 'Middag: ' + weeklySpecialsMenu[day][1].name;\n\n\t\tspecialsDay.appendChild(dayHeader);\n\t\tspecialsDay.appendChild(lunch);\n\t\tspecialsDay.appendChild(dinner);\n\n\t\tspecialsList.appendChild(specialsDay);\n\t});\n}\n\nrenderSpecialsMenu();\n\nasync function renderMenu() {\n\tconst url = \"../src/data/menu.json\";\n\tconst menuData = await fetchData(url);\n\n\tvar selectedMenu = document.querySelector(\".options--active\");\n\n\tconst menuOption = menuData[selectedMenu.value];\n\n\tconst menuContent = document.querySelector(\"#content\");\n\n\tconst menuList = document.createElement('ul');\n\tmenuContent.replaceChildren(menuList);\n\n\tmenuOption.forEach(element => {\n\t\tconst menuListItem = document.createElement('li');\n\t\tmenuListItem.classList.add('separator');\n\t\tmenuListItem.classList.add('menu__option');\n\n\t\tconst div = document.createElement('div');\n\n\t\tconst name = document.createElement('h3');\n\t\tname.textContent = element.name;\n\t\tname.classList.add('dish__name');\n\t\tname.style.marginBottom = 16;\n\n\t\tconst price = document.createElement('p');\n\t\tprice.textContent = element.price + \"kr\";\n\t\tprice.classList.add('dish__price');\n\n\t\tdiv.appendChild(name);\n\t\tdiv.appendChild(price);\n\t\tdiv.classList.add('menu__title');\n\n\t\tmenuListItem.appendChild(div);\n\n\t\tconst description = document.createElement('p');\n\t\tdescription.textContent = element.description;\n\t\tdescription.style.marginTop = 0;\n\n\t\tmenuListItem.appendChild(description);\n\n\t\tmenuList.appendChild(menuListItem);\n\n\t});\n}\n\nrenderMenu();\n\nconst asideBTN = document.querySelector(\"#menu-toggle\");\nasideBTN.addEventListener(\"click\", toggleAside);\n\nfunction toggleAside() {\n\tconst aside = document.querySelector(\"#specials-menu\");\n\tconst asideBars = document.querySelector(\".menu-toggle\");\n\n\tif (aside.classList.contains(\"specials__menu--open\")) {\n\t\taside.classList.remove(\"specials__menu--open\");\n\t\tasideBars.classList.remove(\"nav-open\");\n\t} else {\n\t\taside.classList.add(\"specials__menu--open\");\n\t\tasideBars.classList.add(\"nav-open\");\n\t}\n}\n\nconst menuRadio = document.querySelectorAll(\".options\");\n\nfor (const element of menuRadio) {\n\telement.addEventListener(\"click\", () => {\n\t\tmenuRadio.forEach(button => {\n\t\t\tbutton.classList.remove('options--active');\n\t\t});\n\n\t\telement.classList.add('options--active');\n\t\trenderMenu();\n\t});\n}\n\n\n\n//# sourceURL=webpack:///./src/script/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script/app.js");
/******/ 	
/******/ })()
;