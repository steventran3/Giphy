
$(document).ready(function(){

  var results = [];
  var nbaStars = ['kobe bryant', 'lebron james', 'stephan curry', 'kyrie irving', 'dwyane wade', 'lonzo ball', 'michael jordan'];

  initiate_buttons()

  $(document).on('click', '.main_buttons', function(){


    var nba_player = $(this).text();
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+nba_player+'&api_key=dc6zaTOxFJmzC'

    $('.content_div').empty();

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      results = response.data;
        //console.log(results)

        for (var i=0; i < 10; i++){

          var gif_div = $('<div>')
          var rating = $('<p>').text('Ratings: ' + results[i].rating);
          var img = $('<img class="images_div" src="'+results[i].images.downsized_still.url+'" data-state="still" number="'+i+'">')
          //img.attr('src', results[i].images.fixed_height.url);

          gif_div.append(rating);
          gif_div.append(img);

          $('.content_div').append(gif_div);

        }
      })
  });

  
  function initiate_buttons (){

    for (var i = 0; i < nbaStars.length; i++) {
      var buttons = $('<button class="btn btn-success main_buttons">'+nbaStars[i]+'</button>');
      $('.newButtons').append(buttons);
    }
  }


  // Submit new GIF button
  $('#submitButton').on('click', function(){
    var newPerson = $('#usrTerm').val();
    var button_new = $('<button class="btn btn-success main_buttons">'+newPerson+'</button>')
    $('.newButtons').append(button_new);
  })



// Function to pause and animate images
  $(document).on("click",".images_div",function pausing_image(){

    var data_state = $(this).attr("data-state");
    // console.log(data_state);
    var index = $(this).attr("number");    

    if (data_state=="still"){
      $(this).attr("data-state","animate");
      $(this).attr("src",results[(index)].images.downsized.url);
    }
    else if (data_state=="animate"){
      $(this).attr("data-state","still");
      $(this).attr("src",results[(index)].images.downsized_still.url);
    }

  })





});