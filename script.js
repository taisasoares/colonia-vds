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

document.addEventListener("DOMContentLoaded", function () {
  var stream = document.querySelector(".gallery__stream");
  var items = document.querySelectorAll(".gallery__item");

  var prev = document.querySelector(".gallery__prev");
  prev.addEventListener("click", function () {
    stream.insertBefore(items[items.length - 1], items[0]);
    items = document.querySelectorAll(".gallery__item");
  });

  var next = document.querySelector(".gallery__next");
  next.addEventListener("click", function () {
    stream.appendChild(items[0]);
    items = document.querySelectorAll(".gallery__item");
  });
});
