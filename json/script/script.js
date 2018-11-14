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
}

//likes en dislikes opslaan in local storage, kunnen tonen en veranderen van tabel


//GEOLOCATION for long and latitudes

let y= document.getElementById("demo");
let f= document.getElementById("p_distance");

function getLocation(){
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
    meLat = position.coords.latitude;
    meLong = position.coords.longitude;
    });
}
else {
    y.innerHTML = "Geolocation is not supported by this browser.";
}}

let map = new mapboxgl.Map({
    container: 'map',
    center:[-122.420679, 37.772537],
    zoom: 10,
    style: 'mapbox://styles/mapbox/basic-v8',
    hash: true;
})

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

//mapbox
let mapLatLong = new google.maps.LatLng(tinderLat, tinderLong);
    
let mapOptions = 
{
  zoom: 15,
  mapTypeControl: false,
  center: mapLatLng,
};

let map = new google.maps.Map(document.getElementById('map'), mapOptions);




        /*
        let posMe = navigator.geolocation.getCurrentPosition(getPositionMe);
        for(i=0; i<10; i++)
        {
            let x = data.results[i];
            let posTinder = x.navigator.geolocation.getCurrentPosition(getPositionTinder);
        {
            getPos(position.coords.latitude, position.coords.longitude);
            console.log(posMe);
        })
    
        //function getPositionMe
        //function getPositionTinder
    
        //use geolocation 
        //tinder person
       
                getPos(position.coords.latitude, position.coords.longitude);
                console.log(posTinder);
            })
        };  
        //show location on map    
        let map;
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
        //distance in km between you and the person
    function distanceMe (){
        let meLat = posMe.coords.latitude;
        let meLong = posMe.coords.longitude;
        console.log(meLat + " " + meLong);
    
    };
    
    function distanceTinder (){
        for(i=0; i<10; i++){
            let x = data.results[i];
            let tndrLat = x.posTinder.coords.latitude;
            let tndrLong = x.posTinder.coords.longitude;
            console.log(tndrLat + " " + tndrLong);
            }
        }
    };
    
    function distance2 (){
        //distance from tinderperson to me in km
        let lat = tndrLat - meLat;
        let long = tndrLong - meLong;
    };
    
    //mapbox by google maps
    let mapLatLong = new google.maps.LatLng(tndrLat, tndrLong);
    
    let mapOptions = 
    {
      zoom: 15,
      mapTypeControl: false,
      center: mapLatLng,
    };
    
    let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    //marker for position
    let mapMarker = new google.maps.Marker({
        position: mapLatLng,
        map: map,
    properties: {
            icon: {
              iconsrc: images/redCircle.gif,
              iconSize: [120, 120]
            }
          }
      
    });
    }
    
    else
    {
        console.log("Geolocation is not supported");
    }
    };
*/
//drag and drop functions
(function() 
{
    document.addEventListener('dragStart', dragstart, false);
    document.addEventListener('drop', dragdrop, false);
    document.addEventListener('dragEnd', dragend, false);
    document.addEventListener('dragOver', dragover, false);

}) ();

//what data has to be dragged?
function dragStart(e) {
    e.target.style.opacity = .3;
    e.dataTransfer.setData("text", e.target.id);
    e.dataTransfer.dropEffect = "move";
}

//where should the data be dropped?
function dragDrop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
}

function dragEnd(e) {
  e.target.style.opacity = "";
}

function dragOver(e) {
    e.preventDefault();
}
