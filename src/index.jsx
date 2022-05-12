import React, {useState, useEffect} from "react";
import RecipeList from "./components/RecipeList.jsx";
import NewRecipe from "./components/NewRecipe.jsx";
import {createRoot} from "react-dom/client";
import axios from "axios";
import Helpers from './APIHelpers.js';
import './styles/styles.css'


const root = createRoot(document.getElementById("root"));

const App = () => {
  const [username,    setUser     ] = useState('recommended');
  const [recipeList,  setRecipes  ] = useState([]);
  const [rating,      setRating   ] = useState(0);
  const [update,      setUpdate   ] = useState(0);


  useEffect(() => {
    Helpers.getRecipes(username, rating, (err, results) => {
      if (err) {
        console.error('Error Fetching Recipes' + err);
      } else {
        if (results.results) {
          setRecipes(results.results);
        }
      }
    });
  }, [username, rating, update]);

  var forceUpdate = () => {
    if (update < 100) {
      setUpdate(update + 1);
      console.log(update);
    } else {
      setUpdate(0)
    }
  }

  var submitRecipe = (recipe) => {
    recipe.username = recipe.username || 'recommended';
    Helpers.postRecipe(recipe, (err) => {
      if (err) {console.error(err)}
      forceUpdate();
    });
  }
  var justAte = (recipe) => {
    Helpers.ateRecipe(recipe, (err) => {
      if (err) {console.error(err)};
        forceUpdate();
    })
  }

  return (
    <div className="App">
      <div className="Head"><h1>Recipe List</h1></div>
      <NewRecipe submitRecipe={submitRecipe}/>
      <RecipeList recipes={recipeList} justAte={justAte}/>
    </div>

  )}

root.render(<App/>)