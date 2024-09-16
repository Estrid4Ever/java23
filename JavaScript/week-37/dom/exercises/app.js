// övning 1
/* 
  Write the function setBackgroundColor so 
  that the background changes color when you 
  click the buttons 
*/
function setBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

// övning 2
/*
  When you click the headline, 
  the content should be visible/invisible. 
  When content is visible, 
  change the icon class 'fa-chevron-right' to 'fa-chevron-down'
*/
const title = document.querySelector('#title');
const content = document.querySelector('#content');

title.addEventListener('click', () => {
  content.style.display = 'block'
})

// övning 3
/* 
  x When you klick to button, 
  x the sum should be calculated and 
  x printend in the div 
*/


const inputOne = document.querySelector('#numberOne');
const inputTwo = document.querySelector('#numberTwo');

const button = document.querySelector('#myButton');
button.addEventListener('click', handleClick)

const resultElement = document.querySelector('#result');

function handleClick() {
  const valueOne = parseInt(inputOne.value)
  const valueTwo = parseInt(inputTwo.value)

  const total = sum(valueOne, valueTwo);

  resultElement.textContent = total;
}

function sum(num1, num2) {
  return num1 + num2
}