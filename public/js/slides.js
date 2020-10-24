const slides = document.querySelector("#slideshow");
let time = 3700; //Time before next slide.
let index = 5; // The index to be increased for a certain condition.
const IMAGES = [
  "img/about-bg.jpg",
  "img/contact-bg.jpg",
  "img/home-bg.jpg",
  "img/img_12.jpg",
  "img/post-bg.jpg",
  "img/img_2.jpg",
];
function chgImg() {
  slides.style.backgroundImage = `url(${IMAGES[index]})`;

  if (index < IMAGES.length - 1) {
    // As long as the index is lesser than the length of the IMAGES[4].
    index++; // Increase the index by one.
  } else {
    index = 0; // Else set it to the first image i n the array.
  }
  setTimeout(chgImg, time); // Time between image change.
}
window.onload = chgImg;
