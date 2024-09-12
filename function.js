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
    document.getElementById("healerdesc").style.display = "grid";
  } else {
    document.getElementById("healerdesc").style.display = "none";
  }
}
