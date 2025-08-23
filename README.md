# 🎬 Movie Recommender System

A web-based movie recommendation system that suggests 5 similar movies based on your input. Built with Flask backend and vanilla JavaScript frontend, featuring a modern dark theme UI.

## ✨ Features

- **Smart Recommendations**: Get 5 similar movies based on content similarity
- **Visual Interface**: Movie posters fetched from TMDB API
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Search**: Instant recommendations as you type
- **Error Handling**: Graceful handling of invalid inputs and network errors
- **Modern UI**: Dark theme with smooth animations and hover effects

## 🖥️ Demo

![Movie Recommender Interface](https://via.placeholder.com/800x400/0f1115/e7e9ee?text=Movie+Recommender+Demo)

## 🛠️ Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Machine Learning**: Content-based filtering using cosine similarity
- **External API**: The Movie Database (TMDB) for posters
- **Data Processing**: Pandas, Pickle

## 📁 Project Structure

```
movie-recommender/
│
├── app.py                 # Flask backend server
├── movie_dict.pkl         # Preprocessed movie data
├── similarity.pkl         # Cosine similarity matrix
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
│
├── templates/
│   └── index.html        # Main HTML template
│
└── static/
    ├── style.css         # Styling and animations
    └── script.js         # Frontend JavaScript logic
```

## 🚀 Quick Start

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)
- Internet connection (for movie posters)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd movie-recommender
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   Or install manually:
   ```bash
   pip install flask flask-cors pandas requests
   ```

3. **Verify required data files**
   
   Ensure these files are present:
   - `movie_dict.pkl` - Contains movie metadata
   - `similarity.pkl` - Contains similarity matrix
   
   *Note: These files contain preprocessed data from a movie dataset and are required for the recommendation algorithm to work.*

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open your browser**
   
   Navigate to: `http://localhost:3000`

## 📋 Requirements

Create a `requirements.txt` file with:

```
Flask==2.3.3
Flask-Cors==4.0.0
pandas==2.0.3
requests==2.31.0
```

## 🎯 Usage

1. **Enter a Movie Title**: Type the name of a movie you like (e.g., "Inception", "Avatar")
2. **Click Recommend**: Hit the recommend button or press Enter
3. **View Results**: See 5 similar movies with their posters
4. **Try Different Movies**: Experiment with various genres and titles

### Example Searches
- Action: "The Dark Knight", "Mad Max: Fury Road"
- Sci-Fi: "Interstellar", "Blade Runner"
- Romance: "The Notebook", "Titanic"
- Comedy: "The Hangover", "Superbad"

## 🔧 API Endpoints

### GET `/`
Returns the main HTML interface

### GET `/recommend`
Returns movie recommendations

**Parameters:**
- `movie` (string, required): Movie title to get recommendations for

**Response:**
```json
[
  {
    "title": "Similar Movie 1",
    "poster": "https://image.tmdb.org/poster_url1.jpg"
  },
  {
    "title": "Similar Movie 2", 
    "poster": "https://image.tmdb.org/poster_url2.jpg"
  }
]
```

**Error Responses:**
- `400`: Missing movie parameter
- `404`: Movie not found in database

## 🎨 Customization

### Changing the Theme
Edit CSS variables in `static/style.css`:

```css
:root {
  --bg: #0f1115;        /* Background color */
  --panel: #171a21;     /* Panel background */
  --text: #e7e9ee;      /* Text color */
  --accent: #ff4757;    /* Accent color */
}
```

### Modifying Recommendations Count
In `app.py`, change the slice range:

```python
# Change from [1:6] to [1:11] for 10 recommendations
movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]
```

### Adding Movie Ratings/Scores
Uncomment and modify the score display code in `script.js`:

```javascript
const score = document.createElement("span");
score.className = "badge";
score.textContent = `Score: ${(item.score ?? 0).toFixed(2)}`;
```

## 🔐 Security Considerations

### API Key Protection
The TMDB API key is currently hardcoded. For production:

1. **Create `.env` file:**
   ```
   TMDB_API_KEY=your_api_key_here
   ```

2. **Update `app.py`:**
   ```python
   import os
   from dotenv import load_dotenv
   
   load_dotenv()
   API_KEY = os.getenv('TMDB_API_KEY')
   ```

3. **Install python-dotenv:**
   ```bash
   pip install python-dotenv
   ```

### Production Deployment
- Set `debug=False` in `app.py`
- Use a production WSGI server (Gunicorn, uWSGI)
- Configure proper CORS origins
- Use HTTPS in production

## 🐛 Troubleshooting

### Common Issues

**"Movie not found in database"**
- Try different movie titles
- Check spelling and try common variations
- The database contains popular movies; very obscure titles might not be available

**Posters not loading**
- Check internet connection
- TMDB API might be temporarily down
- Try refreshing the page

**Port already in use**
- Change the port in `app.py`: `app.run(port=3001)`
- Update `API_BASE` in `script.js` accordingly

**Module import errors**
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check Python version compatibility

## 📊 How It Works

1. **Data Preprocessing**: Movies are vectorized using TF-IDF on features like genres, keywords, cast, and crew
2. **Similarity Calculation**: Cosine similarity is computed between all movie vectors
3. **Recommendation**: When a movie is selected, the system finds movies with highest similarity scores
4. **Poster Fetching**: Movie posters are fetched from TMDB API using movie IDs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data and posters
- Flask community for the excellent web framework
- Movie dataset providers for recommendation data

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the error messages in browser console and terminal
3. Ensure all requirements are properly installed
4. Verify that pickle files are present and valid

---

**Built with ❤️ using Flask and JavaScript**
