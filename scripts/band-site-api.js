const apiKey = "5f501c9f-d16c-4493-8203-089cc169679b";
const URL = "https://project-1-api.herokuapp.com/";

let form = document.querySelector(".form");

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

async function getComments() {
  const filledComments = await apiConnection.getComments();
  commentsSection.textContent = "";

  for (let i = 0; i < filledComments.length; i++) {
    let commentCard = document.createElement("div");
    commentCard.classList.add("comment");

    let commentCardLeft = document.createElement("div");
    commentCardLeft.classList.add("comment__left");
    let commentProfile = document.createElement("div");
    commentProfile.classList.add("comment__profile");

    let commentCardRight = document.createElement("div");
    commentCardRight.classList.add("comment__right");
    let commentCardRightTop = document.createElement("div");
    commentCardRightTop.classList.add("comment__right-top");

    let commentCardName = document.createElement("p");
    commentCardName.classList.add("comment__name");
    commentCardName.innerText = filledComments[i].name;

    let commentCardDate = document.createElement("p");
    commentCardDate.classList.add("comment__date");

    /*
     * Start of dynamic date calculation
     */

    const currentDate = new Date();
    const commentDate = new Date(filledComments[i].timestamp);

    const timeDifference = currentDate - commentDate;

    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const monthsAgo = Math.floor(daysAgo / 30.437); //average number of days in a month
    const yearsAgo = Math.floor(monthsAgo / 12);

    if (yearsAgo > 0) {
      if (yearsAgo === 1) {
        commentCardDate.innerText = `${yearsAgo} Year Ago`;
      } else {
        commentCardDate.innerText = `${yearsAgo} Years Ago`;
      }
    } else if (monthsAgo > 0) {
      if (monthsAgo === 1) {
        commentCardDate.innerText = `${monthsAgo} Month Ago`;
      } else {
        commentCardDate.innerText = `${monthsAgo} Months Ago`;
      }
    } else if (daysAgo > 0) {
      if (daysAgo === 1) {
        commentCardDate.innerText = `${daysAgo} Day Ago`;
      } else {
        commentCardDate.innerText = `${daysAgo} Days Ago`;
      }
    } else if (hoursAgo > 0) {
      if (hoursAgo === 1) {
        commentCardDate.innerText = `${hoursAgo} Hour Ago`;
      } else {
        commentCardDate.innerText = `${hoursAgo} Hours Ago`;
      }
    } else if (minutesAgo > 0) {
      if (minutesAgo === 1) {
        commentCardDate.innerText = `${minutesAgo} Minute Ago`;
      } else {
        commentCardDate.innerText = `${minutesAgo} Minutes Ago`;
      }
    } else {
      commentCardDate.innerText = `Just Now`;
    }

    /*
     * End of dynamic date calculation.
     */

    let commentCardText = document.createElement("p");
    commentCardText.classList.add("comment__text");
    commentCardText.innerText = filledComments[i].comment;

    commentCard.appendChild(commentCardLeft);
    commentCard.appendChild(commentCardRight);

    commentCardLeft.appendChild(commentProfile);

    commentCardRight.appendChild(commentCardRightTop);
    commentCardRight.appendChild(commentCardText);

    commentCardRightTop.appendChild(commentCardName);
    commentCardRightTop.appendChild(commentCardDate);

    commentsSection.appendChild(commentCard);
  }
}

getComments();

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
    console.log(shows[i].data);
  }
}
getShows();

// form.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   let nameInput = document.querySelector(".form__name");
//   let textInput = document.querySelector(".form__comment");
//   let currentDate = new Date();

//   let newComment = {
//     commentName: event.target.commentFormName.value,
//     commentDate: currentDate,
//     commentText: event.target.commentFormText.value,
//   };

// const response = await apiConnection.postComment({
//   name: event.target.commentFormName,
//   comment: event.target.commentFormText,
// });
// });

//Form validation to ensure form is properly filled out.
