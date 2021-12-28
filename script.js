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

window.addEventListener("load", () => {
  document.getElementById("load").style.display = "none";
  document.getElementById("app").style.display = "block";
});

function showModal() {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("app").style.position = "fixed";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("app").style.position = "block";
  document.getElementById("app").style.position = "relative";
}

function exibeOutros(valor){
  if (valor === "outros") {
    document.getElementById("field_ondeConheceuOutros").style.display = "block";
    document.getElementById("field_ondeConheceuOutros").value = "";
    document.getElementById("field_ondeConheceuOutros").focus();
  }
  else
    document.getElementById("field_ondeConheceuOutros").style.display = "none";
}

function validate_int(myEvento) {
  if ((myEvento.charCode >= 48 && myEvento.charCode <= 57) || myEvento.keyCode == 9 || myEvento.keyCode == 10 || myEvento.keyCode == 13 || myEvento.keyCode == 8 || myEvento.keyCode == 116 || myEvento.keyCode == 46 || (myEvento.keyCode <= 40 && myEvento.keyCode >= 37)) {
    dato = true;
  } else {
    dato = false;
  }

  if (document.getElementById("field_wpp").value.length >= 15) {
    dato = false;
  }

  return dato;
}

function phone_number_mask(e) {
  var myMask = "(__) _____-____";
  var myCaja = document.getElementById("field_wpp");
  var myText = "";
  var myNumbers = [];
  var myOutPut = ""
  var theLastPos = 1;
  myText = myCaja.value;
  //get numbers
  for (var i = 0; i < myText.length; i++) {
    if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
      myNumbers.push(myText.charAt(i));
    }
  }
  //write over mask
  for (var j = 0; j < myMask.length; j++) {
    if (myMask.charAt(j) == "_") { //replace "_" by a number 
      if (myNumbers.length == 0)
        myOutPut = myOutPut + myMask.charAt(j);
      else {
        myOutPut = myOutPut + myNumbers.shift();
        theLastPos = j + 1; //set caret position
      }
    } else {
      myOutPut = myOutPut + myMask.charAt(j);
    }
  }

  myOutPut = myOutPut.replace(/_/ig, ""); //remove all "_"
  
  if (!myOutPut.match(/\d+/i)) {
    myOutPut = ''
  }

  if (myOutPut.length < 11) {
    myOutPut = myOutPut.replace(/-/ig, ""); //remove all "_"
  }

  document.getElementById("field_wpp").value = myOutPut;
  document.getElementById("field_wpp").setSelectionRange(theLastPos, theLastPos);
}

document.getElementById("field_wpp").onkeypress = validate_int;
document.getElementById("field_wpp").onkeyup = phone_number_mask;