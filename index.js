let button = document.getElementById("get-location")
let latitude = document.getElementById("latitude")
let longitude = document.getElementById("longitude")
let iniciarTrekking = document.getElementById("iniciarTrekking")
let finalizarTrekking = document.getElementById("finalizarTrekking")
let cardLatitudeLongitude = document.getElementById("card-latitude-longitude")
let bodydBox = document.getElementById("body_box")

let encerrarTrekking = false

// localStorage.setItem("lat", "");
// localStorage.setItem("long", "");

let map;
let lati
let long

function initMap() {
    navigator.geolocation.getCurrentPosition(position => {
        localStorage.setItem("lat", parseFloat(position.coords.latitude));
        localStorage.setItem("long", parseFloat(position.coords.longitude));
    })
    
    lati = localStorage.getItem("lat")
    long = localStorage.getItem("long")

    center = { lat: parseFloat(localStorage.getItem("lat")), lng: parseFloat(localStorage.getItem("long")) }

    map = new google.maps.Map(document.getElementById("map"), {
      center,
      zoom: 16,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]
    });
    
    // console.log(center)
    // const marker = new google.maps.Marker({
    //     position: center,
    //     map: map,
    // });
}

button.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude.toString().slice(0, -3)
        let long = position.coords.longitude.toString().slice(0, -3)

        latitude.value = lat
        longitude.value = long
    })
})

iniciarTrekking.addEventListener("click", () => {
    // encerrarTrekking = false

    function getGeolocalization() {
        if(!encerrarTrekking) {
            navigator.geolocation.getCurrentPosition( position => {
                const lat = (position.coords.latitude).toString().slice(0, -3);
                const long = (position.coords.longitude).toString().slice(0, -3);

                if (localStorage.getItem("lat") != lat && localStorage.getItem("long") != long) {
                    preencherTrekking(lat, long)
                }

                localStorage.setItem("lat", lat);
                localStorage.setItem("long", long);

                const local = `${lat} / ${long}`;
                console.log(local)

                console.log(`LATITUDE: ${lat}`)
                console.log(`LONGITUDE: ${long}`)

                center = { lat: parseFloat(localStorage.getItem("lat")), lng: parseFloat(localStorage.getItem("long")) }
                console.log(center);

                const marker = new google.maps.Marker({
                    position: center,
                    map: map,
                });
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