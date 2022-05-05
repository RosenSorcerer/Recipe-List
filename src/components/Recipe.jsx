import React, {useState} from 'react';
import moment from 'moment';
import StarRating from './StarRating.jsx';

var Recipe = ({recipe, justAte}) => {
  var redirect = () => {
    window.open(recipe.url, '_blank');
  }
  const [expanded, setExpanded] = useState(false);
  var toggleExpanded = () => {
    setExpanded(!expanded);
  }

  var eatNow = () => {
    justAte(recipe);
  }

  var month = moment().month() + 1;
  var day = moment().date();
  var lastDay = moment().date() - 1;
  if (month < 10)
  {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
   var lastDay = `0${lastDay}`
  }
//Fix yesterday detection for month changeover
  var today = `${moment().year()}-${month}-${day}`;
  var yesterday = `${moment().year()}-${month}-${lastDay}`;

  if (today === recipe.lastate) {
    var lastate = 'Today'
  } else if (recipe.lastate === yesterday) {
    var lastate = 'Yesterday';
  } else {
    var lastate = moment(recipe.lastate).fromNow();
  }

  return (
    <div className='Recipe'>
      <h2 className='Title'>{recipe.title}</h2>
      <StarRating rating={recipe.rating}/>
      <h3>Last ate {expanded ? recipe.lastate : lastate}</h3>
      <p className='Summary'>{expanded ? recipe.summary : ''}</p>
      <div className='ButtonBar'>
        <button className='Info' onClick={toggleExpanded}>{expanded ? 'Less Info' : 'More Info'}</button>
        <button className='Link' onClick={redirect}>Go to recipe</button>
        <button className='Just-Ate' onClick={eatNow}>Just ate this</button>
      </div>
    </div>

  )
}

export default Recipe;