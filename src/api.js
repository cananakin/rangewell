import fetch from 'isomorphic-fetch';

const add = model => {
  return fetch(`http://localhost:3001/api/add-deal`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(model)
  })
    .then(response => response.json())
    .catch(error => ({ error }));
};
const edit = (model, id) => {
  return fetch(`http://localhost:3001/api/update-deal/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(model)
  })
    .then(response => response.json())
    .catch(error => ({ error }));
};
const remove = id => {
  return fetch(`http://localhost:3001/api/delete-deal/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .catch(error => ({ error }));
};
const get = () => {
  fetch(`http://localhost:3001/api/deals`)
    .then(response => response.json())
    .catch(error => ({ error }));
};
export { add, edit, get, remove };
