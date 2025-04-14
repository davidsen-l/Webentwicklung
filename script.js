let NewBuch = document.getElementById("new");
NewBuch.addEventListener("click",add);
inputValue = "Buch";
function add(event){
    let New = document.createElement("p"); // Schauen ob man das ins Buch tochter element reinbekommt
    New.textContent = inputValue;
    NewBuch.append(New);
      /*let NewBuch = document.querySelector(".Buch");
    NewBuch.innerHTML += "<p><span>Buch</span></p>";*/
}
let Buch = document.querySelector(".Buch");
