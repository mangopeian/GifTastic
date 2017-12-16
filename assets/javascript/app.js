var feelings = ['Excited', 'Sad', 'Angry', 'Surprised','Love'];


	function displayGif(){

		var gif = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=LbTCNbcyAZaC8oO6biR4L3nYg3IJh1rZ";

		 $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		 	console.log(response);
			$("#feelingsView").empty();
            for (var i = 0; i < response.data.length; i++){

            	var rating = response.data[i].rating;
                var imageUrl = response.data[i].images.fixed_height.url;
             	var imageStillUrl = response.data[i].images.fixed_height_still.url;

                var image = $("<img>");
                var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

                
                image.attr('src', imageStillUrl);
                image.attr('alt', 'gif');
                image.attr('data-state', 'still');
                image.attr('data-still', imageStillUrl);
                image.attr('data-animate', imageUrl);


                $('#feelingsView').prepend(image, ratingText);
                checkState ();
            }
		 }); 
	} 

	function renderButtons(){ 

		$('#buttonsView').empty();

		for (var i = 0; i < feelings.length; i++){

		    var newButton = $('<button class="btn btn-primary">') 
		    newButton.addClass('feeling'); 
		    newButton.attr('data-name', feelings[i]); 
		    newButton.text(feelings[i]); 
		    $('#buttonsView').append(newButton); 
		}
	}

	$('#addFeeling').on('click', function(){

		var feeling = $('#feeling-input').val().trim();

		feelings.push(feeling);
		
		renderButtons();

		return false;
	})


	$(document).on('click', '.feeling', displayGif);

	renderButtons();

	function checkState(){
		$('img').on('click', function(){
	  var state = $(this).attr('data-state'); 
	  if (state == 'still'){
	  $(this).attr('src', $(this).data('animate'));
	  $(this).attr('data-state', 'animate');
	  }else{
	  $(this).attr('src', $(this).data('still'));
	  $(this).attr('data-state', 'still');
	}

		});
	};