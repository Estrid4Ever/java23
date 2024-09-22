
const { renderSpecial, renderMenu, hideLoaderShowSpecial, fetchData, setDaySpecialContent } = require("../src/script/appContent.js");

require('jest-fetch-mock').enableMocks();

var mockument = `
    <!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restaurangsida</title>
  <link rel="stylesheet" href="../src/styles/styles.css">
  <link rel="stylesheet" href="../src/styles/nav.css">
  <link rel="stylesheet" href="../src/styles/nav-secondary.css">
  <link rel="stylesheet" href="../src/styles/specials-menu.css">
  <link rel="stylesheet" href="../src/styles/specials-content.css">
  <link rel="stylesheet" href="../src/styles/menu.css">
  <script src="bundle.js" defer></script>

</head>
<body>
  <main class="hero overlay">
    <section id="home">
        <h1 class="welcome">Välkommen till Karlssons</h1>
        <p>Bästa maten i stan</p>
    </section>
    <section class="specials__container">
      <!-- Visas när ingen data laddats -->
      <img src="../src/images/loading.gif" id="js-loading" class="loading-spinner" alt="Sidladdare" width="50%"/>
      <div id="specials__content" class="specials__content">
        <div class="specials__title">
          <!-- Sätt kommande erbjudande -->
          
          <h2 id="specials-title"></h2>
          <button class="button button--specials">Gårdagens</button>
        </div>
        
        <div class="specials__header">
          <p id="specials-dish-name"></p>
          <p id="specials-price"></p>
        </div>
        <p></p> 
       
      </div>
    </section>

    <section class="nav__container">
      <nav class="nav__menu">
        <button class="options options--active" value="Grill">Grill</button>
        <button class="options" value="Snacks">Snacks</button>
        <button class="options" value="Drycker">Drycker</button>
      </nav>
      <nav class="nav__secondary">
        <a id="menu-toggle" class="menu-toggle">
          <span class="menu-toggle-bar menu-toggle-bar--top"></span>
          <span class="menu-toggle-bar menu-toggle-bar--middle"></span>
          <span class="menu-toggle-bar menu-toggle-bar--bottom"></span>
        </a>
      </nav>
      <section id="content" class="menu__container">
      </section>        

      <aside id="specials-menu" class="specials__menu">
        <h3>Veckas specialerbjudanden</h3>
        
      </aside>
  </main>
  <footer>
      <p>Restaurangnamn &copy; 2024</p>
      <p>Alla rättigheter förbehållna.</p>
      </footer>
      </body>
      </html>
      `;


afterEach(() => {
    fetch.resetMocks();
});
beforeEach(() => {
    document.body.innerHTML = mockument;
});

