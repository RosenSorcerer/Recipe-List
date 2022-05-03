const {Pool} = require('pg');

const pool = new Pool({
  user: 'recipierre',
  host: 'localhost',
  port: 5432,
  password: 'recipeListPapa',
  database: 'recipes'
})

module.exports = {
  query: (text, params, callback) => (
    pool.query(text,params,callback)
  )
};