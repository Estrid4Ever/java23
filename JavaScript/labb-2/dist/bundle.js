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
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { renderAndShowRelevantSpecial, renderMenu, addYesterdaySpecialsButtonEventListener, \n\trenderSpecialsMenu, addAsideButtonFunction, addMenuRadio } = __webpack_require__(/*! ./appContent.js */ \"./src/script/appContent.js\");\n\nrenderAndShowRelevantSpecial();\naddYesterdaySpecialsButtonEventListener();\nrenderSpecialsMenu();\nrenderMenu();\naddAsideButtonFunction();\naddMenuRadio();\n\n//# sourceURL=webpack:///./src/script/app.js?");

/***/ }),

/***/ "./src/script/appContent.js":
/*!**********************************!*\
  !*** ./src/script/appContent.js ***!
  \**********************************/
/***/ ((module) => {

eval("console.log(\"Labb 2\");\nconsole.log(\"Lycka till!\");\n\nlet currentDayIndex = new Date();\n\nasync function fetchData(path) {\n    const data = await fetch(path).then((response) => response.json());\n    return data;\n}\n\nconst weekdayTranslation = new Map([\n    ['Monday', 'Måndag'],\n    ['Tuesday', 'Tisdag'],\n    ['Wednesday', 'Onsdag'],\n    ['Thursday', 'Torsdag'],\n    ['Friday', 'Fredag'],\n    ['Saturday', 'Lördag'],\n    ['Sunday', 'Söndag']\n]);\n\nasync function renderAndShowRelevantSpecial() {\n\n    await renderSpecial(new Date());\n\n    hideLoaderShowSpecial();\n\n}\n\nasync function renderSpecial(dateModifier) {\n    const url = \"../src/data/specials.json\";\n    const specialsData = await fetchData(url);\n\n    const weeklySpecialsMenu = specialsData.weeklySpecialsMenu;\n\n    currentDayIndex = dateModifier;\n\n    Object.keys(weeklySpecialsMenu).forEach(day => {\n\n        if (day.substring(0, 3) == currentDayIndex.toUTCString().substring(0, 3)) {\n\n            var endTimeLunchSpecial = parseInt(weeklySpecialsMenu[day][0].time.substring(6, 8));\n\n            var isDinnertime = 0;\n            var mealType = \"Lunch\";\n\n            if (parseInt(currentDayIndex.getUTCHours()) >= endTimeLunchSpecial) {\n                isDinnertime = 1;\n                mealType = \"Middag\";\n            }\n\n            setDaySpecialContent(isDinnertime, mealType, day, weeklySpecialsMenu);\n\n        }\n\n    });\n}\n\n\n\nfunction hideLoaderShowSpecial() {\n    const loadingSpinner = document.querySelector(\"#js-loading\");\n    const specialsContent = document.querySelector(\"#specials__content\");\n\n    if (loadingSpinner.classList.toString() == \"loading-spinner\") {\n        loadingSpinner.classList.add(\"hidden\");\n        specialsContent.classList.replace(\"specials__content\", \"specials__content--open\");\n    }\n}\n\n\n\nfunction addYesterdaySpecialsButtonEventListener() {\n    const yesterdaySpecialsButton = document.querySelector(\".button\");\n\n    yesterdaySpecialsButton.addEventListener('click', () => {\n\n        if (yesterdaySpecialsButton.classList.toString() == \"button\") {\n            renderSpecial(new Date());\n            yesterdaySpecialsButton.classList.add(\"button--specials\");\n        } else {\n            yesterday = currentDayIndex;\n            yesterday.setDate(currentDayIndex.getDate() - 1);\n            renderSpecial(yesterday);\n            yesterdaySpecialsButton.classList.remove(\"button--specials\");\n        }\n\n    });\n}\n\n\n\nfunction setDaySpecialContent(isDinnertime, mealType, day, weeklySpecialsMenu) {\n    const specialsTitle = document.querySelector(\"#specials-title\");\n    specialsTitle.textContent = \"Dagens \" + mealType;\n\n    const specialsName = document.querySelector(\"#specials-dish-name\");\n    specialsName.textContent = weeklySpecialsMenu[day][isDinnertime].name;\n\n    const specialsPrice = document.querySelector(\"#specials-price\");\n    specialsPrice.textContent = weeklySpecialsMenu[day][isDinnertime].price + \"kr\";\n\n    const specialsDescription = document.querySelector(\"#specials__content>p\");\n    specialsDescription.textContent = weeklySpecialsMenu[day][isDinnertime].description;\n}\n\n\nasync function renderSpecialsMenu() {\n    const url = \"../src/data/specials.json\";\n    const specialsData = await fetchData(url);\n\n    const specialsContent = document.querySelector(\"#specials-menu\");\n\n    const specialsList = document.createElement('div');\n    specialsContent.appendChild(specialsList);\n\n    const weeklySpecialsMenu = specialsData.weeklySpecialsMenu;\n\n    Object.keys(weeklySpecialsMenu).forEach(day => {\n        const specialsDay = document.createElement('div');\n\n        const dayHeader = document.createElement('h4');\n        dayHeader.textContent = weekdayTranslation.get(day);\n\n        const lunch = document.createElement('p');\n        lunch.textContent = 'Lunch: ' + weeklySpecialsMenu[day][0].name;\n\n        const dinner = document.createElement('p');\n        dinner.textContent = 'Middag: ' + weeklySpecialsMenu[day][1].name;\n\n        specialsDay.appendChild(dayHeader);\n        specialsDay.appendChild(lunch);\n        specialsDay.appendChild(dinner);\n\n        specialsList.appendChild(specialsDay);\n    });\n}\n\n\n\nasync function renderMenu() {\n    const url = \"../src/data/menu.json\";\n    const menuData = await fetchData(url);\n\n    var selectedMenu = document.querySelector(\".options--active\");\n\n    const menuOption = menuData[selectedMenu.value];\n\n    const menuContent = document.querySelector(\"#content\");\n\n    const menuList = document.createElement('ul');\n    menuContent.replaceChildren(menuList);\n\n    menuOption.forEach(element => {\n        const menuListItem = document.createElement('li');\n        menuListItem.classList.add('separator');\n        menuListItem.classList.add('menu__option');\n\n        const div = document.createElement('div');\n\n        const name = document.createElement('h3');\n        name.textContent = element.name;\n        name.classList.add('dish__name');\n        name.style.marginBottom = 16;\n\n        const price = document.createElement('p');\n        price.textContent = element.price + \"kr\";\n        price.classList.add('dish__price');\n\n        div.appendChild(name);\n        div.appendChild(price);\n        div.classList.add('menu__title');\n\n        menuListItem.appendChild(div);\n\n        const description = document.createElement('p');\n        description.textContent = element.description;\n        description.style.marginTop = 0;\n\n        menuListItem.appendChild(description);\n\n        menuList.appendChild(menuListItem);\n\n    });\n}\n\n\n\nfunction addAsideButtonFunction() {\n    const asideBTN = document.querySelector(\"#menu-toggle\");\n    asideBTN.addEventListener(\"click\", toggleAside);\n}\n\n\n\nfunction toggleAside() {\n    const aside = document.querySelector(\"#specials-menu\");\n    const asideBars = document.querySelector(\".menu-toggle\");\n\n    if (aside.classList.contains(\"specials__menu--open\")) {\n        aside.classList.remove(\"specials__menu--open\");\n        asideBars.classList.remove(\"nav-open\");\n    } else {\n        aside.classList.add(\"specials__menu--open\");\n        asideBars.classList.add(\"nav-open\");\n    }\n}\n\nfunction addMenuRadio() {\n    const menuRadio = document.querySelectorAll(\".options\");\n\n    for (const element of menuRadio) {\n        element.addEventListener(\"click\", () => {\n            menuRadio.forEach(button => {\n                button.classList.remove('options--active');\n            });\n\n            element.classList.add('options--active');\n            renderMenu();\n        });\n    }\n}\n\nmodule.exports = {\n    renderAndShowRelevantSpecial, renderMenu, addYesterdaySpecialsButtonEventListener,\n    renderSpecialsMenu, addAsideButtonFunction, addMenuRadio, hideLoaderShowSpecial, fetchData, renderSpecial, setDaySpecialContent\n};\n\n//# sourceURL=webpack:///./src/script/appContent.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script/app.js");
/******/ 	
/******/ })()
;