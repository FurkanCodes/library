
// Declerations
const display = document.querySelector('.display-lib');
const newBtn = document.querySelector('#newBtn');
const addBtn = document.querySelector('#addBtn');
const inputBook = document.querySelector('.inputBook');
const closeSpan = document.querySelector('.close');
const popForm = document.querySelector('#popUp');




//book constructor
class Book {
  constructor(title, author, pages, notes, read) {
      this.title = title; 
      this.author = author; 
      this.pages = pages; 
      this.notes = notes;
      this.read = read;
  }
}


class UI {
  constructor() {
  }


  addBookToLibrary(book) {
    const list = document.querySelector('.display-lib');
    const row = document.createElement('th');
    const bookTh = document.querySelector('.book');

 
    row.innerHTML = `
  <div class="book"> 
   <div class="title">Title: ${book.title}</div>
   <p class="author">Author: ${book.author}</p>
  <p class="pages">Pages: ${book.pages}</p>
  <p class="pages">Notes: ${book.notes}</p>
  <span class="read_toggle_label">Mark as read:</span>
    
         <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
     
  <a href="#" class="delete"></a>
  </div>
  `;



    list.appendChild(row);
  }
  // the alert prototoype function
  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const form = document.querySelector('#form');
    form.appendChild(div);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);

  }
  showAlertDelete(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const form = document.querySelector('.content');
    form.appendChild(div);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);

  }

  // book delete function
deleteBook(target){
  if(target.className === 'delete'){
    target.parentElement.remove(); 
  }
}

  //function to clear input after submitted
  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#notes').value = '';
    document.querySelector('#notes').value = '';
  }
}


addBtn.addEventListener('click', function(e){
  //get the values from the pop up form
 const title = document.querySelector('#title').value,
      author = document.querySelector('#author').value,
      pages = document.querySelector('#pages').value;
      notes = document.querySelector('#notes').value;

  
  const book = new Book(title, author, pages, notes);

  const ui = new UI();
  


  //validation
  if(title === "" || author === "" || pages === "" || notes === ""){
    // error  at UI 
    ui.showAlert('Fill in the all the fields', 'error');
  } else  {
    // ADD BOOK TO DISPLAY_BOOK
    ui.addBookToLibrary(book);

    ui.showAlert('book added', 'success');
    //clear the fields
    ui.clearFields();

  }

  e.preventDefault();
})


// Stuff regarding the pop up modal
// pop ups the new book form
newBtn.addEventListener('click', function () {
  document.getElementById("popUp").style.display = "block";
}
)

// closes the form
closeSpan.addEventListener('click', function () {
  popUp.style.display = "none";
})
// closes the form when you click anywhere on the window
window.addEventListener('click', function (e) {
  if (e.target == popUp) {
    popUp.style.display = "none";
  }
})



// book deletion event

display.addEventListener('click', function (e){
  //first get the UI 
  const ui = new UI();

ui.deleteBook(e.target);
ui.showAlertDelete('Book deleted', 'success');

  e.preventDefault();
})













