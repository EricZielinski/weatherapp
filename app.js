
$(document).ready(function() {
  $("#celsius").hide();
  $("#cBtn").hide();
  
  $("#fBtn").click(function() {
    $("#fahrenheit").hide();
    $("#fBtn").hide();
    $("#celsius").show();
    $("#cBtn").show();
  });
  
  $("#cBtn").click(function() {
    $("#celsius").hide();
    $("#cBtn").hide();
    $("#fahrenheit").show();
    $("#fBtn").show();
  });
  
  function located(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    jQuery(document).ready(function($) {
      $.ajax({
        url: "https://api.wunderground.com/api/87e874167c96fe8e/conditions/q/" + lat + "," + long + ".json",
        dataType: "jsonp",
        success: function(parsed_json) {
          $("#fahrenheit").prepend(document.createTextNode(Math.round(parsed_json.current_observation.temp_f)));
          
          $("#celsius").prepend(document.createTextNode(Math.round(parsed_json.current_observation.temp_c)));
          $("#location").append(parsed_json.current_observation.display_location.full);
   $("#condition").append(parsed_json.current_observation.weather);
        }
      });
    });
  }
  
  navigator.geolocation.getCurrentPosition(located);
});