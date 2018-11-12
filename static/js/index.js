const None = undefined;

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
    $.getJSON(getMoviesUrl,
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
    $.post(insertMoviesUrl, newMovie, function(response) { 
        newMovie['id'] = response.new_movie_id;
        app.movies.push(newMovie);
        processMovies(); 
    });
};

var editMovie = function(idx) {
    app.movies[idx].editing = true;
};

var saveMovie = function(idx) {
    app.movies[idx].editing = false;
    var movieToUpdate = app.movies[idx];
    $.post(updateMovieUrl, {
        id: movieToUpdate.id,
        title: movieToUpdate.title,
        description: movieToUpdate.description,
        rating: movieToUpdate.rating
     });
};

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