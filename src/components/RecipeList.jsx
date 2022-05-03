import React from 'react';
import Recipe from './Recipe.jsx';

var RecipeList = ({recipes, update}) => {
  return (
    <div className='Recipe_List'>
    {recipes.map(recipe =>
      <Recipe key={recipe.recipe_id} recipe={recipe}/>
      )}
    </div>
  )

}

export default RecipeList;