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

async function save (){
  GeklicktesBuch.classList.add('rentet');
  Popup.setAttribute('hidden','');
  let neuePerson = new Person (GeklicktesBuch.textContent,NameInput.value,datum);
  try {
    const response = await fetch('http://localhost:5000/api/ausleihliste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(neuePerson)
   });
  const result = await response.json();
  neuePerson.id = result.id;
  Ausgeliehen.push(neuePerson);
  updateListe();
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
  }
  NameInput.value= '';
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

    loeschButton.addEventListener('click', async () => { //mit Hilfe von KI
       try { // Server: Eintrag löschen
    await fetch(`http://localhost:5000/api/ausleihliste/${person.id}`, {
      method: 'DELETE'
    });
    let buchElementOben = Array.from(document.querySelectorAll('.Buch p'))
    .find(p => p.textContent.trim() === person.book);
    if (buchElementOben) {
        buchElementOben.classList.remove('rentet');
     }
    Ausgeliehen.splice(index, 1);
    updateListe();
    } catch (error) {
    console.error('Fehler beim Löschen:', error);
    } 
    });

    aktionZelle.appendChild(loeschButton);
    zeile.appendChild(aktionZelle);
    TabellenInhalt.appendChild(zeile);
  });
}

window.addEventListener('DOMContentLoaded', async function () {
  try {
   const response = await fetch('http://localhost:5000/api/ausleihliste');
    Ausgeliehen = await response.json();
     Ausgeliehen.forEach(person => {
        let buchElement = Array.from(document.querySelectorAll('.Buch p'))
        .find(p => p.textContent.trim() === person.book);
      if (buchElement) {
        buchElement.classList.add('rentet');
      }
    });
    updateListe();
    } catch (error) {
    console.error('Fehler beim Laden:', error);
  }
});

async function requestTextWithGET(url) {
  const response = await fetch(url);
  console.log('Response:', response); // vollständiges Response-Objekt
  const text = await response.text();
  console.log('Response-Text:', text); // Text aus dem Response-Body
}

requestTextWithGET('http://127.0.0.1:5000');
console.log('Zwischenzeitlich weiterarbeiten...');

async function sendJsonWithPOST(url, jsonData) {
  const response = await fetch(url, {
    method: 'post',
    body: jsonData}
  )
}

sendJsonWithPOST('http://localhost:5000/', jsonData); // Hier URL zu lokalem Server für Entwicklung