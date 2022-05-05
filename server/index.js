const express = require('express');
const db = require('./db');

const app = express();
const PORT = 8000;

app.use(express.json());

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send();
});

app.post('/', (req, res) => {
  console.log('request received!');
  var newRecipe = req.body;

  db.query(`INSERT INTO recipes(username, title, summary, rating, url) VALUES ($1, $2, $3, $4, $5)`, [newRecipe.username, newRecipe.title, newRecipe.summary, newRecipe.rating, newRecipe.url], (err, result) => {
    if (err) {
      res.status(409).end();
      console.log('bad ping');
      return console.log(err);
    }
    res.header("Access-Control-Allow-Origin", "*");
    console.log('request stored');
    res.end('success!');
  })
});

app.put('/rating', (req, res, next) => {
  console.log('updating rating');
  var recipe = req.body.recipe;
  var newRating = req.body.rating

  db.query(`UPDATE recipes SET ratings = $1 WHERE recipe_id = $2`,[newRating, recipe.recipe_id], (err, result) => {
    if (err) {
      res.status(400).end();
      console.log('bad ping');
      console.log(err);
    }
    res.header("Access-Control-Allow-Origin", "*");
    console.log('recipe rating changed');
    res.end('success!');
  })
});

app.put('/justAte', (req, res, next) => {
  console.log('updating date eaten');
  var recipe = req.body;
  db.query(`UPDATE recipes SET lastAte = CURRENT_DATE WHERE recipe_id = $1`, [recipe.recipe_id], (err, result) => {
    if (err) {
      res.status(400).end();
      console.log('bad ping');
      console.log(err);
    }
    res.header("Access-Control-Allow-Origin", "*");
    console.log('Recipe Just Ate!~');
    res.end('success!');
  })
})

app.get('/list', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send();
})

app.get('/', (req, res) => {
  console.log('ping');
  var user = req.query.user || 'recommended';
  var rating = req.query.rating || 0;
  if (req.query.rating > 0) {
    db.query(`SELECT JSON_AGG(recipes ORDER BY lastAte desc) FROM (SELECT * FROM recipes WHERE username = $1 AND rating = $2) recipes`, [user, rating], (err, result) => {
      if (err) {
        return console.log(err);
      }
      var results = {
        user: user,
        rating: rating,
        results: result.rows[0].json_agg
      }
      res.header("Access-Control-Allow-Origin", "*");
      res.send(results);
    })
  } else {
    db.query(`SELECT JSON_AGG(recipes) FROM (SELECT * FROM recipes WHERE username = $1) recipes`, [user], (err, result) => {
      if (err) {
        return console.log(err);
      }
      var results = {
        user: user,
        rating: rating,
        results: result.rows[0].json_agg
      }
      res.header("Access-Control-Allow-Origin", "*");
      res.send(results);
    })
  }

})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);

})