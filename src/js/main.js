var navButton = document.querySelector(".main-nav__button");
var mainNav = document.querySelector(".main-nav");

navButton.addEventListener("click", function () {
  if (mainNav.classList.contains("main-nav--close")) {
    mainNav.classList.remove("main-nav--close");
    mainNav.classList.add("main-nav--open");
  } else {
    mainNav.classList.remove("main-nav--open");
    mainNav.classList.add("main-nav--close");
  }
});