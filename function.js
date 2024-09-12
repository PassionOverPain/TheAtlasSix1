/** @format */

function openTab(tab) {
  if (tab == "Info") {
    document.getElementById("Info").classList.add("active");
    document.getElementById("Stats").classList.remove("active");
  } else {
    document.getElementById("Stats").classList.add("active");
    document.getElementById("Info").classList.remove("active");
  }
}
function displayInfo(choice) {
  if (choice == "open") {
    document.getElementById("healerdesc").classList.remove("sleeps");
    document.getElementById("healerdesc").classList.add("awakes");
  } else {
    document.getElementById("healerdesc").classList.remove("awakes");
    document.getElementById("healerdesc").classList.add("sleeps");
    work();
  }
}
function work() {
  setTimeout(function () {
    document.getElementById("healerdesc").style.display = "none";
  }, 3000);
}
