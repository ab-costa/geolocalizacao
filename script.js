let button = document.getElementById("get-location")
let latitude = document.getElementById("latitude")
let longitude = document.getElementById("longitude")
let iniciarTrekking = document.getElementById("iniciarTrekking")
let finalizarTrekking = document.getElementById("finalizarTrekking")

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
    encerrarTrekking = false

    function getGeolocalization() {
        if(!encerrarTrekking) {
            navigator.geolocation.getCurrentPosition( position => {
                let lat = position.coords.latitude
                let long = position.coords.longitude
    
                console.log(`LATITUDE: ${lat}`)
                console.log(`LONGITUDE: ${long}`)
            })
        } else {
            console.log("Trekking encerrado")
            clearInterval(intervalId)
        }
    }

    const intervalId = setInterval(getGeolocalization, 3000)  
})

finalizarTrekking.addEventListener("click", () => {
    encerrarTrekking = true
})
