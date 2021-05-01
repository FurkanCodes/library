// ############ Selectors ############


const newBtn = document.querySelector('#newBtn');
const addBtn = document.querySelector('#addBtn');
const closeSpan = document.querySelector('.delete');
const display = document.querySelector('.display-lib');



//############ Listeners ############



// pop up the modal
newBtn.addEventListener('click', function () {
    popUp.style.display = "block";
})

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
addBtn.addEventListener('click', function(){
    const titleBook = document.querySelector('#title').value;
    const authorBook = document.querySelector('#author').value;
    const pagesBook = document.querySelector('#pages').value;
    const notesBook = document.querySelector('#notes').value;
    const readBook = document.querySelector('#read').checked;
    if (titleBook === "" || authorBook === "" || pagesBook === "" || notesBook === "") {
        showAlert("Please fill in all the blanks", 'error');
    } else {
        book = new Book(titleBook, authorBook, pagesBook, notesBook, readBook);
        myLibrary.push(book);
        displayBook(book);
        showAlert("book is added", 'success');
    }
    event.preventDefault();
});



let myLibrary = [];

function Book(title, author, pages, notes, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.notes = notes;
    this.read = read;
}

function addBookToLibrary() {

    const titleBook = document.querySelector('#title').value;
    const authorBook = document.querySelector('#author').value;
    const pagesBook = document.querySelector('#pages').value;
    const notesBook = document.querySelector('#notes').value;
    const readBook = document.querySelector('#read').checked;
    if(titleBook === "" && authorBook === "" && pagesBook === "" && notesBook === ""){
        showAlert("Please fill in all the blanks", 'success');
    } else {
        book = new Book(titleBook, authorBook, pagesBook, notesBook, readBook);
        myLibrary.push(book);
        displayBook(book);
       showAlert("book is added", 'success');
       
    }
event.preventDefault();
} 


function displayBook(book) {
    const shelf = document.querySelector('#book-list');
    const row = document.createElement('th');


    row.innerHTML = `
        <div class="book"> 
            <div class="title">Title: ${book.title}</div>
                 <p class="author">Author: ${book.author}</p>
                 <p class="pages">Pages: ${book.pages}</p>
                 <p class="pages">Notes: ${book.notes}</p>
            <span class="read_toggle_label">Mark as read:</span>
         <label class="switch">
            <input type="checkbox" value="yes" id='read' name='read'>
            <span class="slider round"></span>
         </label>
             <a href="#" class="delete"></a>
        </div>
            `;
    const dltBtn = row.querySelector('.delete');
    dltBtn.addEventListener('click', function (e) {
        deleteBook(e.target);
        showAlertDelete('book removed', 'success');
    })
    if (book.read) {
        row.querySelector('#read').checked = true;
    }
    shelf.appendChild(row);

};


// ######### ALERTS FOR THE UI ###########

function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const form = document.querySelector('#form');
    form.appendChild(div);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
 
}

function showAlertDelete(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const form = document.querySelector('.content');
    form.appendChild(div);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);

}

// function that deletes the book. aims at parentElements
function deleteBook(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}