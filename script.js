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

function exibeOutros(valor) {
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

async function addMatricula() {
  resetInputs()

  document.getElementById("buttonEnviarText").style.display = "none";
  document.getElementById("buttonEnviar").classList.add("button--loading");

  const responsavel = document.getElementById("field_responsavel").value;
  const email = document.getElementById("field_email").value;
  const wpp = document.getElementById("field_wpp").value;
  const crianca = document.getElementById("field_crianca").value;
  const turma = document.querySelector('input[name="turma"]:checked')?.value ?? "";
  const kit = document.querySelector('input[name="kit"]:checked')?.value ?? "";
  const ondeConheceu = document.querySelector('input[name="ondeConheceu"]:checked')?.value ?? "";
  const ondeConheceuOutros = document.getElementById("field_ondeConheceuOutros").value;
  const obsCrianca = document.getElementById("field_obsCrianca").value;

  const body = {
    responsavel, email, wpp, crianca, turma, kit, ondeConheceu, ondeConheceuOutros, obsCrianca
  }

  if (!validateBody(body)) {
    document.getElementById("buttonEnviar").classList.remove("button--loading");
    document.getElementById("buttonEnviarText").style.display = "block";
    return;
  }

  try {
    await fetch('https://coloniavds.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    document.getElementById("buttonEnviar").style.backgroundColor = "#47B66D";
    document.getElementById("buttonEnviarText").textContent = "Matr??cula enviada com sucesso!";
  } catch (e) {
    console.log(e);
    document.getElementById("buttonEnviar").style.backgroundColor = "#ed4a4a";
    document.getElementById("buttonEnviarText").textContent = "Algo deu errado, tente novamente mais tarde!";
  } finally {
    console.log("finally");
    document.getElementById("buttonEnviar").classList.remove("button--loading");
    document.getElementById("buttonEnviarText").style.fontSize = "14px";
    document.getElementById("buttonEnviarText").style.display = "block";
  }

  setTimeout(() => {
    document.getElementById("buttonEnviar").style.backgroundColor = "#f096b1";
    document.getElementById("buttonEnviarText").textContent = "Enviar";
    document.getElementById("buttonEnviarText").style.fontSize = "21px";
  }, 1500);
}

function validateBody({
  responsavel, email, wpp, crianca, turma, kit, ondeConheceu, ondeConheceuOutros, obsCrianca
}) {
  const TURMAS = ["Semana 1 (17/01 ?? 21/01)", "Semana 2 (24/01 ?? 28/01)"]
  const KITS = ["Kit Aventureiro", "Kit Fofurices"]
  const INDICACAO = ["Google", "Facebook", "Instagram", "Algu??m indicou", "Outros"]

  let isOK = true

  try {
    if (responsavel.split(' ').length < 2) {
      document.getElementById("field_responsavel").style.borderColor = "#FF3D00";
      document.getElementById("responsavelError").textContent = responsavel ? "Nome do respons??vel inv??lido" : "Nome do respons??vel ?? obrigat??rio"
      isOK = false;
    }

    if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) === null) {
      document.getElementById("field_email").style.borderColor = "#FF3D00";
      document.getElementById("emailError").textContent = email ? "Email inv??lido" : "Email ?? obrigat??rio"
      isOK = false;
    }

    if (wpp.length !== 15) {
      document.getElementById("field_wpp").style.borderColor = "#FF3D00";
      document.getElementById("wppError").textContent = wpp ? "Telefone inv??lido" : "Telefone ?? obrigat??rio"
      isOK = false;
    }

    if (crianca.split(' ').length < 2) {
      document.getElementById("field_crianca").style.borderColor = "#FF3D00";
      document.getElementById("criancaError").textContent = crianca ? "Nome da crian??a inv??lido" : "Nome da crian??a ?? obrigat??rio"
      isOK = false;
    }

    if (TURMAS.indexOf(turma) === -1) {
      document.getElementById("turmaError").textContent = turma ? "Turma inv??lida" : "Turma ?? obrigat??ria"
      isOK = false;
    }

    if (KITS.indexOf(kit) === -1) {
      document.getElementById("kitError").textContent = kit ? "Kit inv??lido" : "Kit ?? obrigat??rio"
      isOK = false;
    }

    if (INDICACAO.indexOf(ondeConheceu) === -1) {
      document.getElementById("ondeConheceuError").textContent = ondeConheceu ? "Onde conheceu inv??lido" : "Onde conheceu ?? obrigat??rio"
      isOK = false;
    }

    if (ondeConheceu === 'Outros' && !ondeConheceuOutros) {
      document.getElementById("field_ondeConheceuOutros").style.borderColor = "#FF3D00";
      document.getElementById("ondeConheceuError").textContent = "Onde conheceu inv??lido (Outros) ?? obrigat??rio"
      isOK = false;
    }

    if (!obsCrianca) {
      document.getElementById("field_obsCrianca").style.borderColor = "#FF3D00";
      document.getElementById("obsCriancaError").textContent = "Observa????es da crian??a ?? obrigat??rio"
      isOK = false;
    }
  } catch (e) {
    return false
  }

  return isOK
}

function resetInputs() {
  document.getElementById("field_responsavel").style.borderColor = "#f096b1";
  document.getElementById("responsavelError").textContent = ''
  document.getElementById("field_email").style.borderColor = "#f096b1";
  document.getElementById("emailError").textContent = ''
  document.getElementById("field_wpp").style.borderColor = "#f096b1";
  document.getElementById("wppError").textContent = ''
  document.getElementById("field_crianca").style.borderColor = "#f096b1";
  document.getElementById("criancaError").textContent = ''
  document.getElementById("turmaError").textContent = ''
  document.getElementById("kitError").textContent = ''
  document.getElementById("ondeConheceuError").textContent = ''
  document.getElementById("field_ondeConheceuOutros").style.borderColor = "#f096b1";
  document.getElementById("ondeConheceuError").textContent = ''
  document.getElementById("field_obsCrianca").style.borderColor = "#f096b1";
  document.getElementById("obsCriancaError").textContent = ''
}