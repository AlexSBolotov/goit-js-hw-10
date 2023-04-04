import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countriesTmplt from './templates/countriesTmplt.hbs';
import countryTmplt from './templates/countryTmplt.hbs';

const inputEl = document.querySelector('#search-box');
const countryBox = document.querySelector('.country-info');
const countriesList = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));

function onInputEl(e) {
  let query = e.target.value.trim();
  if (query === '') {
    clearMarkup();
    return;
  } else {
    fetchCountries(query)
      .then(responce => {
        if (responce.length > 10) {
          clearMarkup();
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          clearMarkup();
          createMarkup(responce);
        }
      })
      .catch(onError);
  }
}

function createMarkup(data) {
  if (data.length === 1) {
    countryBox.innerHTML = countryTmplt(data[0]);
  } else {
    countriesList.innerHTML = countriesTmplt(data);
  }
}

function clearMarkup() {
  countryBox.innerHTML = '';
  countriesList.innerHTML = '';
}

function onError() {
  clearMarkup();
  Notify.failure('Oops, there is no country with that name');
}
