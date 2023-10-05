const showsArray = [
  {
    date: "Date",
    dateActual: "Sept 06 2021",
    venue: "Venue",
    venueActual: "Ronald Lane",
    location: "Location",
    locationActual: "San Francisco, CA",
    buttonText: "Buy Tickets",
  },
];

const cards = document.querySelector(".cards");
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

cardTopTextLight.innerText = showsArray[0].date;
cardTopTextBold.innerText = showsArray[0].dateActual;
cardMiddleTextLight.innerText = showsArray[0].venue;
cardMiddleText.innerText = showsArray[0].venueActual;
cardBottomTextLight.innerText = showsArray[0].location;
cardBottomText.innerText = showsArray[0].locationActual;
cardButton.innerText = showsArray[0].buttonText;

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

console.log(cardMiddleText);
