/** @format */

function openTab(tab, hero) {
  if (tab == "Info") {
    document.getElementById(`${hero}Stats`).classList.remove("active");
    document.getElementById(`${hero}Info`).classList.add("active");
  } else {
    document.getElementById(`${hero}Info`).classList.remove("active");
    document.getElementById(`${hero}Stats`).classList.add("active");
  }
}
function displayInfo(choice, hero) {
  if (choice == "open") {
    document.getElementById(`${hero}Desc`).style.display = "grid";
    document.getElementById(`${hero}Desc`).classList.remove("sleeps");
    document.getElementById(`${hero}Desc`).classList.add("awakes");
  } else {
    document.getElementById(`${hero}Desc`).classList.remove("awakes");
    document.getElementById(`${hero}Desc`).classList.add("sleeps");
    setTimeout(function () {
      document.getElementById(`${hero}Desc`).style.display = "none";
    }, 3000);
  }
}
let openMap = false;
function displayMap() {
  if (openMap == false) {
    openMap = true;
    document.getElementById("thisMap").style.display = "block";
  } else {
    openMap = false;
    document.getElementById("thisMap").style.display = "none";
  }
}
var loader = document.getElementById("preloader");
window.addEventListener("load", function (load) {
  // Lazy Loading :) //
  this.window.removeEventListener("load", load, false);
  this.setTimeout(function () {
    loader.style.display = "none";
    this.document.body.style.cursor = "url(Images/swordcursor1.png), auto";
    this.document.body.style.overflowY = "scroll";
  }, 4000);
});
//This is an Intersection Observer ... Duh🤣, in plain english, a method (function) of checking if each section is currently visisble
// on the user's screen, if not the item is hidden, if so then it loads in//
var observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.style.display = "block";
    }
    //else {
    //   entry.target.classList.add("awake");
    // }
  });
});
var hiddenElements = document.querySelectorAll(
  "#healer, #titan, #eye, #phoenix, #timekeeper"
);
hiddenElements.forEach((el) => observer.observe(el));
