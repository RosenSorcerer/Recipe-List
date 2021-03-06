import axios from 'axios';

const URL = 'http://localhost:';
const PORT = '8000';
const serverAddr = URL + PORT;

const APIHelpers = {

  getRecipes: (user, rating, callback) => {
    axios.get(`${serverAddr}?user=${user}&rating=${rating}`)
      .then(res => callback(null, res.data))
      .catch(err => callback(err));
  },

  postRecipe: (recipe, callback) => {
    axios.post(serverAddr, recipe)
      .then(res => callback(null, res.data))
      .catch(err => callback(err));
  },

  ateRecipe: (recipe, callback) => {
    console.log('ping api helpers');
    axios.put(`${serverAddr}/justAte`, recipe)
      .then(res => callback(null, res.data))
      .catch(err => callback(err));
  }
}

export default APIHelpers;