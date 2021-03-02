const themeToggle = document.getElementById("theme-toggle");
const cardImage = document.querySelector(".card-image");

const countryCardContainer = document.querySelector(".country-cards");
const mainDisplay = document.querySelector(".main-display");
const detailSection = document.querySelector(".detail-section");
const backButton = document.querySelector(".back-btn");
const borderButtons = document.querySelector(".border-btn-container");
const searchBar = document.querySelector(".search-input");
const searchResult = document.querySelector(".search-result");

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

let countries;
const url = "https://restcountries.eu/rest/v2/all";

const fetchCountries = async () => {
  countries = await fetch(url).then((res) => res.json());
};

const displayCountries = async () => {
  // getting the data
  await fetchCountries();

  countries.forEach((country) => {
      // creating the structure
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
      cardImage.setAttribute("src", country.flag);
      card.appendChild(cardText);
      cardText.innerHTML = `
      <h1>${country.name}</h1>
      <p><span><b>Population: </b></span> ${country.population.toLocaleString(
        "en-US"
      )}</p>
      <p><span><b>Region: </b></span> ${country.region}</p>
      <p><span><b>Capital: </b></span> ${country.capital}</p>
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
      const surfaceAreaElem = document.querySelector(".surface-area");

      card.addEventListener("click", (e) => {
        detailSection.classList.remove("hide");
        mainDisplay.classList.add("hide");
        const cardImageSrcAttribute = cardImage.getAttribute("src");
        const detailImage = document.querySelector(".detail-img");
        detailImage.setAttribute("src", cardImageSrcAttribute);
        countryName.innerHTML = country.name;
        nativeNameElem.innerHTML = country.nativeName;
        populationElem.innerHTML = country.population.toLocaleString("en-US");
        regionElem.innerHTML = country.region;
        subRegionElem.innerHTML = country.subregion;
        capitalElem.innerHTML = country.capital;
        domain.innerHTML = country.topLevelDomain[0];
        currencyElem.innerHTML = `${country.currencies[0].name}, ${country.currencies[0].symbol}`;
        surfaceAreaElem.innerHTML = `${country.area.toLocaleString(
          "en-US"
        )}km²`;

        country.languages.forEach((el, index, array) => {
          const span = document.querySelector("span");
          languagesElem.appendChild(span);
          span.innerHTML = el.name;
        });

        const borders = country.borders;

        borders.forEach((el) => {
          const borderButtons = document.querySelector(".border-btn-container");
          const button = document.createElement("button");
          button.classList.add("border-btn");
          borderButtons.appendChild(button);
          button.innerHTML = el;

          button.addEventListener('click', e => {
            alert('Light');
          })
        });
      });
    });
};

displayCountries();

backButton.addEventListener("click", (e) => {
  mainDisplay.classList.remove("hide");
  detailSection.classList.add("hide");
  location.reload();
});