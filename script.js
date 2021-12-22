const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

function inscrevase() {
  alert("Esse botão manda para o formulário de inscrição");
}

// Test Zone

// let slider = document.querySelector(".slide-container");
// let sliderIndividual = document.querySelectorAll(".slide");
// let contador = 1;
// let width = sliderIndividual[0].clientWidth;
// let intervalo = 3000;

// window.addEventListener("resize", function () {
//   width = sliderIndividual[0].clientWidth;
// });

// setInterval(function () {
//   slides();
// }, intervalo);

// function slides() {
//   slider.style.transform = "translate(" + -width * contador + "px)";
//   slider.style.transition = "transform .8s";
//   contador++;

//   if (contador == sliderIndividual.length) {
//     setTimeout(function () {
//       slider.style.transform = "translate(0px)";
//       slider.style.transition = "transform 0s";
//       contador = 1;
//     }, 1500);
//   }
// }
