
function located(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  jQuery(document).ready(function($) {
    $.ajax({
      url: "https://api.wunderground.com/api/87e874167c96fe8e/conditions/q/" + lat + "," + long + ".json",
      dataType: "jsonp",
      success: function(parsed_json) {
          console.log(parsed_json);
          var weather = {
            addDegrees: function() {
              $("#fahrenheit").prepend(document.createTextNode(Math.round(parsed_json.current_observation.temp_f)));
              $("#celsius").prepend(document.createTextNode(Math.round(parsed_json.current_observation.temp_c)));
            },
            addLocation: function() {
              $("#location").append(parsed_json.current_observation.display_location.full);
            },
            addCondition: function() {
              $("#condition").append(parsed_json.current_observation.weather);
            },
            findTime: function() {
              var time = new Date();
              var localHour = time.getHours();
              return localHour;
            },
            addIcon: function() {
                var str = $("#condition").text();
                str = str.slice(1);
                if (str.search(/Partly Cloudy/) !== -1 && (weather.findTime() >= 7 && weather.findTime() <= 19) !== -1) {
                  $("#condition").prepend($("#partlyCloudy"));
                  $("#partlyCloudy").show();
                } else if (str.search(/Overcast|Mostly Cloudy|Partly Cloudy/) !== -1) {
                  $("#condition").prepend($("#cloudy"));
                  $("#cloudy").show();
                } else if (str.search(/Rain|Drizzle/) !== -1) {
                  $("#condition").prepend($("#rain"));
                  $("#rain").show();
                } else if (str.search(/Mist|Fog|Haze|Spray/) !== -1) {
                  $("#condition").prepend($("#fog"));
                  $("#fog").show();
                } else if (str.search(/Hail|Thunderstorm|Thunderstorms|Funnel Cloud/) !== -1) {
                  $("#condition").prepend($("#lightning"));
                  $("#lightning").show();
                } else if (str.search(/Snow/) !== -1) {
                  $("#condition").prepend($("#sleet_snow"));
                  $("#sleet_snow").css("fill", "white");
                  $("#sleet_snow").show();
                } else if (str.search(/Sleet|Ice/) !== -1) {
                  $("#condition").prepend($("#sleet_snow"));
                  $("svg rect.d").css("fill", "#034aec");
                  $("#sleet_snow").show();
                } else if (str.search(/Clear|Scattered Clouds/ && weather.findTime() >= 7 && weather.findTime() <= 19) !== -1) {
                  $("#condition").prepend($("#sunny"));
                  $("#sunny").show();
                } else if (str.search(/Clear|Scattered Clouds/) !== -1 && (weather.findTime() < 7 || weather.findTime() > 19)) {
                  $("#condition").prepend($("#moon"));
                  $("#moon").show();
                }
              } //end addIcon
          }; //end weather object
          weather.addDegrees();
          weather.addLocation();
          weather.addCondition();
          weather.addIcon();
        } //end success
    }); //end ajax
  }); //end ready
}; //end located function

var buttons = {
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
    });
  },
  selectC: function() {
    $("#cBtn").click(function() {
      $("#celsius").hide();
      $("#cBtn").hide();
      $("#fahrenheit").show();
      $("#fBtn").show();
    });
  },
  initWeatherHide: function() {
    //not a button but didn't want this hanging out by itslef
    $(".weather").hide();
  }
};

buttons.initHideC();
buttons.selectC();
buttons.selectF();
buttons.initWeatherHide();
navigator.geolocation.getCurrentPosition(located);