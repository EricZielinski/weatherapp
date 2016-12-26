
$(document).ready(function() {
    var lat;
    var long;
    
    var weather = {
        gps: function(position) {
            navigator.geolocation.getCurrentPosition(located);
            lat = position.coords.latitude;
            long = position.coords.longitude;
        },
        initHideC: function() {
            $("#celsius").hide();
            $("#cBtn").hide();
        },
        selectF: function() {
            $("#fBtn").click(function() {
                $("#fahrenheit").hide();
                $("#fBtn").hide();
                $("#celsius").show();
                $("#cBtn").show();
            })
        },
        selectC: function() {
             $("#cBtn").click(function() {
                $("#celsius").hide();
                $("#cBtn").hide();
                $("#fahrenheit").show();
                $("#fBtn").show();
            });
        },
        xhr: function() {
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
        }
    }
    
    weather.initHideC();
    weather.selectC();
    weather.selectF();
});