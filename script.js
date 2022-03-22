let button = document.getElementById("get-location")
let latitude = document.getElementById("latitude")
let longitude = document.getElementById("longitude")
let iniciarTrekking = document.getElementById("iniciarTrekking")
let finalizarTrekking = document.getElementById("finalizarTrekking")
let cardLatitudeLongitude = document.getElementById("card-latitude-longitude")
let bodydBox = document.getElementById("body_box")

let encerrarTrekking = false

button.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude
        let long = position.coords.longitude

        latitude.value = lat
        longitude.value = long
    })
})

iniciarTrekking.addEventListener("click", () => {
    // encerrarTrekking = false

    function getGeolocalization() {
        if(!encerrarTrekking) {
            navigator.geolocation.getCurrentPosition( position => {
                let lat = position.coords.latitude
                let long = position.coords.longitude
    
                preencherTrekking(lat, long)

                console.log(`LATITUDE: ${lat}`)
                console.log(`LONGITUDE: ${long}`)
            })
        } else {
            let fimTrekking = document.createElement('div');
            fimTrekking.classList.add("fim_trekking");
            fimTrekking.innerText = "TREKKING ENCERRADO"
            cardLatitudeLongitude.appendChild(fimTrekking)

            console.log("Trekking encerrado")
            clearInterval(intervalId)
        }
    }

    const intervalId = setInterval(getGeolocalization, 3000)  
})

finalizarTrekking.addEventListener("click", () => {
    encerrarTrekking = true
})

function preencherTrekking(latitude, longitude) {
    let div = document.createElement('div');
    div.classList.add("box_latitude_longitude");

    let spanLatitude = document.createElement('span');
    spanLatitude.classList.add("latitude_longitude")
    spanLatitude.innerText = `LATITUDE: ${latitude}`

    let spanLongitude = document.createElement('span');
    spanLongitude.classList.add("latitude_longitude")
    spanLongitude.innerText =`LONGITUDE: ${longitude}`

    div.appendChild(spanLongitude)
    div.appendChild(spanLatitude)
    cardLatitudeLongitude.appendChild(div)
}