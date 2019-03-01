var sportsOptions = ["Baseball", "Basketball", "Football"];

function renderButtons() {

    $("#giphy-view").empty();
    for (var i = 0; i < sportsOptions.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("gif");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", sportsOptions[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(sportsOptions[i]);
        // Adding the button to the HTML
        $("#giphy-view").append(a);

    }
}

$("#add-giphy").on("click", function (event) {
    console.log("Button Pushed");
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var sportChoice = $("#giphy-input").val().trim();
    // The movie from the textbox is then added to our array
    sportsOptions.push(sportChoice);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

$("button").on("click", function () {
    // Grabbing and storing the data-animal property value from the button
    var sports = $(this).attr("gif");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sports + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var sportsDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var sportsImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                sportsImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                sportsDiv.append(p);
                sportsDiv.append(sportsImage);

                $("#gifs-appear-here").prepend(sportsDiv);

            }
        });
});
