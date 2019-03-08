'use strict';

// put your own value below!
const apiKey = 'MpUhoHpQ3ZUWHy9cEpQDoOuHHDckd2LNq9LOGEtr';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<h2>${responseJson.data[i].fullName}</h2>
      <li><h3>${responseJson.data[i].description}</h3>
      <p>${responseJson.data[i].addresses[0].line1}
      <br>
      ${responseJson.data[i].addresses[0].city},${responseJson.data[i].addresses[0].stateCode}
      <br>
      ${responseJson.data[i].addresses[0].postalCode}</p>
      <a href="url">${responseJson.data[i].url}</li>`
    )};
  $('#results').removeClass('hidden');
};

function getParks(query, limit=10) {
  const params = {
    key: apiKey,
    q: query,
    fields: ['addresses'],
    limit
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  //console.log("watchForm Works");
  $('form').submit(event => {
    event.preventDefault();
    let searchState = $('#js-search-state').val();
    let maxResults = $('#js-max-results').val();
    getParks(searchState, maxResults);
  });
}

$(watchForm);
