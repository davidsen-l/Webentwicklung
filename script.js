class Person {
  constructor(book, name, date) {
    this.book = book;
    this.name = name;
    this.date = date;
  }
}
let Abbruch = document.querySelector('#X');
let Buch = document.querySelector('.Buch');
let Popup = document.querySelector('.popupbuch');
let Speichern = document.querySelector('.popupbuch button');
let NameInput = document.querySelector('.popupbuch input');
let PopupForm = document.querySelector('.popupbuch form');
let Liste = document.querySelector('.liste');
let GeklicktesBuch = null;
let Ausgeliehen = [];
let heute = new Date();
let datum = heute.toLocaleDateString('de-DE');//mit Hilfe von KI

Buch.addEventListener('click',rent);
Speichern.addEventListener('click',save);
PopupForm.addEventListener('submit',function(event){event.preventDefault();})
Abbruch.addEventListener('click',cancel);

function cancel(event){
  event.stopPropagation();
  NameInput.value= '';
  Popup.setAttribute('hidden','');
}

function rent(event){
  let Geklickt = event.target.closest('p');//mit hilfe von KI
  GeklicktesBuch = Geklickt;
  if (Geklickt.classList.contains('rentet')) {
    return;
  } else {
    Popup.removeAttribute('hidden');
  }
}

function save (){
  GeklicktesBuch.classList.add('rentet');
  Popup.setAttribute('hidden','');
  let neuePerson = new Person (GeklicktesBuch.textContent,NameInput.value,datum);
  Ausgeliehen.push(neuePerson);
  NameInput.value= '';
  updateListe();
  localStorage.setItem('personen', JSON.stringify(Ausgeliehen));
}

function updateListe() { //mit Hilfe von KI
  let TabellenInhalt = document.querySelector('.liste tbody');
  TabellenInhalt.innerHTML = '';

  Ausgeliehen.forEach((person, index) => {
    let zeile = document.createElement('tr');

    let buchZelle = document.createElement('td');
    buchZelle.textContent = person.book;
    zeile.appendChild(buchZelle);

    let nameZelle = document.createElement('td');
    nameZelle.textContent = person.name;
    zeile.appendChild(nameZelle);

    let datumZelle = document.createElement('td');
    datumZelle.textContent = person.date;
    zeile.appendChild(datumZelle);

    let aktionZelle = document.createElement('td');
    let loeschButton = document.createElement('button');
    loeschButton.textContent = 'Zurückgeben';
    loeschButton.addEventListener('click', () => {
      let buchElementOben = Array.from(document.querySelectorAll('.Buch p'))
        .find(p => p.textContent.trim() === person.book);
      if (buchElementOben) {
        buchElementOben.classList.remove('rentet');
      }
      Ausgeliehen.splice(index, 1);
      localStorage.setItem('personen', JSON.stringify(Ausgeliehen));
      updateListe();
    });

    aktionZelle.appendChild(loeschButton);
    zeile.appendChild(aktionZelle);
    TabellenInhalt.appendChild(zeile);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  let gespeicherteDaten = localStorage.getItem('personen');
  if (gespeicherteDaten) {
    Ausgeliehen = JSON.parse(gespeicherteDaten);
    Ausgeliehen.forEach(person => {
      let buchElement = Array.from(document.querySelectorAll('.Buch p'))
        .find(p => p.textContent.trim() === person.book);
      if (buchElement) {
        buchElement.classList.add('rentet');
      }
    });
    updateListe();
  }
});