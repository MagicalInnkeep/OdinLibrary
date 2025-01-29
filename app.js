//--------------------------
//  Global scope Variables
//--------------------------

//Array to keep track of stored goods
const myLibrary=[];
const library = document.querySelector(".library");

//--------------------------
// Constructors
//--------------------------

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
};    

//--------------------------
// Library Functions
//--------------------------

function addBookToLibrary(title,author,pages,read){
    const newBook=new Book(title,author,pages,read);
    myLibrary.push(newBook);
}


//--------------------------
// DOM Functions
//--------------------------

function displayBooks(){
   
    //Clears item before loading new status
    library.innerHTML = "";

    //Append for each element in myLibrary a child to library.
    myLibrary.forEach(element => {
        console.log(element.info());
        //Creates template Element
        const libraryItem = document.createElement("div");
        libraryItem.setAttribute("class","libraryItem");
        libraryItem.textContent=element.info();
        library.appendChild(libraryItem);
    });
}

//--------------------------
//  Temporary Content
//--------------------------

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, 1);
addBookToLibrary("Lord Of the Rings", "J.R.R. Tolkien", 900, 1);
addBookToLibrary("Lord Of the Flies", "unknown", 111, 0);

//--------------------------
//  Main
//--------------------------

displayBooks();