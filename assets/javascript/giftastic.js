// get the gif input

var topics = ["United States", "Greece", "Italy", "Spain", "Russia", "Brazil", "Saudi Arabia", "South Africa", "Kazakhstan"];

function displayGif() {

	var gif = $(this).attr("data-name");
	console.log(gif);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";


	$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response) {
	
	console.log(response);

	var results = response.data

	for (var i = 0; i < results.length; i++) {
	
	var gifDiv = $("<div class='gif'>");

	var rating = results[i].rating;

	var paraOne = $("<p>").text("Rating: " + rating);

	gifDiv.append(paraOne);

	var imgURL = $("<img>");
	
	imgURL.attr("src", results[i].images.fixed_height.url);

	gifDiv.append(imgURL);

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

		a.attr("data-name", topics[i]);

		a.text(topics[i]);

		$("#countryButtons").append(a);
	}
}



$("#submit").on("click", function(event) {

	event.preventDefault();

	var topic = $("#gif-input").val().trim();

	topics.push(topic);
	renderButtons();

	
});



$(document).on("click", "button", displayGif);

renderButtons();
	

