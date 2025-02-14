//--------------------------
//  Class
//--------------------------

//Array to keep track of stored goods
const myLibrary = [];
const library = document.querySelector(".library");
//--------------------------
// Constructors
//--------------------------

class Book{

constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
};

}

//--------------------------
// Library Functions
//--------------------------

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}


//--------------------------
// DOM Functions
//--------------------------

function AddLibrary() {


    const addBookDiv = document.createElement("div");
    addBookDiv.setAttribute("class", "libraryItem addButtonC");

    const addBookBtn = document.createElement("button");
    addBookBtn.textContent = "+";
    addBookBtn.setAttribute("class", "addButton");
    addBookBtn.addEventListener('click', (event) => {
        //Remove the button itself
        addBookDiv.removeChild(addBookBtn);

        //Add form for input
        const addBookForm = document.createElement("form");

        //Add labels and inputs:
        const titleLabel    = document.createElement("label");
        const authorLabel   = document.createElement("label");
        const pagesLabel    = document.createElement("label");
        const readLabel     = document.createElement("label");
        const titleInput    = document.createElement("input");
        const authorInput   = document.createElement("input");
        const pagesInput    = document.createElement("input");
        const readInput     = document.createElement("input");
        const btnOk         = document.createElement("button");

        titleLabel.setAttribute("for","titleInput");
        authorLabel.setAttribute("for","authorInput");
        pagesLabel.setAttribute("for","pagesInput");
        readLabel.setAttribute("for","readInput");

        titleLabel.textContent="Title:";
        authorLabel.textContent="Author:";
        pagesLabel.textContent="Pages:";
        readLabel.textContent="Read:";

        titleInput.setAttribute("id","titleInput");
        authorInput.setAttribute("id","authorInput");
        pagesInput.setAttribute("id","pagesInput");
        readInput.setAttribute("id","readInput");
        titleInput.setAttribute("name","title");
        authorInput.setAttribute("name","author");
        pagesInput.setAttribute("name","pages");
        readInput.setAttribute("name","read");
        titleInput.setAttribute("type","text");
        authorInput.setAttribute("type","text");
        pagesInput.setAttribute("type","integer");
        readInput.setAttribute("type","checkbox");

        btnOk.textContent="Ok";
        btnOk.setAttribute("type","button");
        btnOk.addEventListener('click', (event)=>{
            const title = titleInput.value;
            const author = authorInput.value;
            const pages = parseInt(pagesInput.value, 10); 
            const read = readInput.checked; 

            addBookToLibrary(title,author,pages,read);
            displayBooks();
        });

        addBookForm.appendChild(titleLabel);
        addBookForm.appendChild(titleInput);
        addBookForm.appendChild(authorLabel);
        addBookForm.appendChild(authorInput);
        addBookForm.appendChild(pagesLabel);
        addBookForm.appendChild(pagesInput);
        addBookForm.appendChild(readLabel);
        addBookForm.appendChild(readInput);
        addBookForm.appendChild(btnOk);

        addBookDiv.appendChild(addBookForm);
        titleInput.focus();
    });
    addBookDiv.appendChild(addBookBtn);
    library.appendChild(addBookDiv);

}

function displayBooks() {

    //Clears item before loading new status
    library.innerHTML = "";

    //Append for each element in myLibrary a child to library.
    myLibrary.forEach(element => {
        console.log(element.info());
        //Creates template Element
        const libraryItem = document.createElement("div");
        libraryItem.setAttribute("class", "libraryItem");

        const titleDisplay = document.createElement("div");
        titleDisplay.setAttribute("class","bookTitle");
        titleDisplay.textContent = element.title;
        libraryItem.appendChild(titleDisplay);

        const authorDisplay = document.createElement("div");
        authorDisplay.setAttribute("class","bookAuthor");
        authorDisplay.textContent = "by "+element.author;
        libraryItem.appendChild(authorDisplay);

        const pagesDisplay = document.createElement("div");
        pagesDisplay.setAttribute("class","bookPages");
        pagesDisplay.textContent = "Pages: "+element.pages;
        libraryItem.appendChild(pagesDisplay);

        const readDisplay = document.createElement("input");
        readDisplay.setAttribute("class","bookRead");
        readDisplay.setAttribute("type","checkbox");
        readDisplay.checked=element.read;

        readDisplay.addEventListener("change", () => {
            element.read = readDisplay.checked; 
            displayBooks(); 
        });

        libraryItem.appendChild(readDisplay);
        
        const deleteBook = document.createElement("button");
        deleteBook.setAttribute("class","deleteBook");
        deleteBook.textContent="-";

        deleteBook.addEventListener('click', (event)=>{
                const bookIndex = myLibrary.indexOf(element); 
                if (bookIndex !== -1) {
                    myLibrary.splice(bookIndex, 1); 
                }
                displayBooks();
            });
        
        libraryItem.appendChild(deleteBook);
  
        library.appendChild(libraryItem);
    });

    AddLibrary();
}

//--------------------------
//  Temporary Content
//--------------------------

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, 1);

//--------------------------
//  Main
//--------------------------

displayBooks();