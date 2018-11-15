let url = "https://randomuser.me/api/?results=10";
let picture = document.getElementById("p_picture");
let name = document.getElementById("p_name");
let age = document.getElementById("p_age");
let locations = document.getElementById("p_location");
let userFetch = [];
let crosses = [];
let hearts = [];

if(localStorage.getItem("crosses") !== null){
    crosses = JSON.parse(localStorage.getItem("crosses"));
}
if(localStorage.getItem("hearts") !== null){
    hearts = JSON.parse(localStorage.getItem("hearts"));
}
if(localStorage.getItem("userFetch")=== null){
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
}
function cross() {
    if (userFetch.length <= 1) {
        crosses.push(userFetch[0]);
        userFetch.shift();
        localStorage.removeItem("user");
        location.reload();
    } 
    else {
        crosses = JSON.parse(localStorage.getItem("crosses"));
        crosses.push(userFetch[0]);
        userFetch.shift();
        localStorage.setItem("user", JSON.stringify(userFetch));
        localStorage.setItem("crosses", JSON.stringify(crosses));
        displayFirstPerson();
    }
}

function heart() {
    if (userFetch.length <= 1) {
        hearts.push(userFetch[0]);
        userFetch.shift();
        localStorage.removeItem("user");
        location.reload();
    } 
    else {
        hearts = JSON.parse(localStorage.getItem("hearts"));
        hearts.push(userFetch[0]);
        userFetch.shift();
        localStorage.setItem("user", JSON.stringify(userFetch));
        localStorage.setItem("hearts", JSON.stringify(hearts));
        displayFirstPerson();
    }
}

function swipe(){
    localStorage.setItem("user", JSON.stringify(userFetch));
    document.getElementById("btn_cross").addEventListener("click", crossed)
    document.getElementById("btn_heart").addEventListener("click", hearted)
}

document.getElementById("showLikes").addEventListener('click', function() {
    document.getElementById("myCrosses").innerHTML = "";
    document.getElementById("myHearts").innerHTML = "";
})

function displayFirstPerson() {
    picture.src = userFetch[0].picture;
    name.innerHTML = userFetch[0].name;
    name.innerHTML += " " + userFetch[0].firstname;
    age.innerHTML = userFetch[0].age;
    locations.innerHTML = userFetch[0].place;
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

/* geolocation of tinder person
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
*/


function getDistanceFromLatLonInKm(tinderLat, tinderLong, meLat, meLong)
{
    let R = 6371; 
    let dLat = deg2rad(meLat-tinderLat);  
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
