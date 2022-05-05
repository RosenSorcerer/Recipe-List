import React, {useState} from 'react';


var NewRecipe = ({submitRecipe}) => {
  var redirect = () => {
    window.open(recipe.url, '_blank');
  }
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    title:    '',
    summary:  '',
    rating:   0,
    url:      ''
  });
  var handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.className]: value
    });
  }
  var toggleVisible = () => {
    setVisible(!visible);
  }
  var buttonClick = (e) => {
    if (state.title.length > 0 && state.summary.length > 0 && state.rating > 0 && state.url.length > 0) {
      if (state.url.indexOf('http') != 0) {
        window.alert('Make sure the url is correct and starts with http')
      } else {
        submitRecipe(state);
        toggleVisible();
        setState({
          title:    '',
          summary:  '',
          rating:   0,
          url:      ''
        });

      }
    } else {
      window.alert('Please Make Sure All Fields Are Filled');
    }

  }

  return (
    <div>
      {visible ? (
        <div className='New-Recipe-Background'>
          <div className='New-Recipe'>
            <label>Title</label><input type='text' className='title' onChange={handleChange} placeholder='Title'/>
            <label>Rating</label><input type='range' className='rating' value={state.rating} className='rating' min= '0' max='5' onChange={handleChange}/>
            <label>Summary</label><input type='text' className='summary' onChange={handleChange} placeholder='Summary'/>
            <label>Link</label><input type='text' className='url' onChange={handleChange} placeholder='Link'/>
            <label>Submit</label><button className='submit' onClick={buttonClick}>Submit</button>
          </div>
        </div>
      ) : <button className='Add-Recipe' onClick={toggleVisible}>Add Recipe</button>}
    </div>


  )
}

export default NewRecipe;