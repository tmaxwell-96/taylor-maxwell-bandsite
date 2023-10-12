//Existing comment array.
// let defaultComments = [
//   {
//     commentName: "Connor Walton",
//     commentDate: "02/17/2021",
//     commentText:
//       "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//   },
//   {
//     commentName: "Emilie Beach",
//     commentDate: "01/09/2021",
//     commentText:
//       "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//   },
//   {
//     commentName: "Miles Acosta",
//     commentDate: "12/20/2020",
//     commentText:
//       "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//   },
// ];

let commentsSection = document.querySelector(".comments__container");
let commentForm = document.querySelector(".form");
const apiKey = "5f501c9f-d16c-4493-8203-089cc169679b";
const URL = "https://project-1-api.herokuapp.com/";

console.log("Connected");

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
    response.data.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    return response.data;
  }

  async getShows() {
    let showInfo = await axios.get(
      `${this.baseURL}showdates?api_key=${apiKey}`
    );
    return showInfo.data;
  }
}

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

//Add event listener for form submission.
commentForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  let nameInput = document.querySelector(".form__name");
  let textInput = document.querySelector(".form__comment");
  let currentDate = new Date();

  let newComment = {
    commentName: event.target.commentFormName.value,
    commentDate: currentDate,
    commentText: event.target.commentFormText.value,
  };

  console.log(newComment);
  console.log(event.target.commentFormName.value);
  console.log(event.target.commentFormText.value);

  const response = await apiConnection.postComment({
    name: event.target.commentFormName.value,
    comment: event.target.commentFormText.value,
  });
  getComments();
});

//Display comments function, looping through array, including newly posted comment.
// function appendComments() {
//   commentsSection.textContent = "";
//   let currentDate = new Date();

//   for (let i = 0; i < defaultComments.length; i++) {
//     let commentCard = document.createElement("div");
//     commentCard.classList.add("comment");

//     let commentCardLeft = document.createElement("div");
//     commentCardLeft.classList.add("comment__left");
//     let commentProfile = document.createElement("div");
//     commentProfile.classList.add("comment__profile");

//     let commentCardRight = document.createElement("div");
//     commentCardRight.classList.add("comment__right");
//     let commentCardRightTop = document.createElement("div");
//     commentCardRightTop.classList.add("comment__right-top");

//     let commentCardName = document.createElement("p");
//     commentCardName.classList.add("comment__name");
//     commentCardName.innerText = defaultComments[i].commentName;

//     let commentCardDate = document.createElement("p");
//     commentCardDate.classList.add("comment__date");

//     /*
//      * Start of dynamic date calculation
//      */

//     const currentDate = new Date();
//     const commentDate = new Date(defaultComments[i].commentDate);

//     const timeDifference = currentDate - commentDate;

//     const minutesAgo = Math.floor(timeDifference / (1000 * 60));
//     const hoursAgo = Math.floor(minutesAgo / 60);
//     const daysAgo = Math.floor(hoursAgo / 24);
//     const monthsAgo = Math.floor(daysAgo / 30.437); //average number of days in a month
//     const yearsAgo = Math.floor(monthsAgo / 12);

//     if (yearsAgo > 0) {
//       if (yearsAgo === 1) {
//         commentCardDate.innerText = `${yearsAgo} Year Ago`;
//       } else {
//         commentCardDate.innerText = `${yearsAgo} Years Ago`;
//       }
//     } else if (monthsAgo > 0) {
//       if (monthsAgo === 1) {
//         commentCardDate.innerText = `${monthsAgo} Month Ago`;
//       } else {
//         commentCardDate.innerText = `${monthsAgo} Months Ago`;
//       }
//     } else if (daysAgo > 0) {
//       if (daysAgo === 1) {
//         commentCardDate.innerText = `${daysAgo} Day Ago`;
//       } else {
//         commentCardDate.innerText = `${daysAgo} Days Ago`;
//       }
//     } else if (hoursAgo > 0) {
//       if (hoursAgo === 1) {
//         commentCardDate.innerText = `${hoursAgo} Hour Ago`;
//       } else {
//         commentCardDate.innerText = `${hoursAgo} Hours Ago`;
//       }
//     } else if (minutesAgo > 0) {
//       if (minutesAgo === 1) {
//         commentCardDate.innerText = `${minutesAgo} Minute Ago`;
//       } else {
//         commentCardDate.innerText = `${minutesAgo} Minutes Ago`;
//       }
//     } else {
//       commentCardDate.innerText = `Just Now`;
//     }

//     /*
//      * End of dynamic date calculation.
//      */

//     let commentCardText = document.createElement("p");
//     commentCardText.classList.add("comment__text");
//     commentCardText.innerText = defaultComments[i].commentText;

//     commentCard.appendChild(commentCardLeft);
//     commentCard.appendChild(commentCardRight);

//     commentCardLeft.appendChild(commentProfile);

//     commentCardRight.appendChild(commentCardRightTop);
//     commentCardRight.appendChild(commentCardText);

//     commentCardRightTop.appendChild(commentCardName);
//     commentCardRightTop.appendChild(commentCardDate);

//     commentsSection.appendChild(commentCard);
//   }
// }

// appendComments();
//Form validation to ensure form is properly filled out.
//   if ((newComment.commentName != "") & (newComment.commentText != "")) {
//     getComments();

//     commentForm.reset();

//     nameInput.classList.remove("form__name--error");
//     nameInput.placeholder = "Enter Your Name";

//     textInput.classList.remove("form__comment--error");
//     textInput.placeholder = "Add a New Comment";
//   } else if ((newComment.commentName == "") & (newComment.commentText == "")) {
//     nameInput.classList.add("form__name--error");
//     nameInput.placeholder = "Please Add Your Name";
//     textInput.classList.add("form__comment--error");
//     textInput.placeholder = "Please Add a Comment";
//   } else if (newComment.commentName == "") {
//     nameInput.classList.add("form__name--error");
//     nameInput.placeholder = "Please Add Your Name";
//   } else if (newComment.commentText == "") {
//     textInput.classList.add("form__comment--error");
//     textInput.placeholder = "Please Add a Comment";
//   }
// });
