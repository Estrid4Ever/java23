// document.body.innerHTML = "hej!";

const frukter = ["banan", "äpple", "päron", "melon", "kiwi"];

const listElement = document.querySelector("#listan");

frukter.forEach((frukt) => {
	const li = document.createElement("li");

	li.style.backgroundColor = "red";

	li.textContent = frukt;

	li.classList.add("background");

	listElement.appendChild(li);
});     

const input = document.querySelector("#input");

const button = document.querySelector("#button");

button.addEventListener("click", () => {
	frukter.push(input.value);

	const li = document.createElement("li");

	li.style.backgroundColor("red");
	li.textContent = input.value;
	li.classList.add("background");

	listElement.appendChild(li);
});
