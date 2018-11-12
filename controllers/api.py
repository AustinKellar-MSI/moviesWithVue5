def insert_movie():
    # in this funciton, we take the data that the JavaScript sent us and insert it into the database!
    new_movie_id = db.movies.insert(
        title=request.vars.title,
        description=request.vars.description,
        rating=request.vars.rating
    )
    # JavaScript needs the id of the movie that was just created so that it can pass it to the clickThumbs function
    return response.json(dict(new_movie_id=new_movie_id))

def get_all_movies():
    movies = db(db.movies).select() # this asks the database for all entries in the movies table

    movie_list = []

    for movie in movies:
        movie_to_send = dict(
            id=movie.id,
            title=movie.title,
            description=movie.description,
            rating=movie.rating
        )

        movie_list.append(movie_to_send)


    return response.json(dict(movies=movie_list)) # return all movies as a JSON object back to JavaScript

def update_movie():
    db(db.movies.id == request.vars.id).update(
        title=request.vars.title,
        description=request.vars.description,
        rating=request.vars.rating
    )
    return "movie updated"