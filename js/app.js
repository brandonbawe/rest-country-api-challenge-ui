const themeToggle = document.getElementById("theme-toggle");
const cardImage = document.querySelector(".card-image");

const countryCardContainer = document.querySelector(".country-cards");
const mainDisplay = document.querySelector(".main-display");
const detailSection = document.querySelector(".detail-section");
const detailItems = document.querySelector(".detail-items");

const borderButtons = document.querySelector(".border-btn-container");
const backButton = document.querySelector(".back-btn");
const searchBar = document.querySelector(".search-input");
const borderDetailSection = document.querySelector(".border-details");

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
const borderBackButton = document.getElementById('border-back-button');



const fetchCountries = async () => {
  countries = await fetch(url).then((res) => res.json());
};

const displayCountries = async () => {
  await fetchCountries();
  console.log(countries);
  countries.forEach((country) => {
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
      <p><b>Population:</b> ${country.population.toLocaleString("en-US")}</p>
      <p><b>Region: </b>${country.region}</p>
      <p><b>Capital: </b> ${country.capital}</p>
    `;

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
      surfaceAreaElem.innerHTML = `${country.area.toLocaleString("en-US")}km²`;
      // borderDetailSection.classList.add('hide');

      country.languages.forEach((el) => {
        const languageSpan = document.createElement("span");
        languagesElem.appendChild(languageSpan);
        languageSpan.innerHTML = el.name;
      });

      const borders = country.borders;
      const borderImage = document.querySelector('.border-img');
      const borderText = document.querySelector('.border-text');
      console.log(borders)

      borders.forEach((el) => {
        const borderButtons = document.querySelector(".border-btn-container");
        const border_button = document.createElement("button");
        border_button.classList.add("border-btn");
        borderButtons.appendChild(border_button);
        border_button.innerHTML = el;
        const borderButtonValue = border_button.innerHTML;
        const formattedBorderButtonValue = borderButtonValue.toLowerCase()
        const countryFlag = `https://restcountries.eu/data/${formattedBorderButtonValue}.svg`;
        const borderText = document.querySelector(".border-text");

        
        
        console.log(borderButtonValue.toLowerCase())
        border_button.addEventListener("click", (e) => {
          detailSection.classList.add('hide');
          borderDetailSection.classList.remove("hide");
          // borderButtons.innerHTML = '';
          // languagesElem.innerHTML = '';

          borderImage.setAttribute('src', countryFlag);
           fetchCountries()
      
          const newArray = countries.filter((country) => {
            return country.alpha3Code.includes(borderButtonValue);
          });
          console.log(newArray);
          const borderCountryName = document.querySelector(
            ".border-country-name"
          );
          const borderCountryNativeName = document.querySelector('.border-NativeName')
          const borderPopulation = document.querySelector(".border-population");
          const borderRegion = document.querySelector(".border-region");
          const borderSubRegion = document.querySelector(".border-sub-region");
          const borderCapital = document.querySelector(".border-capital");

          borderCountryName.innerHTML = newArray[0].name;
          borderCountryNativeName.innerHTML = newArray[0].nativeName;
          borderPopulation.innerHTML = newArray[0].population.toLocaleString('en-US');
          borderRegion.innerHTML = newArray[0].region;
          borderSubRegion.innerHTML = newArray[0].subregion;
          borderCapital.innerHTML = newArray[0].capital
        });

      });

      borderBackButton.addEventListener("click", (e) => {
        detailSection.classList.remove("hide");
        borderDetailSection.classList.add("hide");

        //  borderText.innerHTML = "";
      });
    });
  });
};

displayCountries();

// Back to Main Display from Country Details

backButton.addEventListener("click", (e) => {
  // Clears languages for each card
  languagesElem.innerHTML = "";

  // Clears border country borders.
  borderButtons.innerHTML = "";

  mainDisplay.classList.remove("hide");
  detailSection.classList.add("hide");
});

// Back to Country Details from the Border Country Detail Display`


//Back to the Top Btn
const button = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (window.pageYOffset > 300) { //Show BackToTopButton
        if (!button.classList.contains("btnEntrance")) {
            button.classList.remove("btnExit")
            button.classList.add("btnEntrance");
            button.style.display = "block";
        }
    }
    else { //Hide BacktoTopButton
        if (button.classList.contains("btnEntrance")) {
            button.classList.remove("btnEntrance");
            button.classList.add("btnExit")
            setTimeout(function () {
                button.style.display = "none";

            }, 500);
        }

    }
}

button.addEventListener("click", backToTop);

function backToTop() {
    window.scrollTo(0, 0)
};