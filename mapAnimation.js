 // This array contains initial locations for each bus.
let busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218]
];

// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaXR6ZWxtciIsImEiOiJjbGFpZG5kYmEwMW1yM3BuejQzanBxaTl1In0._nKnBu-lXqGD5_hUj5dxSQ';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"
const marker = [
  new mapboxgl.Marker({ "color": "#ff0000" }).setLngLat(busStops[0]).addTo(map),
  new mapboxgl.Marker({"color": "#00ff00"}).setLngLat(busStops[1]).addTo(map),
  new mapboxgl.Marker({"color": "#0000ff"}).setLngLat(busStops[2]).addTo(map),
  new mapboxgl.Marker({"color": "#ffaa00"}).setLngLat(busStops[3]).addTo(map),
  new mapboxgl.Marker({"color": "#ff00aa"}).setLngLat(busStops[4]).addTo(map),
  new mapboxgl.Marker({"color": "#aaff00"}).setLngLat(busStops[5]).addTo(map),
  new mapboxgl.Marker({"color": "#00ffaa"}).setLngLat(busStops[6]).addTo(map),
  new mapboxgl.Marker({"color": "#aa00ff"}).setLngLat(busStops[7]).addTo(map),
  new mapboxgl.Marker({"color": "#00aaff"}).setLngLat(busStops[8]).addTo(map)
] 

async function move() {
  console.log('start');
  // gets each bus location data
    const locations = await getBusData();
    busStops = [];
    for (let location = 0; location < locations.length; location++) {
      busStops.push([locations[location].attributes.longitude, locations[location].attributes.latitude]);
    }
    counter = 0;
  
  // updates each bus location data, in total 9 buses
  setTimeout(() => {
    for (let location = 0; location < busStops.length; location++) {
      marker[location].setLngLat(busStops[location]);
    }
    move()
  }, 15000);
}


//acquires data of the 9 buses returned by the api
async function getBusData(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}