describe('renderRelevantSpecal', () => {

    it('renders Monday lunch special', async () => {
        fetch.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "weeklySpecialsMenu": {
                    "Monday": [
                        {
                            "name": "BBQ Revben",
                            "price": 108,
                            "description": "Långkokta revben med BBQ-sås",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Grillad Kyckling",
                            "price": 135,
                            "description": "Marinerad kycklingbröst grillad till perfektion",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Tuesday": [
                        {
                            "name": "Biff",
                            "price": 171,
                            "description": "Saftig biff med vitlökssmör",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Grillad Lax",
                            "price": 162,
                            "description": "Laxfilé med citron och örter",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Wednesday": [
                        {
                            "name": "Grönsaksspett",
                            "price": 72,
                            "description": "Blandade grönsaker grillade med olivolja",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Pommes Frites",
                            "price": 45,
                            "description": "Krispiga gyllene pommes frites",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Thursday": [
                        {
                            "name": "Lökringar",
                            "price": 54,
                            "description": "Panerade och friterade lökringar",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Mozzarella Sticks",
                            "price": 63,
                            "description": "Friterade mozzarellaoststänger",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Friday": [
                        {
                            "name": "Kycklingvingar",
                            "price": 81,
                            "description": "Kryddiga kycklingvingar med dipsås",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Nachos",
                            "price": 72,
                            "description": "Tortillachips med ost och jalapeños",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Saturday": [
                        {
                            "name": "Grillad Kyckling",
                            "price": 135,
                            "description": "Marinerad kycklingbröst grillad till perfektion",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "BBQ Revben",
                            "price": 108,
                            "description": "Långkokta revben med BBQ-sås",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Sunday": [
                        {
                            "name": "Grillad Lax",
                            "price": 162,
                            "description": "Laxfilé med citron och örter",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Biff",
                            "price": 171,
                            "description": "Saftig biff med vitlökssmör",
                            "time": "17:00-20:00"
                        }
                    ]
                }
            }),
        }));


        let currentDayIndex = new Date('2024-09-16T12:00:00.000Z');
        await renderSpecial(currentDayIndex);
        hideLoaderShowSpecial();

        expect(document.querySelector('#specials-dish-name').textContent).toEqual("BBQ Revben");
    });

    it('renders Tuesday dinner special', async () => {
        fetch.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "weeklySpecialsMenu": {
                    "Monday": [
                        {
                            "name": "BBQ Revben",
                            "price": 108,
                            "description": "Långkokta revben med BBQ-sås",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Grillad Kyckling",
                            "price": 135,
                            "description": "Marinerad kycklingbröst grillad till perfektion",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Tuesday": [
                        {
                            "name": "Biff",
                            "price": 171,
                            "description": "Saftig biff med vitlökssmör",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Grillad Lax",
                            "price": 162,
                            "description": "Laxfilé med citron och örter",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Wednesday": [
                        {
                            "name": "Grönsaksspett",
                            "price": 72,
                            "description": "Blandade grönsaker grillade med olivolja",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Pommes Frites",
                            "price": 45,
                            "description": "Krispiga gyllene pommes frites",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Thursday": [
                        {
                            "name": "Lökringar",
                            "price": 54,
                            "description": "Panerade och friterade lökringar",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Mozzarella Sticks",
                            "price": 63,
                            "description": "Friterade mozzarellaoststänger",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Friday": [
                        {
                            "name": "Kycklingvingar",
                            "price": 81,
                            "description": "Kryddiga kycklingvingar med dipsås",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Nachos",
                            "price": 72,
                            "description": "Tortillachips med ost och jalapeños",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Saturday": [
                        {
                            "name": "Grillad Kyckling",
                            "price": 135,
                            "description": "Marinerad kycklingbröst grillad till perfektion",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "BBQ Revben",
                            "price": 108,
                            "description": "Långkokta revben med BBQ-sås",
                            "time": "17:00-20:00"
                        }
                    ],
                    "Sunday": [
                        {
                            "name": "Grillad Lax",
                            "price": 162,
                            "description": "Laxfilé med citron och örter",
                            "time": "11:00-14:00"
                        },
                        {
                            "name": "Biff",
                            "price": 171,
                            "description": "Saftig biff med vitlökssmör",
                            "time": "17:00-20:00"
                        }
                    ]
                }
            }),
        }));


        let currentDayIndex = new Date('2024-09-17T18:00:00.000Z');
        await renderSpecial(currentDayIndex);
        hideLoaderShowSpecial();

        expect(document.querySelector('#specials-dish-name').textContent).toEqual("Grillad Lax");
    });

});

describe('active button classname', () => {

    it('check that active button(grill) has the correct classnames', async () => {
        fetch.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "Grill": [
                    {
                        "name": "BBQ Revben",
                        "price": "120",
                        "description": "Långkokta revben med BBQ-sås"
                    },
                    {
                        "name": "Grillad Kyckling",
                        "price": "150",
                        "description": "Marinerad kycklingbröst grillad till perfektion"
                    },
                    {
                        "name": "Biff",
                        "price": "190",
                        "description": "Saftig biff med vitlökssmör"
                    },
                    {
                        "name": "Grillad Lax",
                        "price": "180",
                        "description": "Laxfilé med citron och örter"
                    },
                    {
                        "name": "Grönsaksspett",
                        "price": "80",
                        "description": "Blandade grönsaker grillade med olivolja"
                    }
                ],
                "Snacks": [
                    {
                        "name": "Pommes Frites",
                        "price": "50",
                        "description": "Krispiga gyllene pommes frites"
                    },
                    {
                        "name": "Lökringar",
                        "price": "60",
                        "description": "Panerade och friterade lökringar"
                    },
                    {
                        "name": "Mozzarella Sticks",
                        "price": "70",
                        "description": "Friterade mozzarellaoststänger"
                    },
                    {
                        "name": "Kycklingvingar",
                        "price": "90",
                        "description": "Kryddiga kycklingvingar med dipsås"
                    },
                    {
                        "name": "Nachos",
                        "price": "80",
                        "description": "Tortillachips med ost och jalapeños"
                    }
                ],
                "Drycker": [
                    {
                        "name": "Coca Cola",
                        "price": "30",
                        "description": "Klassisk Coca Cola"
                    },
                    {
                        "name": "Apelsinjuice",
                        "price": "40",
                        "description": "Färskpressad apelsinjuice"
                    },
                    {
                        "name": "Lemonad",
                        "price": "35",
                        "description": "Hemlagad lemonad"
                    },
                    {
                        "name": "Is-te",
                        "price": "35",
                        "description": "Kall te med citron"
                    },
                    {
                        "name": "Kaffe",
                        "price": "25",
                        "description": "Nybryggt kaffe"
                    }
                ]
            }),
        }));

        await renderMenu();

        expect(document.querySelector('.options.options--active').textContent).toEqual("Grill");
    });

});

