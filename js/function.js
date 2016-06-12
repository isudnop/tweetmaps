// global variables to be assigned values, later on, in functions
var latitude=13.7563, longitude=100.5018, map;
var markersList=[];
function getLocationTweets(){
    var api_url = 'http://isudnop.com/tweetmaps/api/postSearch.php?latitude='+latitude+'&longitude='+longitude;
  $.ajax({
    type: 'GET',
    url: api_url,
    success: function(data){
      var x = JSON.parse(data);
      var len = x.length;
      for(var j in x){
        var i = len - j - 1;
        if(x[i].coordinates !== null){
          var longitude = x[i].coordinates.coordinates[0];
          var latitude = x[i].coordinates.coordinates[1];
          var screen_name = x[i].user.screen_name;
          var tweetText = x[i].text;
          var profileImageURL = x[i].user.profile_image_url;
          var myLatlng = new google.maps.LatLng(latitude, longitude);
          var infoWindow = new google.maps.InfoWindow({
            content: tweetText
          });
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: tweetText,
            icon: profileImageURL
          });
          markersList.push(marker);
          google.maps.event.addListener(markersList[markersList.length-1], 'click', function(){});
        }
      }
      var limit_tweet = 100;
      while(markersList.length>limit_tweet){
        (markersList.shift()).setMap(null);
      }
    },
    error: function(){
      console.log("No response from the server!");
    }
  });
}

function searchGeo(){
  console.log("do function!");
  var geocoder = new google.maps.Geocoder();
  var address= document.getElementById('text-search').value;
     geocoder.geocode( { 'address': address}, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
       latitude = results[0].geometry.location.lat();
       longitude = results[0].geometry.location.lng();
       initialize();
       getLocationTweets();
     } else {
       alert("Location not found , wrong spelling?");
     }
   });
}
function initialize(){
  if (navigator.geolocation) {
    var myLocation = new google.maps.LatLng(latitude, longitude); //bangkok
    var mapOptions = {
      zoom: 14,
      center: myLocation
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLocation,
      map: map,
      title:"My Location"
    });
    var circleOptions = {
      strokeColor: '#B0C4DE',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#B0C4DE',
      fillOpacity: 0.35,
      map: map,
      center: myLocation,
      radius: 2500 // Kilometers
    };
    var circle = new google.maps.Circle(circleOptions);
  } else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
  }
}
//init on load
$(document).ready(function(){
  google.maps.event.addDomListener(window, 'load', initialize);
  setTimeout(getLocationTweets,3000);
});
//$('#submit-search').click(searchGeo());
