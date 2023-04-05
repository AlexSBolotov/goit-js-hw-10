const BASE_URL = 'https://restcountries.com/v3.1/';
export function fetchCountries(query) {
  return fetch(
    `${BASE_URL}/name/${query}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
  // .catch(err => {
  //   console.log(err);
  //   if (err.message === 404) {
  //     console.log(err);
  //   }
  // });
}
