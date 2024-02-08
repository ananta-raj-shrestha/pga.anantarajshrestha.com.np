var currentLat;
var currentLng;
var outputLng;
var outputSZF;
//Get My Current Location
function myLocation(){
    var options = {
enableHighAccuracy: true,
timeout: 5000,
maximumAge: 0
};

function success(pos) {
var crd = pos.coords;
currentLat = crd.latitude;
currentLng = crd.longitude;
document.getElementById('lat').innerHTML = currentLat;
document.getElementById('lng').innerHTML = currentLng;
// console.log('Your current position is:');
// console.log(`Latitude : ${crd.latitude}`);
// console.log(crd.longitude);
// console.log(`More or less ${crd.accuracy} meters.`);
function fetchJSONFile(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.send(null);
  }

  // Usage
  fetchJSONFile("data.json", function (response) {
    var data = JSON.parse(response);
    // Process the JSON data
    displayData(data);
  });

  function displayData(data) {
    // Access and display the JSON data on the page
    // var outputLat = document.getElementById("outputLat");
    outputLng = document.getElementById("outputLng");
    outputSZF = document.getElementById("szf");
    // console.log(data.length);
    // console.log(data[20608]["LATITUDE"]).toString();
    // console.log(Math.floor(event.latlng.lat * 1000000000000) / 1000000000000);
    // console.log(Math.floor(event.latlng.lng * 10000000000000) / 10000000000000);
    var myLat = [];
    var myLng = [];
    var szFactor = [0.25,0.3,0.35,0.4];
    for (let i = 0; i < data.length; i++) {
        myLat.push(data[i]["LATITUDE"]);
        myLng.push(data[i]["LONGITUDE"]);
        
    }
    const needleLat = Math.floor(currentLat* 1000000000000) / 1000000000000;
    const needleLng = Math.floor(currentLng* 1000000000000) / 1000000000000;
    const closestLat = myLat.reduce((a, b) => {
        return Math.abs(b - needleLat) < Math.abs(a - needleLat) ? b : a;
    });
    const closestLng = myLng.reduce((a, b) => {
        return Math.abs(b - needleLng) < Math.abs(a - needleLng) ? b : a;
    });
    
// console.log(myLng);
    for (let i = 0; i < data.length; i++) {
        
  
    if (data[i]["LATITUDE"] == closestLat )
    {
        // console.log(closestLat);
        // console.log(closestLng);
        // outputLat.innerHTML = JSON.stringify(data[i]["PGA(g)"]+" Note:by nearest latitude");

        if (data[i]["LONGITUDE"] == closestLng )
        {
    
    outputLng.innerHTML = JSON.stringify(data[i]["PGA(g)"]);
   
        //Seismic Zone Factor Calculation
const finalPGA = data[i]["PGA(g)"];
const closestSZF = szFactor.reduce((a, b) => {
    return Math.abs(b - finalPGA) < Math.abs(a - finalPGA) ? b : a;
});
        // console.log(szFactor);
        // console.log("Hello");
outputSZF.innerHTML = closestSZF;  
        }
            
    }

        }


  }
};

function error(err) {
console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
}
let mapOptions = {
    center:[28.17855984939698,84.03442382812501],
    zoom:10
}

let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

//From Map Location Picker
let marker = null;
map.on('click', (event)=> {

    if(marker !== null){
        map.removeLayer(marker);
    }

    marker = L.marker([event.latlng.lat , event.latlng.lng]).addTo(map);
    currentLat = event.latlng.lat;
    currentLng = event.latlng.lng;
  
    document.getElementById('lat').innerHTML = currentLat;
    document.getElementById('lng').innerHTML = currentLng;

    // document.getElementById('pga').innerHTML = (event.latlng.lng + event.latlng.lat)/2;
    function fetchJSONFile(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
          }
        };
        xhr.send(null);
      }
    
      // Usage
      fetchJSONFile("data.json", function (response) {
        var data = JSON.parse(response);
        // Process the JSON data
        displayData(data);
      });
 
      function displayData(data) {
        // Access and display the JSON data on the page
        // var outputLat = document.getElementById("outputLat");
        var outputLng = document.getElementById("outputLng");
        var outputSZF = document.getElementById("szf");
        // console.log(data.length);
        // console.log(data[20608]["LATITUDE"]).toString();
        // console.log(Math.floor(event.latlng.lat * 1000000000000) / 1000000000000);
        // console.log(Math.floor(event.latlng.lng * 10000000000000) / 10000000000000);
        var myLat = [];
        var myLng = [];
        var szFactor = [0.25,0.3,0.35,0.4];
        for (let i = 0; i < data.length; i++) {
            myLat.push(data[i]["LATITUDE"]);
            myLng.push(data[i]["LONGITUDE"]);
            
        }
        const needleLat = Math.floor(currentLat* 1000000000000) / 1000000000000;
        const needleLng = Math.floor(currentLng* 1000000000000) / 1000000000000;
        const closestLat = myLat.reduce((a, b) => {
            return Math.abs(b - needleLat) < Math.abs(a - needleLat) ? b : a;
        });
        const closestLng = myLng.reduce((a, b) => {
            return Math.abs(b - needleLng) < Math.abs(a - needleLng) ? b : a;
        });
        
    // console.log(myLng);
        for (let i = 0; i < data.length; i++) {
            
      
        if (data[i]["LATITUDE"] == closestLat )
        {
            // console.log(closestLat);
            // console.log(closestLng);
            // outputLat.innerHTML = JSON.stringify(data[i]["PGA(g)"]+" Note:by nearest latitude");

            if (data[i]["LONGITUDE"] == closestLng )
            {
        
        outputLng.innerHTML = JSON.stringify(data[i]["PGA(g)"]);
       
            //Seismic Zone Factor Calculation
    const finalPGA = data[i]["PGA(g)"];
    const closestSZF = szFactor.reduce((a, b) => {
        return Math.abs(b - finalPGA) < Math.abs(a - finalPGA) ? b : a;
    });
            // console.log(szFactor);
            // console.log("Hello");
    outputSZF.innerHTML = closestSZF;  
            }
                
        }

            }
  

      }

    
})
 
document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
};