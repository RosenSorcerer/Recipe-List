import React, {useState} from 'react';

var Recipe = ({recipe, update}) => {
  var redirect = () => {
    window.open(recipe.url, '_blank');
  }
  const [expanded, setExpanded] = useState(false);
  var toggleExpanded = () => {
    setExpanded(!expanded);
  }

  return (
    <div className='Recipe'>
    <h2 className='Title'>{recipe.title}</h2>
    <p className='Summary'>{expanded ? recipe.summary : ''}</p>
    <button className='Info' onClick={toggleExpanded}>{expanded ? 'Less Info' : 'More Info'}</button>
    <button className='Link' onClick={redirect}>Go to recipe</button>
    </div>
  )
}

export default Recipe;