const myLibrary = [];

const showButton = document.getElementById("showDialog");
const newBook = document.getElementById("newBook");
const tempName = newBook.querySelector("name");
const tempAuthor = newBook.querySelector("author");
const tempPages = newBook.querySelector("pages");
const confirmBtn = newBook.querySelector("#confirmBtn");

function Book(name, author, pages) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = false;
  this.info = function(){
    let tempString = "not read yet";
    if(this.read==true){
        tempString = "already read";
    }
    return this.name + " by " + this.author + ", " + this.pages + " pages, " + tempString;
  }
  
}

function addCard(cardContainer, book){
    const bookDiv = document.createElement("div");
    const removeButton = document.createElement("button");

    bookDiv.classList.add("card");
    bookDiv.textContent = book.info();
    if(book.read){
        bookDiv.style.boxShadow = "-5px 5px #82b74b";
    }

    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    bookDiv.appendChild(removeButton);

    cardContainer.appendChild(bookDiv);
}

function addBookToLibrary(Book) {
  // take params, create a book then store it in the array
    myLibrary.unshift(Book);
}

function showLibrary(){
    const cardContainer = document.querySelector(".card-container");
    cardContainer.replaceChildren();
    for(let i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].name !== null){
            //console.log(myLibrary[i].info());
            addCard(cardContainer, myLibrary[i]);
        }
    }
}

let bookOne = new Book("book 1", "me", 234);
let bookTwo = new Book("book 2", "you", 456);
let bookThree = new Book("book 3", "them", 789);
let bookFour = new Book("book 4", "us", 159);

bookTwo["read"] = true;

addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
addBookToLibrary(bookThree);
addBookToLibrary(bookFour);

showLibrary();

showButton.addEventListener("click", () => {
  newBook.showModal();
});

newBook.addEventListener("close", (e) => {
    e.preventDefault();
    dialog.close();
});

newBook.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  console.log("selected!");
  let newBook = new Book(tempName, tempAuthor, tempPages);
  addBookToLibrary(newBook);
  showLibrary();
  dialog.close();
});