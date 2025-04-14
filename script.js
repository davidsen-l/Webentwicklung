/*let Buch = document.querySelector(".Buch");
Buch.innerHTML += "<p><span>Buch</span></p>";*/

let Buch = document.getElementById("new")
Buch.addEventListener("click",add);
function add(event){
    /*let New = document.createElement("p");
    New.textContent = inputValue;
    Buch.append(New);*/
    let Buch = document.querySelector(".Buch");
    Buch.innerHTML += "<p><span>Buch</span></p>";
}