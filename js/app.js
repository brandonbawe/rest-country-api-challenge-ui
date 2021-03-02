//Animation onLoa
const themeToggle = document.getElementById("theme-toggle");
const cardImage = document.querySelector(".card-image");

const countryCardContainer = document.querySelector(".country-cards");
const mainDisplay = document.querySelector(".main-display");
const detailSection = document.querySelector(".detail-section");
const backButton = document.querySelector(".back-btn");
const borderButtons = document.querySelector(".border-btn-container");
const searchBar = document.querySelector(".search-input");
const searchResult = document.querySelector(".search-result");

// Fetching Country Data from API
const url = "https://restcountries.eu/rest/v2/all";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const countryData = data.forEach((element) => {
      const country = [
        element.name,
        element.capital,
        element.region,
        element.population,
        element.nativeName,
        element.flag,
        element.region,
        element.borders,
        element.languages,
        element.area,
        element.currencies,
      ];

      
    
      const card = document.createElement("div");
      card.classList.add("card");

      const cardText = document.createElement("div");
      cardText.classList.add("card-text");

      const cardImageContainer = document.createElement("div");
      cardImageContainer.classList.add("card-image-container");

      const cardImage = document.createElement("img");
      cardImage.classList.add("card-image");

      countryCardContainer.appendChild(card);
      card.appendChild(cardImageContainer);
      cardImageContainer.appendChild(cardImage);
      cardImage.setAttribute("src", element.flag);
      card.appendChild(cardText);
      cardText.innerHTML = `
      <h1>${element.name}</h1>
      <p><span><b>Population: </b></span> ${element.population.toLocaleString(
        "en-US"
      )}</p>
      <p><span><b>Region: </b></span> ${element.region}</p>
      <p><span><b>Capital: </b></span> ${element.capital}</p>
    `;

    

      const countryName = document.querySelector(".detail-country-name");
      const nativeNameElem = document.querySelector(".native-name");
      const populationElem = document.querySelector(".detail-population");
      const regionElem = document.querySelector(".region");
      const subRegionElem = document.querySelector(".sub-region");
      const capitalElem = document.querySelector(".capital");
      const domain = document.querySelector(".domain");
      const currencyElem = document.querySelector(".currencies");
      const languagesElem = document.querySelector(".languages");
      const surfaceAreaElem = document.querySelector(".surface-area")

      

      card.addEventListener("click", (e) => {
        detailSection.classList.remove("hide");
        mainDisplay.classList.add("hide");
        const cardImageSrcAttribute = cardImage.getAttribute("src");
        const detailImage = document.querySelector(".detail-img");
        detailImage.setAttribute("src", cardImageSrcAttribute);
        countryName.innerHTML = element.name;
        nativeNameElem.innerHTML = element.nativeName;
        populationElem.innerHTML = element.population.toLocaleString("en-US");
        regionElem.innerHTML = element.region;
        subRegionElem.innerHTML = element.subregion;
        capitalElem.innerHTML = element.capital;
        domain.innerHTML = element.topLevelDomain[0];
        currencyElem.innerHTML = `${element.currencies[0].name}, ${element.currencies[0].symbol}`;
        surfaceAreaElem.innerHTML = `${element.area.toLocaleString(
          "en-US"
        )}km²`;

        element.languages.forEach((el, index, array) => {
          const span = document.querySelector('span');
          languagesElem.appendChild(span);
          span.innerHTML = el.name;
        });

      

        const borders = element.borders;


        borders.forEach((el) => {
          const borderButtons = document.querySelector(".border-btn-container");
          const button = document.createElement("button");
          button.classList.add("border-btn");
          borderButtons.appendChild(button);
          button.innerHTML = el;
        });

      });
    });

    // const result = data.forEach((el) => {
    //    const countryInfo = [el.name, el.flag];

    //    const searchResultItem = document.createElement('div');
    //    searchResultItem.classList.add('card');

    //    searchResult.appendChild(searchResultItem);

    //    const searchResultImage = document.createElement('img');
    //    searchResultImage.setAttribute('src', el.flag);
    //    searchResultImage.classList.add('card-image')
    //    searchResultItem.appendChild(searchResultImage)
       
    // });

    // console.log(result)
  })
  .catch((error) => console.log(error));
function themeToggler() {
  let linkElem = document.getElementById("link-elem");
  if (linkElem.getAttribute("href") == "css/light-theme.css") {
    linkElem.setAttribute("href", "css/dark-theme.css");
    themeToggle.innerHTML =
      '<ion-icon name="sunny-outline"></ion-icon> Light Mode';
  } else {
    linkElem.setAttribute("href", "css/light-theme.css");
    themeToggle.innerHTML =
      '<ion-icon name="moon-outline"></ion-icon> Dark Mode';
  }
}

themeToggle.addEventListener("click", themeToggler);

// Switch back and ford between main display and details section

backButton.addEventListener("click", (e) => {
  mainDisplay.classList.remove("hide");
  detailSection.classList.add("hide");
  location.reload();
});

//Implement Search
searchBar.addEventListener('keyup', (e) => {
    countryCardContainer.classList.add('hide');
    searchResult.classList.remove('hide');
    const searchString = e.target.value; 
    console.log(searchString);

    const filteredCharacters = hpCharacters.filter((character) => {
      return (
        character.name.includes(searchString) ||
        character.house.includes(searchString)
      );
    });
});

searchBar.addEventListener("blur", (e) => {
  countryCardContainer.classList.remove("hide");
  searchResult.classList.add('hide')
});

