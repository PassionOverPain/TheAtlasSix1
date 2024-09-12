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
