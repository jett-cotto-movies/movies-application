/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');
const $ = require('jquery');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
var output = $("#output");
var submitButton = $("#movieSubmit");
var deleteButton = $("#movieDelete");

function getMovieList() {
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
      var movieOutput = "<tr>";
          movieOutput += ("<td>" + id + "</td>");
          movieOutput += ("<td>" + title + "</td>");
          movieOutput += ("<td>" + rating + "</td>");
          movieOutput += "</tr>";
  
          output.append(movieOutput);
  
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}



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

// deleteButton.click(function(e) {
//   e.preventDefault();
//   console.log("Deleted");
//   var title = $("#inputTitle").val();
//   var rating = $("#inputRating").val();
//   $.ajax("/api/movies", {
//     type: "DELETE",
//     data: {
//         "title": title,
//         "rating": rating
//     }
//   }).done(function(done) {
//     getMovieList();
//   });
// });

// getMovieList();