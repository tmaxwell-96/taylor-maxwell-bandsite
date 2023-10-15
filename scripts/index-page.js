//Import
//-------------------------------------------

import BandSiteAPI from "./band-site-api.js";

//Global Variables
//-------------------------------------------

let commentsSection = document.querySelector(".comments__container");
let commentForm = document.querySelector(".form");
let likeButton = document.querySelector(".comment__like");
let deleteButton = document.querySelector(".comment__like");
const apiKey = "f44a8d71-9c00-4cd3-b3d0-67f611a6155c";
const URL = "https://project-1-api.herokuapp.com/";

let apiConnection = new BandSiteAPI(apiKey);

//Functions
//-------------------------------------------
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

    let commentRightBottom = document.createElement("div");
    commentRightBottom.classList.add("comment__right-bottom");

    let commentLikeButton = document.createElement("button");
    commentLikeButton.classList.add("comment__like");
    commentLikeButton.innerText = "Like";

    let commentDeleteButton = document.createElement("button");
    commentDeleteButton.classList.add("comment__delete");
    commentDeleteButton.innerText = "Delete";

    let commentLikeCount = document.createElement("p");
    commentLikeCount.classList.add("comment__like-count");
    commentLikeCount.innerText = `Likes: ${filledComments[i].likes}`;

    commentCard.appendChild(commentCardLeft);
    commentCard.appendChild(commentCardRight);

    commentCardLeft.appendChild(commentProfile);

    commentCardRight.appendChild(commentCardRightTop);
    commentCardRight.appendChild(commentCardText);
    commentCardRight.appendChild(commentRightBottom);

    commentRightBottom.appendChild(commentLikeButton);
    commentRightBottom.appendChild(commentDeleteButton);
    commentRightBottom.appendChild(commentLikeCount);

    commentCardRightTop.appendChild(commentCardName);
    commentCardRightTop.appendChild(commentCardDate);

    commentsSection.appendChild(commentCard);
  }
}

getComments();

//Add event listener for form submission.
//-------------------------------------------

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

  if ((newComment.commentName != "") & (newComment.commentText != "")) {
    const response = await apiConnection.postComment({
      name: newComment.commentName,
      comment: newComment.commentText,
    });
    getComments().then(() => {
      likeComment();
    });
    commentForm.reset();

    nameInput.classList.remove("form__name--error");
    nameInput.placeholder = "Enter Your Name";

    textInput.classList.remove("form__comment--error");
    textInput.placeholder = "Add a New Comment";
  } else if ((newComment.commentName == "") & (newComment.commentText == "")) {
    nameInput.classList.add("form__name--error");
    nameInput.placeholder = "Please Add Your Name";
    textInput.classList.add("form__comment--error");
    textInput.placeholder = "Please Add a Comment";
  } else if (newComment.commentName == "") {
    nameInput.classList.add("form__name--error");
    nameInput.placeholder = "Please Add Your Name";
  } else if (newComment.commentText == "") {
    textInput.classList.add("form__comment--error");
    textInput.placeholder = "Please Add a Comment";
  }
});

//Add Like Button Functionality.
//-------------------------------------------

async function likeComment() {
  const commentLikeButtons = document.querySelectorAll(".comment__like");
  const response = await apiConnection.getComments();
  for (let i = 0; i < commentLikeButtons.length; i++) {
    commentLikeButtons[i].addEventListener("click", async function (event) {
      const commentLike = await apiConnection.commentLike(response[i].id);
      getComments().then(() => {
        likeComment();
      });
    });
  }
}

getComments().then(() => {
  likeComment();
});

//Add Delete Button Functionality.
//-------------------------------------------

async function deleteComment() {
  const commentDeleteButtons = document.querySelectorAll(".comment__delete");
  const response = await apiConnection.getComments();
}
