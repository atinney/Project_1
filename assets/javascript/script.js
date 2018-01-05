var map;
var latLong = {
    lat: 37.773972,
    lng: -122.431297
}

//Preset Weather
//Print out weather for lat and long
      getWeather(latLong); 

$(document).ready(function() {

    // Initial Values
    var address = "";

    // Capture Address Input
    $("#add-address").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      address = $("#address-input").val().trim();
      geocode(address);  
    });
});

function geocode(address) {

	var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?";
	var key = "AIzaSyDhYGRpI-1ITkj015f6XKYRVHo1W690NlQ";


	$.ajax({
		url: googleURL + "address=" + address + "&key=" + key,
		method: "GET"
    }).done(function(response) {
    	
    	//gets the first response and sets the lat and long
    	// console.log(response);
    	latLong.lat = parseInt(response.results[0].geometry.location.lat);
    	latLong.lng = parseInt(response.results[0].geometry.location.lng);
        console.log ("lat is: " + latLong.lat);
        console.log ("long is: " + latLong.lng);

    	//Create map with this lat and long
    	initMap();

      //Print out weather for lat and long
      getWeather(latLong);    

	});	
}

      function initMap() {
          console.log("inside initMap()");
          console.log("latLong object is: ", latLong);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: {lat: latLong.lat, lng: latLong.lng}
        });
        console.log("map is: " , map);
        var marker = new google.maps.Marker({
          position: {lat: latLong.lat, lng: latLong.lng},
          map: map
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');

        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);
        console.log("before setStyle");

        map.data.setStyle(function(feature) {
          var magnitude = feature.getProperty('mag');
            //console.log("The magnitude is: " + magnitude);
          return {
            icon: getCircle(magnitude)
          };
        });
        console.log("after set style");
      }

      function getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        };
      }
 
    // onclick show all mags

    // onclick show mags within 25 mile radius
    

      function eqfeed_callback(results) {
        map.data.addGeoJson(results);
      }


      function getWeather (latLong) {
        var APIKey = "1bc7e700b8b3f753a8318cc72e7b1cf7";

        // Here we are building the URL we need to query the database
        //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latLong.lat + "&lon=" + latLong.lng + "&appid=" + APIKey;

        $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {

        console.log(response);
          $(".city").text("Weather for: " + response.name);
          $(".wind").text("Wind conditions: " + response.wind.speed + " mph " + "at a direction of " + response.wind.speed + "  degrees.");
          $(".humidity").text("Humidity is: " + response.main.humidity + " percent");
          $(".humidity").text("Humidity is: " + response.main.humidity + " percent");
        });
      }