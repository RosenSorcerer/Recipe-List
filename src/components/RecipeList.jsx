import React from 'react';
import Recipe from './Recipe.jsx';

var RecipeList = ({recipes, justAte}) => {
  return (
    <div className='Recipe-List'>
    {recipes.length > 0 ? recipes.map(recipe =>
      <Recipe key={recipe.recipe_id} recipe={recipe} justAte={justAte}/>
      ) : <h2>No recipes saved!</h2>}
    </div>
  )

}

export default RecipeList;