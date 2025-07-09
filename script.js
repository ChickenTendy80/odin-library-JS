const myLibrary = [];

const showButton = document.getElementById("showDialog");
const newBook = document.getElementById("newBook");
const confirmBtn = newBook.querySelector("#confirmBtn");
const removeBtn = document.querySelector(".remove");

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
    myLibrary.unshift(Book);
}

function showLibrary(){
    const cardContainer = document.querySelector(".card-container");
    cardContainer.replaceChildren();
    
    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const name = document.createElement("h2");
        name.classList.add("name");
        name.textContent = book.name;

        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = `by ${book.author}` ;

        const page = document.createElement("p");
        page.classList.add("pages");
        page.textContent = `${book.pages} pages`;

        if(book.read){
            card.style.boxShadow = "-5px 5px #82b74b";
        }

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if(index !== -1){
                myLibrary.splice(index, 1);
                showLibrary();
            }
        });

        const isReadBtn = document.createElement("button");
        isReadBtn.classList.add("isRead");
        isReadBtn.textContent = "Not read yet";
        if(book.read){
            card.style.boxShadow = "-5px 5px #82b74b";
            isReadBtn.textContent = "Read already";
        }
        isReadBtn.addEventListener("click", () =>{
            book.read = true;
            card.style.boxShadow = "-5px 5px #82b74b";
            isReadBtn.textContent = "Read already";
            showLibrary();
        });

        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(page);
        card.appendChild(removeBtn);
        card.appendChild(isReadBtn);

    
        cardContainer.appendChild(card);
    })
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
    newBook.close();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form

    const nameInput = newBook.querySelector("#name");
    const authorInput = newBook.querySelector("#author");
    const pageInput = newBook.querySelector("#page");

    const nameValue = nameInput.value;
    const authorValue = authorInput.value;
    const pageValue = pageInput.value;

    //console.log(nameValue);

    if(nameValue && authorValue && pageValue){
        const tempBook = new Book(nameValue,authorValue,pageValue);
        //console.log(tempBook);
        addBookToLibrary(tempBook);
        showLibrary();

        //disable dialog box and clear the form
        newBook.close();
        document.getElementById("name").value = "";
        document.getElementById("author").value = "";
        document.getElementById("page").value = "";
    }
    else{
        alert("Please fill the book data");
    }
});


