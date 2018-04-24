// array of office members
var officeArray = ["michael scott", "jim halpert", "dwight schrute", "pam beesly", "toby flenderson", "kevin malone", "meredith palmer", "stanley hudson", "oscar martinez", "creed bratton"]; 

// creates buttons for each item in the officeArray
function renderButtons() {
    //deletes buttons prior to adding new buttons to avoid repeat buttons
    $("#officeButtons").empty();    
    //looping through the array of office members
    for (var i = 0; i < officeArray.length; i++) {
        //generates buttons for each office member in the array
        var a = $("<button>")
        //adding a class of officemember to button
        a.addClass("officemember");
        //adding a data-attribute
        a.attr("data-name", officeArray[i]);
        //provides button text
        a.text(officeArray[i]);
        //adding the button to the buttons div
        $("#officeButtons").append(a);
    }
}

//function handles events when one button is clicked
$("#addOffice").on("click", function(){
    
    //grabs the input from the text
    var newOfficeMember = $("#office-input").val().trim();
    //adding the text from the textbox and adding to my array
    officeArray.push(newOfficeMember);
    //calling renderButtons which handles the processing of my array
    renderButtons();
})


//function for displaying office members
function displayOffice() {
    
    var theoffice = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theoffice +"&api_key=MSvi3HgAogpJ3zByMDGwTkYfBHA2aw7a&limit=10";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
        console.log(response.data);
        });
}

//function for displaying theoffice
$(document).on("click", ".theoffice", displayOffice);
//calls the renderButtons function
renderButtons();