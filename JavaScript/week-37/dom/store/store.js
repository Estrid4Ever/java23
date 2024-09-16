async function fetchData() {
  try {
    const response = await fetch('https://fakestoreapi.com/products/')
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}



const container = document.querySelector('#card-container')

async function createCard() {
  const data = await fetchData();

  if (data) {
    data.forEach(elem => {

    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '50%'

    const title = document.createElement('h2');
    title.textContent = elem.title;
    card.appendChild(title);

    const id = document.createElement('p');
    id.textContent = "ID: " + elem.id
    card.appendChild(id)

    const img = document.createElement('img');
    img.src = elem.image // path/url till bild
    img.alt = elem.title
    img.width = "300"
    card.appendChild(img)

    const button = document.createElement('button');
    button.textContent = "Köp"
    button.value = elem.id
    
    button.addEventListener('click', () => {
      alert(`Du la till ${elem.title}!`)
      console.log(`vara: ${elem.title}, id: ${elem.id}`)
    })
    card.appendChild(button)

    container.appendChild(card)
  })
  }
}

createCard()