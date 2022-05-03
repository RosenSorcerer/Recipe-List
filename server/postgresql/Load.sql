-- psql -U recipierre Reviews < ./Schema.sql;

COPY recipes
FROM '/home/tlittle/Recipe-List/server/postgresql/recipes.csv'
DELIMITER','
CSV HEADER;