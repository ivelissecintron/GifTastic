// array of topics
var topics = ["Michael Scott", "Jim Halpert", "Dwight Schrute", "Pam Beesly", "Toby Flenderson", "Kevin Malone", "Meredith Palmer", "Stanley Hudson", "Oscar Martinez", "Creed Bratton"]; 

// function to displayOfficeGifs  
function displayOfficeGifs() {
    $("#theoffice").empty();
    
	var theoffice = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theoffice + "&limit=10&api_key=MSvi3HgAogpJ3zByMDGwTkYfBHA2aw7a";
    
    //creating an ajax call to hit the giphy api
	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {
	  console.log(response);
      
	  var results = response.data;
          //for loop thru the topics array    
          for (var i = 0; i < results.length; i++) {
            //adding class for gifs   
            var gifDiv = $("<div class='item'>");
            // grabbing the rating 
            var rating = results[i].rating;
            //creating an element to have the rating displayed
            var p = $("<p>").text("Rating: " + rating);
            //creating an element to hold the office images 
            var officeImage = $("<img>");
            officeImage.attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state","still").attr("class","gif img-rounded img-responsive");
            //prepending the image
            gifDiv.prepend(officeImage);
            gifDiv.prepend(p);

            $("#theoffice").prepend(gifDiv);
          }	  
	});

}

// Function for rendering buttons
  function renderButtons() {

    // to avoid repeat buttons
    $("#officebuttons").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      var a = $("<button>");
      // Adding a class of officeBtn 
      a.addClass("officeBtn btn btn-default");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the officebuttons div
      $("#officebuttons").append(a);
    }
  }

  //function to render buttons
  renderButtons();
  //on click event 
  $(document).on("click", ".gif", function(){
        //running debugger
     	console.log("Hello!");
        
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is
      if (state==="still"){
        $(this).attr("src", $(this).attr("data-animate"))
        .attr("data-state","animate");  
      }
      // Else set src to the data-still value
      else{
        $(this).attr("src", $(this).attr("data-still"))
        .attr("data-state","still"); 
      }
    });

      // This function handles events when the add office button is clicked
      $("#addoffice").on("click", function(event) {
        event.preventDefault();
        // grabs the input from the textbox
        var  officeadd = $("#office-input").val().trim();
          // pushing new office add from the textbox to our array  
          topics.push(officeadd);
          // Calling renderButtons to add new button
          renderButtons();
      });

      // Adding a click event listener to all elements with a class of "officeBtn"
      $(document).on("click", ".officeBtn", displayOfficeGifs);
