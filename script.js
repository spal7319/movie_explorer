const API_KEY = 'cd924694d162303ce24c7411be37ffc2'; // Replace with your TMDb API key
const API_URL = 'https://api.themoviedb.org/3';

const searchBar = document.getElementById('search-bar');
const movieList = document.getElementById('movie-list');
const movieDetailsModal = document.getElementById('movie-details');
const closeButton = document.querySelector('.close-button');

searchBar.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchMovies(e.target.value);
    }
});

closeButton.addEventListener('click', () => {
    movieDetailsModal.style.display = 'none';
});

async function searchMovies(query) {
    const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
        `;
        movieItem.addEventListener('click', () => showMovieDetails(movie.id));
        movieList.appendChild(movieItem);
    });
}

async function showMovieDetails(movieId) {
    const response = await fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
    const movie = await response.json();
    document.getElementById('movie-title').innerText = movie.title;
    document.getElementById('movie-release-date').innerText = `Release Date: ${movie.release_date}`;
    document.getElementById('movie-genre').innerText = `Genre: ${movie.genres.map(genre => genre.name).join(', ')}`;
    document.getElementById('movie-cast').innerText = `Cast: ${movie.credits.cast.slice(0, 5).map(cast => cast.name).join(', ')}`;
    movieDetailsModal.style.display = 'flex';
}

// Example function call to display popular movies on initial load
async function displayPopularMovies() {
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    displayMovies(data.results);
}

displayPopularMovies();
