import React, {useState, useEffect} from "react";
import RecipeList from "./components/RecipeList.jsx";
import {createRoot} from "react-dom/client";
import axios from "axios";
import Helpers from './APIHelpers.js';



const root = createRoot(document.getElementById("root"));


const App = () => {
  const [username,    setUser     ] = useState('recommended');
  const [recipeList,  setRecipes  ] = useState([]);
  const [rating,      setRating   ] = useState(0);
  // const [update,      setUpdate ] = useState(0);


  useEffect(() => {
    Helpers.getRecipes(username, rating, (err, results) => {
      if (err) {
        console.error('Error Fetching Recipes' + err);
      } else {
        setRecipes(results.results);
      }
    });
  }, [username, rating]);

  // var forceUpdate = () => {
  //   if (update < 100) {
  //     setUpdate(update + 1);
  //   } else {
  //     setUpdate(0)
  //   }

  // }

  return (
    <div className="App">
      <h1>Recipe List</h1>
      <RecipeList recipes={recipeList}/>
    </div>

  )}

root.render(<App/>)