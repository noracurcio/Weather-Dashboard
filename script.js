

var APIKey = "c845459fa98a4e99f601fe9683c800bd"
var lon = 0;
var lat = 0;

var citiesStorage = JSON.parse(localStorage.getItem("citiesStorage")) || []

if( citiesStorage.length > 0 ){
    console.log("hello")
    currentWeather(citiesStorage[citiesStorage.length-1])
}

for(i=0; i< citiesStorage.length; i++){
    createButtons(citiesStorage[i])
}


$("#search-button").on("click", function(){
    var citySearch = $("#search-value").val();
    $("#search-value").val("");
    currentWeather(citySearch);
    
    
})


function createButtons(citySearch){


    var li = $("<li>").addClass("list-group-item list-group-item-action").text(citySearch)
    $(".cityHistory").append(li);


}

$(".cityHistory").on("click", "li", function(){
    console.log($(this).text())
    currentWeather($(this).text())
    
    
    
    
})


function currentWeather(citySearch){

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + APIKey+"&units=imperial",
        method: "GET"
    }).then(function(response) {
    console.log(response)
    if(citiesStorage.indexOf(citySearch)===-1){
        citiesStorage.push(citySearch)
        localStorage.setItem("citiesStorage", JSON.stringify(citiesStorage))
        createButtons(citySearch);

    }

    var title = $("<h3>").addClass("card-title").text(response.name + "(" + new Date().toLocaleDateString() + ")")
    var card = $("<div>").addClass("card")
    var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp)
    var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%")
    var wind = $("<p>").addClass("card-text").text("Windspeed: " + response.wind.speed + "mph" )
    var cardBody = $("<div>").addClass("card-body")
    var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    forecast(citySearch)

    lon = response.coord.lon
    lat = response.coord.lat

// This will clear the input so only one city shows up 
    $("img").empty()
    card.empty()
    cardBody.empty()
    $("#today").empty()

//This will make the new city information appear
    title.append(img)
    cardBody.append(title, temp, humidity, wind)
    card.append(cardBody)
    $("#today").append(card)

//Ajax call to get the latitude and longitutde
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey,
        method: "GET"
    }).then(function(response) {
    console.log(response)
    
    var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + response.value)
    cardBody.append(uvIndex)

    
});
})
}

//This function will display the forcast for the current city 
function forecast(citySearch){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + APIKey+"&units=imperial",
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

        for(var i = 0; i < response.list.length; i++){
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1){
                var column = $("#forecast").addClass("col-md-8 margin-left")
                var card = $("<div>").addClass("card bg-primary text-white")
                var bodyDiv = $("<div>").addClass("card-body")
                var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString())
                var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")
                var temp = $("<p>").addClass("card-text").text("Temperature: " + response.list[i].main.temp)
                var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity)

                column.append(card.append(bodyDiv.append(title, img, temp, humidity)))
                $("#forecast").append(column)

                
            }

        }
    })
}

// forecast();
// currentWeather();











