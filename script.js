

var APIKey = "c845459fa98a4e99f601fe9683c800bd"
var lon = 0;
var lat = 0;


$("#search-button").on("click", function(){
    var citySearch = $("#search-value").val();
    $("#search-value").val("");
    currentWeather(citySearch);
    forecast(citySearch);
})


function renderHistory() {

    var secondDiv = $("<div>").addClass("buttons-view")

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
   

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var createButton = $("<button>");
      // Adding a class
      createButton.addClass("history");
      // Added a data-attribute
      
      // Provided the initial button text
      createButton.text().val(citySearch);
      // Added the button to the HTML
      var thirdDiv = $("#buttons-view").append(createButton);

      var bodyTag = secondDiv.append(thirdDiv);

        $("body").append(bodyTag)

      

      
    }
  



function currentWeather(citySearch){

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + APIKey,
        method: "GET"
    }).then(function(response) {
    console.log(response)

    var title = $("<h3>").addClass("card-title").text(response.name + "(" + new Date().toLocaleDateString() + ")")
    var card = $("<div>").addClass("card")
    var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp)
    var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%")
    var wind = $("<p>").addClass("card-text").text("Windspeed: " + response.wind.speed + "mph" )
    var cardBody = $("<div>").addClass("card-body")
    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

lon = response.coord.lon
lat = response.coord.lat

title.append(img)
cardBody.append(title, temp, humidity, wind)
card.append(cardBody)

$("#today").append(card)

$.ajax({
    url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey,
    method: "GET"
  }).then(function(response) {
      console.log(response)

    var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + response.value)
    cardBody.append(uvIndex)





  });
})
}

function forecast(citySearch){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + APIKey,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

        for(var i = 0; i < response.list.length; i++){
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1){
                var column = $("<div>").addClass("col-md-2");
                var card = $("<div>").addClass("card bg-primary text-white")
                var bodyDiv = $("<div>").addClass("card-body")
                var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString())
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")
                var temp = $("<p>").addClass("card-text").text("Temperature: " + response.list[i].main.temp)
                var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity)

                column.append(card.append(bodyDiv.append(title, img, temp, humidity)))
                $("#forecast").append(column)
            }

        }
    })
}

forecast();
currentWeather();











//var isAfter = day.js().isAfter('2018-04-04T16:00:00.0002', 'minute')

