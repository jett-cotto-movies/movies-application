/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');
const $ = require('jquery');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
var output = $("#output");
var submitButton = $("#movieSubmit");
var editId;

// display movies function
function getMovieList() {
  getMovies().then((movies) => {
    // start the loading spinner right here
    output.html("");
    movies.forEach(({title, rating, id}) => {
      var movieOutput = "<div>";
          // movieOutput += ("<td>" + id + "</td>");
          movieOutput += ("<span>" + title + "  </span>");
          movieOutput += ("<span>" + rating + " </span>");
          movieOutput += ('<button class="deleteButton btn btn-primary btn-sm" id="delete' + id + '"' + '>X</button>');
          movieOutput += ('<button class="editButton" id="edit' + id + '"' + '>Edit</button>');
          movieOutput += "</div>";
  
          output.append(movieOutput);
  
          //end the loading spinner here
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}



// delete function
$(document).on('click','.deleteButton', function() { 
  var id = this.id.slice(6);
  $.ajax("/api/movies/"+id, {
    type: "DELETE"
  }).done(function(done) {
    getMovieList();
  });
});


//edit function...Still not working
$(document).on('click','.editButton', function() { 
  var id = this.id.slice(4);
  // console.log(id);
  editId = id;
  getMovie(id);
  $.ajax("/api/movies/"+id, {
    type: "PUT"
  }).done(function(done) {
    getMovieList();
  });
});

$(document).on('click','#editMovie', function(e) { 
  e.preventDefault();
  var title = $("#inputTitle").val();
  var rating = $("#inputRating").val();
  console.log("Running edit -- Title/Rating: " + title + "/" + rating);
  $.ajax("/api/movies/"+editId, {
    type: "PUT",
    data: {
        "title": title,
        "rating": rating
    }
  }).done(function(done) {
    getMovieList();
  });
});

getMovieList();


// add function
submitButton.click(function(e) {
  e.preventDefault();
  console.log("Submitted");
  var title = $("#inputTitle").val();
  var rating = $("#inputRating").val();
  $.ajax("/api/movies", {
    type: "POST",
    data: {
        "title": title,
        "rating": rating
    }
  }).done(function(done) {
    getMovieList();
  });
});

getMovieList();


//Start and stop spin on loading animation...
document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'interactive') {
       document.getElementById('contents').style.visibility="hidden";
  } else if (state == 'complete') {
      setTimeout(function(){
         document.getElementById('load').style.visibility="hidden";
      },1000);
  }
}