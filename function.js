/** @format */

function openTab(tab, hero) {
  if (tab == "Info") {
    document.getElementById(`${hero}Info`).classList.add("active");
    document.getElementById(`${hero}Stats`).classList.remove("active");
  } else {
    document.getElementById(`${hero}Stats`).classList.add("active");
    document.getElementById(`${hero}Info`).classList.remove("active");
  }
}
function displayInfo(choice) {
  if (choice == "open") {
    document.getElementById("healerdesc").style.display = "grid";
    document.getElementById("healerdesc").classList.remove("sleeps");
    document.getElementById("healerdesc").classList.add("awakes");
  } else {
    document.getElementById("healerdesc").classList.remove("awakes");
    document.getElementById("healerdesc").classList.add("sleeps");
    setTimeout(function () {
      document.getElementById("healerdesc").style.display = "none";
    }, 3000);
  }
}
