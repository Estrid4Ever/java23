const people = [
  { firstName: "Anna", lastName: "Karlsson" },
  { firstName: "Bertil", lastName: "Johansson" },
  { firstName: "Cevert", lastName: "Abert" },
]
console.log(people)

const content = document.querySelector('#content');

people.forEach(person => {
  const title = document.createElement('h2');
  title.textContent = `${person.firstName} ${person.lastName}`

  content.appendChild(title);
})