DROP TABLE recipes;
DROP TABLE lists;

CREATE TABLE recipes (
  recipe_id SERIAL PRIMARY KEY,
  username text,
  title text,
  summary text,
  rating int,
  url text UNIQUE
  lastAte DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE lists (
  list_id SERIAL PRIMARY KEY,
  recipes int[]
);

-- COPY recipes(recipe_id, url, title, summary, rating, username) FROM './server/db/postgresql/recipes.csv' DELIMITER',' CSV HEADER;