describe('render correct menu on start', () => {

    it('start on grill menu', async () => {
        fetch.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "Grill": [
                    {
                        "name": "BBQ Revben",
                        "price": "120",
                        "description": "Långkokta revben med BBQ-sås"
                    },
                    {
                        "name": "Grillad Kyckling",
                        "price": "150",
                        "description": "Marinerad kycklingbröst grillad till perfektion"
                    },
                    {
                        "name": "Biff",
                        "price": "190",
                        "description": "Saftig biff med vitlökssmör"
                    },
                    {
                        "name": "Grillad Lax",
                        "price": "180",
                        "description": "Laxfilé med citron och örter"
                    },
                    {
                        "name": "Grönsaksspett",
                        "price": "80",
                        "description": "Blandade grönsaker grillade med olivolja"
                    }
                ],
                "Snacks": [
                    {
                        "name": "Pommes Frites",
                        "price": "50",
                        "description": "Krispiga gyllene pommes frites"
                    },
                    {
                        "name": "Lökringar",
                        "price": "60",
                        "description": "Panerade och friterade lökringar"
                    },
                    {
                        "name": "Mozzarella Sticks",
                        "price": "70",
                        "description": "Friterade mozzarellaoststänger"
                    },
                    {
                        "name": "Kycklingvingar",
                        "price": "90",
                        "description": "Kryddiga kycklingvingar med dipsås"
                    },
                    {
                        "name": "Nachos",
                        "price": "80",
                        "description": "Tortillachips med ost och jalapeños"
                    }
                ],
                "Drycker": [
                    {
                        "name": "Coca Cola",
                        "price": "30",
                        "description": "Klassisk Coca Cola"
                    },
                    {
                        "name": "Apelsinjuice",
                        "price": "40",
                        "description": "Färskpressad apelsinjuice"
                    },
                    {
                        "name": "Lemonad",
                        "price": "35",
                        "description": "Hemlagad lemonad"
                    },
                    {
                        "name": "Is-te",
                        "price": "35",
                        "description": "Kall te med citron"
                    },
                    {
                        "name": "Kaffe",
                        "price": "25",
                        "description": "Nybryggt kaffe"
                    }
                ]
            }),
        }));

        await renderMenu();

        expect(document.querySelector('#content>ul>li>div>h3').textContent).toEqual("BBQ Revben");
    });

}); 
