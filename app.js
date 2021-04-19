let myLibrary = ["High Castle"];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}
const display = document.querySelector('.display-lib');
const newBtn = document.querySelector('#newBtn');
const addBtn = document.querySelector('#addBtn');
const inputBook = document.querySelector('.inputBook');
const closeSpan = document.querySelector('.close');

function render() {

  for (let i=0; i<myLibrary.length; i++){
     display.textContent = `${myLibrary}`;
  }
}


newBtn.addEventListener('click', function(){
    document.getElementById("popUp").style.display = "block";
  }
)



closeSpan.addEventListener('click', function() {
  popUp.style.display = "none";
})

window.addEventListener('click', function(e) {
  if (e.target == popUp) {
    popUp.style.display = "none";
  }
})

addBtn.addEventListener('click', function(){
 
}
)

