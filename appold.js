// ############ Selectors ############

    //Add a book form pop up
const newBtn = document.querySelector('#newBtn');
    //add the new book to the library
const addBtn = document.querySelector('#addBtn');
    // close span
const closeSpan = document.querySelector('.close');
    // display the new book
const display = document.querySelector('.display-lib');
//############ Listeners ############

    // pop up the modal
newBtn.addEventListener('click', function () {
    document.getElementById("popUp").style.display = "block";
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


let counter = 0;
let myLibrary = [];


addBtn.addEventListener('click', (e) => {
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        pages = document.querySelector('#pages').value,
        notes = document.querySelector('#notes').value,
        read = document.querySelector('#read').checked;

    if (title === '' || author === '' || pages === '' || notes === '') {
        UI.showAlert('Fill in the all the fields', 'error');
    } else {
        const newBook = new Book(title, author, pages, notes, read);
        //add bo to the UI
        UI.addBookToLibrary(newBook);
        //add book to the library array
        myLibrary.push(newBook);

        Storage.setData(newBook);
        UI.showAlert('book added', 'success');
        //function to clear input after submitted
        UI.clearFields();
        

    }

    e.preventDefault();
});

// ################# CLASSES #######################

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

    static addBookToLibrary(book) {
        const shelf = document.querySelector('#book-list');
        const row = document.createElement('th');

        row.setAttribute("id", "" + counter);
        counter += 1; //Increment the count

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
        if (book.read) {
            row.querySelector('#read').checked = true;
        } 
        //delete the book
        const dlt = row.querySelector('.delete');
        dlt.addEventListener('click', function (e) {
            UI.deleteBook(e.target);
            UI.showAlertDelete('book removed', 'success');
        })
        shelf.appendChild(row);
    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#notes').value = '';
        document.querySelector('#read').checked;
    }
    static deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.remove();
        }

    }
    // the alert prototoype function
   static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const form = document.querySelector('#form');
        form.appendChild(div);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);

    }
    static showAlertDelete(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const form = document.querySelector('.content');
        form.appendChild(div);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);

    }

}

class Storage {
    static restore() {
        if (!localStorage.myLibrary) {
            displayBook();
        } else {
            let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
            objects = JSON.parse(objects);
            myLibrary = objects;
            displayBook();
        }
        restore();
    }
   static setData() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
}