export function get(url, options={}) {

  const defaultOptions = {
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    }
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

export function post(url, payload, options={}) {

  const defaultOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

export function destroy(url, options={}) {

  const defaultOptions = {
    method: 'DELETE',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    }
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

function _fetch(url, options) {
  return fetch(url, options)
    .then(response=>{
      return response;
    })
    .catch(err=>{
      console.log('There was an error processing your request');
      console.log(err);
    });
}

