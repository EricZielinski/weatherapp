var getIP = "https://ipinfo.io";

function setCondition(condition) {
  $("#condition").append(condition[0].description);
}

function setLocation(location) {
  $("#location").append(location);
}

function setTemp(degrees) {
  $("#fahrenheit").prepend(document.createTextNode(Math.round(degrees.temp)));
  $("#fBtn").show();
  $("#fahrenheit").show();

  let celsius = (Math.round(degrees.temp) - 32)  * 5/9;
  $("#celsius").prepend(document.createTextNode(Math.round(celsius)));
}

function parseData(rawData) {
  setCondition(rawData.weather);
  setLocation(rawData.name);
  setTemp(rawData.main);
}

function getData(parseData, getIP) {
  $.getJSON(getIP).done(function(location) {
    let loc = location.loc.split(",")
    let lat = loc[0];
    let long = loc[1];
    let url = "http://api.openweathermap.org/data/2.5/weather";
    $.getJSON(url, {
      lat: lat,
      lon: long,
      units: 'imperial',
      APPID: '2943e02eaf0fc5e4dca804a68da83b82'
        }).done(function(weather) {
          parseData(weather);
          selectAnimation();
        })
  });
}

function getLocalTime() {
    var time = new Date();
    return time.getHours();
}

function selectAnimation() {
  const localTime = getLocalTime();
  var str = $("#condition").text();
  str = str.slice(1);
  if ((str.search(/scattered clouds|broken clouds/) !== -1) && ((localTime >= 7) && (localTime <= 19 !== -1))) {
   $("#condition").prepend($("#partlyCloudy"));
    $("#partlyCloudy").show();
  } else if (str.search(/overcast clouds/) !== -1) {
    $("#condition").prepend($("#cloudy"));
    $("#cloudy").show();
  } else if (str.search(/.*rain.*/) !== -1) {
    $("#condition").prepend($("#rain"));
    $("#rain").show();
  } else if (str.search(/mist|Smoke|Haze|fog|dust|sand/) !== -1) {
    $("#condition").prepend($("#fog"));
    $("#fog").show();
  } else if (str.search(/.*thunderstorm.*|tornado/) !== -1) {
    $("#condition").prepend($("#lightning"));
    $("#lightning").show();
  } else if (str.search(/.*[sS]now.*/) !== -1) {
    $("#condition").prepend($("#sleet_snow"));
    $("#sleet_snow").css("fill", "white");
    $("#sleet_snow").show();
  } else if (str.search(/.*[sS]leet.*/) !== -1) {
    $("#condition").prepend($("#sleet_snow"));
    $("svg rect.d").css("fill", "#034aec");
    $("#sleet_snow").show();
  } else if ((str.search(/clear|few clouds/) !== -1) && (localTime >= 7) && (localTime <= 19)) {
    $("#condition").prepend($("#sunny"));
    $("#sunny").show();
  } else if ((str.search(/clear|few clouds/) !== -1) && (localTime < 7 || localTime > 19)) {
    $("#condition").prepend($("#moon"));
    $("#moon").show();
  }
}


getData(parseData, getIP);
getLocalTime();


var buttons = {
  createButtons: function() {
    $("#fahrenheit").append("<button id='fBtn'>°F</button>");
    $("#celsius").append("<button id='cBtn'>°C</button>")
  },
  initHideDegrees: function() {
    $("#celsius").hide();
    $("#fahrenheit").hide();
    $("#cBtn").hide();
    $("#fBtn").hide();
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

buttons.createButtons();
buttons.initHideDegrees();
buttons.selectF();
buttons.selectC();
buttons.initWeatherHide();
// navigator.geolocation.getCurrentPosition(located);
