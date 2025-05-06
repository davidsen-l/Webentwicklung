/*let NewBuch = document.getElementById("new");
NewBuch.addEventListener("click",add);
inputValue = "Buch";
function add(event){
    /*let New = document.createElement("p"); // Schauen ob man das ins Buch tochter element reinbekommt
    New.textContent = inputValue;
    NewBuch.append(New);
    let NewBuch = document.querySelector(".Buch");
    NewBuch.innerHTML += "<p><span>Buch</span></p>";
}*/
let Buch = document.querySelector('.Buch');
let Popup = document.querySelector('.popupbuch');
let Speichern = document.querySelector('.popupbuch button');
let NameInput = document.querySelector('.popupbuch input');
let PopupForm = document.querySelector('.popupbuch form');
let Rückgabe = document.querySelector('.button');
let GeklicktesBuch = null;

Buch.addEventListener('click', rent);
Speichern.addEventListener('click',save);
PopupForm.addEventListener('submit',function(event){event.preventDefault();})
Rückgabe.addEventListener('click',giveback);

function rent(event){
  let Geklickt = event.target.closest('p');//mit hilfe von KI
  GeklicktesBuch = Geklickt;
  if (geklickt.classList.contains('rentet')) {
    Rückgabe.removeAttribute('hidden');// mein Button tauvht nicht auf
  } else {
    Popup.removeAttribute('hidden');
  }
}

function save (){
  GeklicktesBuch.classList.add('rentet');
  Popup.setAttribute('hidden','');
  NameInput.value = '';
  // soll den Namen in die Liste packen
}

function giveback (){
  GeklicktesBuch.classList.remove('rentet');
  Rückgabe.setAttribute('hidden','');
}

const person = {
  book: 'Annakarenina',
  name: 'Thomas Müller',
  date: '20.03.2025',
}
let personAsJson = JSON.stringify(person);
console.log(personAsJson);
let personParsedBack = JSON.parse(personAsJson);
console.log(personParsedBack);
localStorage.setItem('person', personAsJson);
console.log(localStorage.getItem('person'));
