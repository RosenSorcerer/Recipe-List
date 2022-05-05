import React from 'react';
import Recipe from './Recipe.jsx';

var RecipeList = ({recipes}) => {
  return (
    <div className='Recipe-List'>
    {recipes.length > 0 ? recipes.map(recipe =>
      <Recipe key={recipe.recipe_id} recipe={recipe}/>
      ) : <h2>No recipes saved!</h2>}
    </div>
  )

}

export default RecipeList;