// here, we declare a global variable
// in web2py will translate undefined (JS) to None, so we define this variable for convenience
// it is important to note that null (JS) gets translated to "" in python, NOT None.
// so we have to use undefined here
const None = undefined;

// Enumerates an array.
// this will give an _idx attribute to each movie
// the _idx will be assigned 0, 1, 2, 3 ...
var enumerate = function(arr) { 
    var k=0; return arr.map(function(e) {
        e._idx = k++;
        Vue.set(e, 'editing', false);
    });
};

var processMovies = function() {
    enumerate(app.movies);
};

var onPageLoad = function() {
    $.getJSON('/moviesWithVue3/api/get_all_movies/',
        function(response) {
            app.movies = response.movies;
            processMovies();
        }
    );
};

var insertMovie = function() {
    var newMovie = {
        title: app.newMovieTitle,
        description: app.newMovieDescription,
        rating: app.newMovieRating
    };
    $.post('/moviesWithVue3/api/insert_movie/', newMovie, function(response) { 
        // the server responded with the id number of the new movie in the database. make sure to add this to the
        // new movie object before we add it to the view
        newMovie['id'] = response.new_movie_id;
        app.movies.push(newMovie);
        processMovies(); // ned to re-index the movies now that a new one has been added to thea array
    });
};

var editMovie = function(idx) {
    app.movies[idx].editing = true;
};

var saveMovie = function(idx) {
    app.movies[idx].editing = false;
    // make request to server here to save changes in database
};

// here, we define the Vue variable. Remember, only the fields defined here (in data and methods) are 
// available inside the html
var app = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        newMovieTitle: "",
        newMovieDescription: "",
        newMovieRating: "",
        movies: []
    },
    methods: {
        submitMovie: insertMovie,
        editMovie: editMovie,
        saveMovie: saveMovie
    }
});

onPageLoad();