let url = "https://randomuser.me/api/?results=10";
let picture = document.getElementById("p_picture");
let name = document.getElementById("p_name");
let age = document.getElementById("p_age");
let locations = document.getElementById("p_location");
let userFetch = [];


fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (i = 0; i < 10; i++) {
            let user = data.results[i];
            let x = {
                picture: user.picture.large,
                name: user.name.last,
                firstname: user.name.first,
                age: user.dob.age,
                place: user.location.city + ", " + user.location.state,
                id: user.login.uuid
            }
            userFetch.push(x);
        }
        console.log(userFetch);
        displayFirstPerson()
    })
    .catch(function (error) {
        console.log(error);
    })

function displayFirstPerson() {
    picture.src = userFetch[0].picture;
    name.innerHTML = userFetch[0].name;
    name.innerHTML += " " + userFetch[0].firstname;
    age.innerHTML = userFetch[0].age;
    locations.innerHTML = userFetch[0].place;

    function showPos(position){
        let lat1 = userFetch[0].lat;
        let lon1 = userFetch[0].long;
        let lat2 = position.coords.latitude;
        let lon2 = position.coords.longitude;
        let p = 0.017453292519943295; 
        let c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
        let x = Math.round(12742 * Math.asin(Math.sqrt(a)));
        console.log(x);
        document.getElementById("p_distance").innerHTML = x + " km";
    }
    map.flyTo({
        center: [
            userFetch[0],long, userFetch[0].lat 
        ]
    })
    let radius = 35;
}



//GEOLOCATION for long and latitudes

let y= document.getElementById("demo");
let f= document.getElementById("p_distance");

mapboxgl.accessToken= 'pk.eyJ1Ijoib25hZGVtdXl0ZXJlIiwiYSI6ImNqb2h0aWdiejAxc2Uza3FxZjZiY2t0dzMifQ.Yo3WwLGoG3jhGy1aBadahA';

function getLocation(){
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
    meLat = position.coords.latitude;
    meLong = position.coords.longitude;
    console.log ("Latitude: " + meLat + ", Longitude: " + meLong);
    });
}
else {
    y.innerHTML = "Geolocation is not supported by this browser.";
}};


function map(location){
let map = new mapboxgl.Map({
    container: 'map',
    zoom: 10,
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [0,0]
});
}



//geolocation of tinder person
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (i = 0; i < 10; i++) {
            let user = data.results[i];
            tinderLat = user.location.coordinates.latitude;
            tinderLong = user.location.coordinates.longitude;
        }
    })


function getDistanceFromLatLonInKm(tinderLat, tinderLong, meLat, meLong)
{
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(meLat-tinderLat);  // deg2rad below
    let dLon = deg2rad(meLong-tinderLong); 
    let a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(tinderLat)) * Math.cos(deg2rad(meLat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    f.innerHTML = d;
}


function deg2rad(deg) {
  return deg * (Math.PI/180)
}


//drag and drop functions
(function() 
{
    document.addEventListener('dragStart', dragStart, false);
    document.addEventListener('drop', drop, false);
    document.addEventListener('dragEnd', dragEnd, false);
    document.addEventListener('dragOver', dragOver, false);

}) ();

//what data has to be dragged?
function dragStart(e) {
    e.target.style.opacity = .3;
    e.dataTransfer.setData("text", e.target.id);
    e.dataTransfer.dropEffect = "move";
}

//where should the data be dropped?
function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
}

function dragEnd(e) {
  e.preventDefaul();
}

function dragOver(e) {
    e.preventDefault();
}
