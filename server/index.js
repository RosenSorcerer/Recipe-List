const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(express.json());


app.post('/', (req, res) => {
  console.log(req.body);
  var newRecipe = req.body;
  db.query(`INSERT INTO recipes(username, title, summary, rating) VALUES ($1, $2, $3, $4)`, [newRecipe.username, newRecipe.title, newRecipe.summary, newRecipe.rating], (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.end();
  })
})

app.get('/list', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send();
})

app.get('/', (req, res) => {
  var user = req.query.user || 'recommended';
  var rating = req.query.rating || 0;
  if (req.query.rating > 0) {
    db.query(`SELECT JSON_AGG(recipes) FROM (SELECT * FROM recipes WHERE username = $1 AND rating = $2) recipes`, [user, rating], (err, result) => {
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