class HttpService {
  constructor() {}

  get(URL) {
    return fetch(URL).then((response) => response.json());
  }

  post(URL, data) {
    fetch(URL, {
      method: 'POST',
      body: data, // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => console.log('Success:', response))
      .catch((error) => console.error('Error:', error));
  }

  put(URL, data) {
    fetch(URL, {
      method: 'PUT',
      body: data,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => console.log('Success:', response))
      .catch((error) => console.error('Error:', error));
  }

  delete(URL, data) {
    fetch(URL, {
      method: 'DELETE',
      body: data,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => console.log('Success:', response))
      .catch((error) => console.error('Error:', error));
  }
}
