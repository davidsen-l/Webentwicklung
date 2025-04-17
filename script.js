let NewBuch = document.getElementById("new");
NewBuch.addEventListener("click",add);
inputValue = "Buch";
function add(event){
    /*let New = document.createElement("p"); // Schauen ob man das ins Buch tochter element reinbekommt
    New.textContent = inputValue;
    NewBuch.append(New);*/
    let NewBuch = document.querySelector(".Buch");
    NewBuch.innerHTML += "<p><span>Buch</span></p>";
}
let Buch = document.querySelector(".Buch");
//const Buch = document.querySelector(".Buch");
Buch.addEventListener("click", buchausleihen);
function buchausleihen(event){
  //Soll n Popup geben wo mein sein Name eintragen kann
  document.body.classList.add(".rentet");//soll das Buch als ausgeliehen markieren
  // soll den Namen in die Liste packen
}
const person = {
  book: "Annakarenina",
  name: "Thomas Müller",
  date: "20.03.2025",
}
let personAsJson = JSON.stringify(person);
console.log(personAsJson);
let personParsedBack = JSON.parse(personAsJson);
console.log(personParsedBack);
localStorage.setItem("person", personAsJson);
console.log(localStorage.getItem("person"));