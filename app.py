from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import requests
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# ===== Load Data =====
movies_dict = pickle.load(open('movie_dict.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)

similarity = pickle.load(open('similarity.pkl', 'rb'))

# ===== Helper Function to Fetch Posters =====
def fetch_poster(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=cd924694d162303ce24c7411be37ffc2&language=en-US"
    response = requests.get(url)
    data = response.json()
    return "https://image.tmdb.org/t/p/w500/" + data['poster_path']

# ===== Recommendation Function =====
def recommend(movie):
    try:
        movie_index = movies[movies['title'].str.lower() == movie.lower()].index[0]
    except IndexError:
        return [], []

    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]

    recommended_movies = []
    recommended_movies_posters = []
    for i in movies_list:
        movie_id = movies.iloc[i[0]].movie_id
        recommended_movies.append(movies.iloc[i[0]].title)
        recommended_movies_posters.append(fetch_poster(movie_id))
    return recommended_movies, recommended_movies_posters

# ===== Routes =====
@app.route('/')
def home():
    return render_template('index.html')  # Serve HTML instead of JSON

@app.route('/recommend', methods=['GET'])
def recommend_route():
    movie = request.args.get('movie')
    if not movie:
        return jsonify({"error": "Please provide a movie name"}), 400

    recommended_movies, recommended_posters = recommend(movie)
    if not recommended_movies:
        return jsonify({"error": "Movie not found in database"}), 404

    results = [
        {"title": recommended_movies[i], "poster": recommended_posters[i]}
        for i in range(len(recommended_movies))
    ]
    return jsonify(results)

# ===== Run App =====
if __name__ == '__main__':
    # Run Flask on 3000 so HTML + API both are same origin
    app.run(debug=True, host='0.0.0.0', port=3000)

