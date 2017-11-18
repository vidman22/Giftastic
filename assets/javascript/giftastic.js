
// Array of topics
var topics = ["United States", "Greece", "Italy", "Spain", "Russia", "Brazil", "Saudi Arabia", "South Africa", "Kazakhstan"];


// display function
function displayGif() {

	var gif = $(this).attr("data-name");
	console.log(gif);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";


	$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response) {
	
	console.log(response);

	var results = response.data
	$("#countries").empty();
	for (var i = 0; i < results.length; i++) {
	
	var gifDiv = $("<div class='gif'>");

	var imgURL = $("<img>");

	imgURL.attr("src", results[i].images.fixed_height_still.url);

	imgURL.attr("data-still", results[i].images.fixed_height_still.url);
	
	imgURL.attr("data-animate", results[i].images.fixed_height.url);

	imgURL.attr("data-state", "still");

	gifDiv.append(imgURL);

	imgURL.addClass("giffy");

	var rating = results[i].rating;

	var paraOne = $("<p>").text("Rating: " + rating);

	gifDiv.append(paraOne);

	$("#countries").prepend(gifDiv);

	}

  });	

}
// loop through the array to add button attributes
function renderButtons() {

	$("#countryButtons").empty();

	for (var i = 0; i < topics.length; i++) {

		var a = $("<button>");

		a.addClass("gif");

		a.addClass("btn");

		a.attr("data-name", topics[i]);

		a.text(topics[i]);

		$("#countryButtons").append(a);
	}
}

// Add a new topic to the array
$("#submit").on("click", function(event) {

	event.preventDefault();

	var topic = $("#gif-input").val().trim();

	topics.push(topic);
	renderButtons();


});

// Pause the gifs
$(document).on("click", "img.giffy", function() {
	
	
        
        var state = $(this).attr("data-state");
       
        if ( state == "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
       $  (this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
        
   });

// display the gifs upon clicking the button
$(document).on("click", "button", displayGif);

// populate the buttons when you load the page
renderButtons();
	

