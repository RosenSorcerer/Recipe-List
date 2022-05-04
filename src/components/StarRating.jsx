import React from 'react';

var StarRating = ({rating, special}) => {

  var fullClass = 'rating ' + ((special) ? special : '');
  return (
    <input
      className={fullClass}
      max="5"
      readOnly
      type="range"
      value={rating}>
    </input>
  );
};

export default StarRating;