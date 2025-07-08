const myLibrary = [];

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

function addBookToLibrary(Book) {
  // take params, create a book then store it in the array
    myLibrary.push(Book);
}

function showLibrary(){
    const cardContainer = document.querySelector(".card-container")
    for(let i = 0; i < myLibrary.length; i++){
        console.log(myLibrary[i].info());
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("card");
        bookDiv.textContent = myLibrary[i].info();
        if(myLibrary[i].read){
            bookDiv.style.boxShadow = "-5px 5px #82b74b";
        }
        cardContainer.appendChild(bookDiv);
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
