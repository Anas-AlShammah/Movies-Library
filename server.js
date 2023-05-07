const express = require('express')

const app = express()
require('dotenv').config();
const data = require('./Movie Data/data.json')
const apiKey = process.env.APIkey;
const axios = require('axios');
app.get('/', (req, res) => {
  const data1 = {
    "title": data.title,
    "poster_path": data.poster_path,
    "overview": data.overview,
  }
  res.json(data1)
})

app.get('/favorite', (req, res) => {
  res.send('Welcome to Favorite Page');
})

app.get('/trend', newRecipesHandler)

app.get('/trans', transHandel)
app.get('/popular', popularHandel)

function newRecipesHandler(req, res) {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
  try {
    axios.get(url)
      .then(result => {
        let mapResult = result.data.results.map(item => {
          let singleRecipe = new Recipe(item.id, item.title, item.release_date, item.poster_path, item.overview);
          return singleRecipe;
        })
        res.json(mapResult)

      })
      .catch((error) => {
        console.log('sorry you have something error', error)
        res.status(500).send(error);
      })
  } catch (err) {
    errorHandler(error, req, res)
  }

}
app.get('/search', searchHandel)
function searchHandel(req, res) {
  const url = "https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=The&page=2"
  try {
    axios.get(url)
      .then(result => {
        let mapResult = result.data.results.map(item => {
          let singleRecipe = new Recipe(item.id, item.title, item.release_date, item.poster_path, item.overview);
          return singleRecipe;
        })
        res.json(mapResult)

      })
      .catch((error) => {
        console.log('sorry you have something error', error)
        res.status(500).send(error);
      })
  } catch (err) {
    errorHandler(error, req, res)
  }
}

function popularHandel(req, res) {

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${apiKey}`

  try {
    axios.get(url)
      .then(result => {
        res.json(result.data.results)

      })


      .catch((error) => {
        console.log('sorry you have something error', error)
        res.status(500).send(error);
      })
  } catch (error) {
    errorHandler(error, req, res)
  }


}

function transHandel(req, res) {
  const url = `https://api.themoviedb.org/3/person/1/translations?api_key=${apiKey}`
  try {
    axios.get(url)
      .then(result => {
        console.log(result)
        let mapResult = result.data.translations.map(item => {
          let singleRecipe = new Recipetras(item.name, item.data.biography);
          return singleRecipe;
        })
        res.json(mapResult)

      })
      .catch((error) => {
        console.log('sorry you have something error', error)
        res.status(500).send(error);
      })
  } catch (err) {
    errorHandler(error, req, res)
  }
}
function Recipetras(name, biography) {
  this.name = name;
  this.biography = biography;

}
function videoRecipe(link) {
  this.link = link
}

function Recipe(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}
function errorHandler(error, req, res) {
  const err = {
    status: 500,
    message: error
  }
  res.status(500).send(err);
}
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    responseText: "Sorry, page not found"
  });
});
app.use((req, res) => {

  res.status(500).json({
    status: 500,
    responseText: "Sorry, something went wrong"
  });
});
app.listen(3000)