//Import
//-------------------------------------------

import BandSiteAPI from "./band-site-api.js";

//Global Variables
//-------------------------------------------

let commentsSection = document.querySelector(".comments__container");
let commentForm = document.querySelector(".form");
const apiKey = "f44a8d71-9c00-4cd3-b3d0-67f611a6155c";
const URL = "https://project-1-api.herokuapp.com/";

let apiConnection = new BandSiteAPI(apiKey);

//Functions
//-------------------------------------------

function calculateTimeAgo(timestamp) {
  const currentDate = new Date();
  const commentDate = new Date(timestamp);

  const timeDifference = currentDate - commentDate;

  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30.437); //average number of days in a month
  const yearsAgo = Math.floor(monthsAgo / 12);

  if (yearsAgo > 0) {
    if (yearsAgo === 1) {
      return `${yearsAgo} Year Ago`;
    } else {
      return `${yearsAgo} Years Ago`;
    }
  } else if (monthsAgo > 0) {
    if (monthsAgo === 1) {
      return `${monthsAgo} Month Ago`;
    } else {
      return `${monthsAgo} Months Ago`;
    }
  } else if (daysAgo > 0) {
    if (daysAgo === 1) {
      return `${daysAgo} Day Ago`;
    } else {
      commentCardDate.innerText = `${daysAgo} Days Ago`;
    }
  } else if (hoursAgo > 0) {
    if (hoursAgo === 1) {
      return `${hoursAgo} Hour Ago`;
    } else {
      return `${hoursAgo} Hours Ago`;
    }
  } else if (minutesAgo > 0) {
    if (minutesAgo === 1) {
      return `${minutesAgo} Minute Ago`;
    } else {
      return `${minutesAgo} Minutes Ago`;
    }
  } else {
    return `Just Now`;
  }
}

function displayComments(comment) {
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
  commentCardName.innerText = comment.name;

  let commentCardDate = document.createElement("p");
  commentCardDate.classList.add("comment__date");
  commentCardDate.innerText = calculateTimeAgo(comment.timestamp);

  let commentCardText = document.createElement("p");
  commentCardText.classList.add("comment__text");
  commentCardText.innerText = comment.comment;

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
  commentLikeCount.innerText = `Likes: ${comment.likes}`;

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

async function getComments() {
  try {
    const filledComments = await apiConnection.getComments();

    commentsSection.textContent = "";

    for (let i = 0; i < filledComments.length; i++) {
      displayComments(filledComments[i]);
    }
  } catch {
    alert("Error getting information from server, please try again later");
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
    try {
      const response = await apiConnection.postComment({
        name: newComment.commentName,
        comment: newComment.commentText,
      });

      //Like and delete functionality
      const commentsResponse = await getComments();
      const likeResponse = await likeComment();
      const deleteResponse = await deleteComment();

      commentForm.reset();

      nameInput.classList.remove("form__name--error");
      nameInput.placeholder = "Enter Your Name";

      textInput.classList.remove("form__comment--error");
      textInput.placeholder = "Add a New Comment";
    } catch {
      alert("Error getting information from server, please try again later.");
    }
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

      //Like and delete functionality
      const commentsResponse = await getComments();
      const likeResponse = await likeComment();
      const deleteResponse = await deleteComment();
    });
  }
}

//Add Delete Button Functionality.
//-------------------------------------------

async function deleteComment() {
  const commentDeleteButtons = document.querySelectorAll(".comment__delete");
  const response = await apiConnection.getComments();
  for (let i = 0; i < commentDeleteButtons.length; i++) {
    commentDeleteButtons[i].addEventListener("click", async function (event) {
      const commentDelete = await apiConnection.commentDelete(response[i].id);

      //Like and delete functionality
      const commentsResponse = await getComments();
      const likeResponse = await likeComment();
      const deleteResponse = await deleteComment();
    });
  }
}

//Ensure like and delete functionality works at page load
//-------------------------------------------

async function populatePage() {
  try {
    const commentsResponse = await getComments();
    const likeResponse = await likeComment();
    const deleteResponse = await deleteComment();
  } catch {
    alert("Error getting information from server, please try again later");
  }
}

populatePage();
