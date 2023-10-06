let defaultComments = [
  {
    commentName: "Connor Walton",
    commentDate: "02/17/2021",
    commentText:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    commentName: "Emilie Beach",
    commentDate: "01/09/2021",
    commentText:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    commentName: "Miles Acosta",
    commentDate: "12/20/2020",
    commentText:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

let commentsSection = document.querySelector(".comments__container");
let commentForm = document.querySelector(".form");

// console.log(defaultComments);

function appendComments() {
  commentsSection.textContent = "";
  for (let i = 0; i < defaultComments.length; i++) {
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
    commentCardName.innerText = defaultComments[i].commentName;

    let commentCardDate = document.createElement("p");
    commentCardDate.classList.add("comment__date");
    commentCardDate.innerText = defaultComments[i].commentDate;

    let commentCardText = document.createElement("p");
    commentCardText.classList.add("comment__text");
    commentCardText.innerText = defaultComments[i].commentText;

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

appendComments();

// console.log(commentFormText);

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let newComment = {
    commentName: event.target.commentFormName.value,
    commentDate: Date.now(),
    commentText: event.target.commentFormText.value,
  };

  console.log(newComment);

  defaultComments.unshift(newComment);

  appendComments();

  commentForm.reset();
});
