function getTrekking() {
    if(!encerrarTrekking) {
        navigator.geolocation.getCurrentPosition( position => {
            let lat = position.coords.latitude
            let long = position.coords.longitude

            preencherTrekking(lat, long)
        })
    } else {
        clearInterval(intervalId)
    }
}

const intervalId = setInterval(getGeolocalization, 3000)