async function fetchData() {

    try {
        const response = await fetch('./weather.json')
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error: ", error);

    }
}

var modifier = 0;

async function readData() {

    const weatherData = await fetchData();
    
    
    function loop() {
        
        const date = new Date()

        date.setDate(date.getDate() + modifier)

        var dateArray = date.toISOString().split("T")

        console.log(dateArray[0])

        for (const element of weatherData.weather_data) {
            if (element.date == dateArray[0]) {
                addContent(element.temperatures, "#tempratur")
                return
            } else {
                console.log("nooooothin")
            }
        }

    }

    loop()

    function buttonPress() {

        const btn = document.querySelector("#button-next")
        btn.addEventListener('click', () => {
            if(modifier === 0) {
                modifier = 1;
                btn.textContent = "Vädret Idag"
            } else {
                modifier = 0;
                btn.textContent = "Vädret Imorgon"
            }
            loop()
        })
        

    }

    buttonPress()

}


readData()


function addContent(content, id) {
    const contentIdentifier = document.querySelector(id)
    contentIdentifier.textContent = content;
}


setInterval(() => {
    
    const date = new Date()

    date.setDate(date.getDate() + modifier)

    var dateTimeArray = date.toISOString().split("T")
    var dateFormatted = date.toLocaleDateString()
        .split("/").filter((x) => x.length < 3).join("/")

    const time = dateTimeArray[1].substring(0, 8)

    const veckoDagar = [
        "Söndag", "Måndag", "Tisdag", "Onsdag",
        "Torsdag", "Fredag", "Lördag"
    ]

    var weekday = veckoDagar[date.getDay()]

    addContent((weekday + " kl: " + time + " " + dateFormatted)
        , "#today")
}, 1000)


