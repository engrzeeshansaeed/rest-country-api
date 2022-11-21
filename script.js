const searchButton = document.getElementById('search-button');
const countryInput = document.getElementById('country-input');
const result = document.getElementById('result');

searchButton.addEventListener('click', () => {
  // get country name and pass it to url
  const countryName = countryInput.value;
  const url = `https://restcountries.com/v3.1/name/${countryName}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Get country names in availble languages
      var userCountryName = data[0].name.nativeName;
      var countryList = '';
      for ([key, value] of Object.entries(userCountryName)) {
        stateKey = key.toUpperCase();
        stateName = value.official;
        countryList += `${stateKey}: ${stateName}, `;
      }

      // insert api result in html document
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-image">
        <h2>${data[0].name.common}</h2>

        <div class="wrapper">
          <div class="data-wrapper">
             <h4>Official name:</h4>
             <span>
                  ${countryList}                   
             </span>
          </div>
        </div>

        <div class="wrapper">
          <div class="data-wrapper">
             <h4>Capital:</h4>
             <span>${data[0].capital[0]}</span>
          </div>
        </div>

        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Papulation:</h4>
            <span>${(+data[0].population / 1000000).toFixed(1)} M</span>
          </div>
        </div>

        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>
              ${data[0].currencies[Object.keys(data[0].currencies)].name}
            </span>
          </div>
        </div>

        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Languages:</h4>
            <span>
              ${Object.keys(data[0].languages).toString().split(',').join(', ')}
            </span>
          </div>
        </div>

        <div class="wrapper">
        <div class="data-wrapper">
           <h4>Continent:</h4>
           <span>${data[0].continents[0]}</span>
        </div>
      </div>
      
      `;
    });
});
