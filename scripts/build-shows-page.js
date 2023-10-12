// Default shows array.
// const showsArray = [
//   {
//     date: "Mon Sept 06 2021",
//     venue: "Ronald Lane",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Tue Sept 21 2021 ",
//     venue: "Pier 3 East",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Oct 15 2021",
//     venue: "View Lounge",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Sat Nov 06 2021 ",
//     venue: "Hyatt Agency",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Nov 26 2021",
//     venue: "Moscow Center",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Wed Dec 15 2021",
//     venue: "Press Club",
//     location: "San Francisco, CA",
//   },
// ];

const cards = document.querySelector(".cards");

const apiKey = "f44a8d71-9c00-4cd3-b3d0-67f611a6155c";
const URL = "https://project-1-api.herokuapp.com/";

class BandSiteAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://project-1-api.herokuapp.com/";
  }
  async postComment(newComment) {
    const response = await axios.post(
      `${this.baseURL}comments?api_key=${apiKey}`,
      newComment
    );
    console.log(response);
  }

  async getComments() {
    let response = await axios.get(`${this.baseURL}comments?api_key=${apiKey}`);
    return response.data;
  }

  async getShows() {
    let showInfo = await axios.get(
      `${this.baseURL}showdates?api_key=${apiKey}`
    );
    return showInfo.data;
  }
}

console.log("This is connected");

let apiConnection = new BandSiteAPI(apiKey);

async function getShows() {
  const shows = await apiConnection.getShows();
  for (let i = 0; i < shows.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardTop = document.createElement("div");
    cardTop.classList.add("card__top");
    const cardTopTextLight = document.createElement("p");
    cardTopTextLight.classList.add("card__text", "card__text--light");
    const cardTopTextBold = document.createElement("p");
    cardTopTextBold.classList.add("card__text", "card__text--bold");

    const cardMiddle = document.createElement("div");
    cardMiddle.classList.add("card__middle");
    const cardMiddleTextLight = document.createElement("p");
    cardMiddleTextLight.classList.add("card__text", "card__text--light");
    const cardMiddleText = document.createElement("p");
    cardMiddleText.classList.add("card__text");

    const cardBottom = document.createElement("div");
    cardBottom.classList.add("card__bottom");
    const cardBottomTextLight = document.createElement("p");
    cardBottomTextLight.classList.add("card__text", "card__text--light");
    const cardBottomText = document.createElement("p");
    cardBottomText.classList.add("card__text");

    const cardButton = document.createElement("button");
    cardButton.classList.add("card__button");
    cardButton.setAttribute("href", "#");

    const cardDivider = document.createElement("div");
    cardDivider.classList.add("cards__divider");

    cardTopTextLight.innerText = "Date";
    cardTopTextBold.innerText = new Date(shows[i].date).toDateString();
    // toLocaleDateString(
    //   "en-US",
    //   { timeZone: "UTC" }
    // );
    cardMiddleTextLight.innerText = "Venue";
    cardMiddleText.innerText = shows[i].place;
    cardBottomTextLight.innerText = "Location";
    cardBottomText.innerText = shows[i].location;
    cardButton.innerText = "Buy Tickets";

    card.appendChild(cardTop);
    card.appendChild(cardMiddle);
    card.appendChild(cardBottom);
    card.appendChild(cardButton);

    cardTop.appendChild(cardTopTextLight);
    cardTop.appendChild(cardTopTextBold);

    cardMiddle.appendChild(cardMiddleTextLight);
    cardMiddle.appendChild(cardMiddleText);

    cardBottom.appendChild(cardBottomTextLight);
    cardBottom.appendChild(cardBottomText);

    cards.appendChild(card);
    cards.appendChild(cardDivider);
  }
  //Add active state to card on click.
  let selectedCards = document.querySelectorAll(".card");

  for (let i = 0; i < selectedCards.length; i++) {
    selectedCards[i].addEventListener("click", function (event) {
      for (let i = 0; i < selectedCards.length; i++) {
        if (selectedCards[i] !== event.currentTarget) {
          selectedCards[i].classList.remove("card--selected"); //Remove active state from all other cards.
        }
      }

      event.currentTarget.classList.toggle("card--selected");
    });
  }
}
getShows();

//Add shows array to DOM.
// function appendShows(array) {
//   for (let i = 0; i < array.length; i++) {
//     const card = document.createElement("div");
//     card.classList.add("card");

//     const cardTop = document.createElement("div");
//     cardTop.classList.add("card__top");
//     const cardTopTextLight = document.createElement("p");
//     cardTopTextLight.classList.add("card__text", "card__text--light");
//     const cardTopTextBold = document.createElement("p");
//     cardTopTextBold.classList.add("card__text", "card__text--bold");

//     const cardMiddle = document.createElement("div");
//     cardMiddle.classList.add("card__middle");
//     const cardMiddleTextLight = document.createElement("p");
//     cardMiddleTextLight.classList.add("card__text", "card__text--light");
//     const cardMiddleText = document.createElement("p");
//     cardMiddleText.classList.add("card__text");

//     const cardBottom = document.createElement("div");
//     cardBottom.classList.add("card__bottom");
//     const cardBottomTextLight = document.createElement("p");
//     cardBottomTextLight.classList.add("card__text", "card__text--light");
//     const cardBottomText = document.createElement("p");
//     cardBottomText.classList.add("card__text");

//     const cardButton = document.createElement("button");
//     cardButton.classList.add("card__button");
//     cardButton.setAttribute("href", "#");

//     const cardDivider = document.createElement("div");
//     cardDivider.classList.add("cards__divider");

//     cardTopTextLight.innerText = "Date";
//     cardTopTextBold.innerText = array[i].date;
//     cardMiddleTextLight.innerText = "Venue";
//     cardMiddleText.innerText = array[i].venue;
//     cardBottomTextLight.innerText = "Location";
//     cardBottomText.innerText = array[i].location;
//     cardButton.innerText = "Buy Tickets";

//     card.appendChild(cardTop);
//     card.appendChild(cardMiddle);
//     card.appendChild(cardBottom);
//     card.appendChild(cardButton);

//     cardTop.appendChild(cardTopTextLight);
//     cardTop.appendChild(cardTopTextBold);

//     cardMiddle.appendChild(cardMiddleTextLight);
//     cardMiddle.appendChild(cardMiddleText);

//     cardBottom.appendChild(cardBottomTextLight);
//     cardBottom.appendChild(cardBottomText);

//     cards.appendChild(card);
//     cards.appendChild(cardDivider);
//   }
// }

// appendShows(showsArray);
