//button event listeners for create new book, add new book to page, close popup
const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBookToLibrary);

const newBookBtn = document.querySelector('#newBtn');
newBookBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const popUpForm = document.getElementById('popUp');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');
const form = document.querySelector('#form');

//Book Constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value; 
        this.author = form.author.value; 
        this.pages = form.pages.value + ' pages'; 
        this.read = form.read.checked; 
    }
}

//creates book from Book Constructor, adds to library
let myLibrary = [];
let newBook;

// const titleWarning = document.getElementById('title-warning');
// const authorWarning = document.getElementById('author-warning');
// const pagesWarning = document.getElementById('pages-warning');

// function addBookToLibrary(event) {

//     event.preventDefault();
   
    
//     popUpForm.style.display = 'none';

//     newBook = new Book(title, author, pages,read); 
//     myLibrary.push(newBook); 
//     setData();  //saves updated array in local storage
//     render(); 
//     form.reset();
// }
function addBookToLibrary(event) {
    event.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;

    if (!title) {
        document.querySelector("#title-warning").innerHTML = "Title is required";
    } else {
        document.querySelector("#title-warning").innerHTML = "";
    }

    if (!author) {
        document.querySelector("#author-warning").innerHTML = "Author is required";
    } else {
        document.querySelector("#author-warning").innerHTML = "";
    }

    if (!pages) {
        document.querySelector("#pages-warning").innerHTML = "Number of pages is required";
    } else {
        document.querySelector("#pages-warning").innerHTML = "";
    }

    if (title && author && pages) {
        newBook = new Book(title, author, pages,read); 
        myLibrary.push(newBook); 
        setData();  //saves updated array in local storage
        render(); 
        form.reset();
    }
}
//Creates book visual in browser
function render() {
    const display = document.getElementById('Library-Container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
   
    for (let i=0; i<myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}

//creates book DOM elements, to use in render();
function createBook(item) {
    const library = document.querySelector('#Library-Container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    
    
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = item.author;
    authDiv.classList.add('author');
    bookDiv.appendChild(authDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn');    
    bookDiv.appendChild(readBtn);
    if(item.read===false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#e04f63';
    }else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#63da63'
    }

    removeBtn.textContent = 'Remove'; 
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);
    
    library.appendChild(bookDiv);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData();
        render();
    });

    //add toggle ability to each book 'read' button on click
    readBtn.addEventListener('click', () => { 
        item.read = !item.read; 
        setData(); 
        render();
    }); 
};

// setting Library to be stored in local storage
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
    if(!localStorage.myLibrary) {
        render();
    }else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();

