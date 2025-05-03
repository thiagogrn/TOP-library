// Array de libros
let myLibrary = [];

// Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

}

// Funcion para agregar libros a la libreria
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book)
}

// Agregar funcion para cambiar estado de leido
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}


// Mostrar libros en pantalla
function displayBook() {
    const container = document.querySelector('.library')

    myLibrary.forEach((book) => {

        // Datos del libro obtenido de libreria
        let bookTitle = book.title;
        let bookId = book.id;
        let bookAuthor = book.author;
        let bookPages = book.pages;
        let bookRead = book.read;

        // Carta contenedora del libro
        let cardBook = document.createElement("div");
        cardBook.setAttribute("id", bookId)

        // Elementos del libro
        let cardBookTitle = document.createElement("h1");
        let cardBookAuthor = document.createElement("h2");
        let cardBookPages = document.createElement("h3");
        cardBookTitle.classList.add("book-title")
        cardBookAuthor.classList.add("book-author")
        cardBookPages.classList.add("book-pages")

        // Crear boton para cambiar estado de leido a no leido y viceversa
        let btnToggleRead = document.createElement("button");
        btnToggleRead.classList.add("btnToggleRead");
        btnToggleRead.textContent = bookRead ? "Leido" : "No Leido"

        btnToggleRead.addEventListener("click", () => {
            book.toggleRead();
            btnToggleRead.textContent = book.read ? "Leido" : "No Leido"
        })

        // Crear boton para remover libro
        let removeButton = document.createElement("button");
        removeButton.setAttribute("data-parent", bookId);
        removeButton.classList.add("btnRemove");
        removeButton.textContent = "X";

        removeButton.addEventListener("click", () => {
            let btnId = removeButton.dataset.parent;
            
            let bookToDelete = document.getElementById(btnId);
            bookToDelete.classList.toggle("cardBookDeleted", true);
            
            myLibrary = myLibrary.filter(book => book.id != btnId);
        })
        

        // Informacion del libro
        cardBookTitle.textContent = bookTitle;
        cardBookAuthor.textContent = `Autor: ${bookAuthor}`;
        cardBookPages.textContent = `Paginas: ${bookPages}`;

        // Anexar elementos al libro
        cardBook.appendChild(cardBookTitle);
        cardBook.appendChild(removeButton);
        cardBook.appendChild(cardBookAuthor);
        cardBook.appendChild(cardBookPages);
        cardBook.appendChild(btnToggleRead);


        cardBook.classList.add("cardBook")
        container.appendChild(cardBook);
    }) 

}

addBookToLibrary('Crimen y castigo', 'Fiódor Dostoyevski','650', false);
addBookToLibrary('El Retrato de Dorian Gray', 'Oscar Wilde','240', false);
addBookToLibrary('1984', 'George Orwell','400', false);

// Agregar libros con el formulario
const myForm = document.querySelector('#myForm');
myForm.addEventListener("submit", checkForm)

function checkForm(e) {
    e.preventDefault()
    let container = document.querySelector(".library")

    // Datos del libro
    const formTitle = document.querySelector("#title").value;
    const formAuthor = document.querySelector("#author").value;
    const formPages = document.querySelector("#pages").value;
    const formCheckBox = document.querySelector("#read");
    let formReadValue = formCheckBox.checked ? true : false;
    
    // Agregar a libreria y seleccionar libro
    addBookToLibrary(formTitle, formAuthor, formPages, formReadValue)
    let formBook = myLibrary[myLibrary.length - 1];

    // Carta contenedora del libro
    let formCard = document.createElement("div");
    formCard.setAttribute("id", formBook.id)

    // Elentos del libro
    let formCardTitle =  document.createElement("h1");
    let formCardAuthor = document.createElement("h2");
    let formCardPages = document.createElement("h3");
    formCardTitle.classList.add("book-title");
    formCardAuthor.classList.add("book-author");
    formCardPages.classList.add("book-pages");

    // Crear boton para cambiar estado de leido a no leido y viceversa
    let btnToggleRead = document.createElement("button");
    btnToggleRead.classList.add("btnToggleRead");
    btnToggleRead.textContent = formReadValue ? "Leido" : "No Leido";

    btnToggleRead.addEventListener("click", () => {
        formBook.toggleRead();
        btnToggleRead.textContent = formBook.read ? "Leido" : "No leido"
    })

    // Crear boton para remover el libro
    let removeButton = document.createElement("button");
    removeButton.setAttribute("data-parent", formBook.id)
    removeButton.classList.add("btnRemove")
    removeButton.textContent = "X";

    removeButton.addEventListener("click", () => {
        let btnId = removeButton.dataset.parent;
        
        let bookToDelete = document.getElementById(btnId);
        bookToDelete.classList.toggle("cardBookDeleted", true);
        
        myLibrary = myLibrary.filter(book => book.id != btnId);
    })

    // Datos del libro
    formCardTitle.textContent = formTitle;
    formCardAuthor.textContent = `Autor: ${formAuthor}`;
    formCardPages.textContent = `Paginas
     ${formPages}`;

    // Anexar elementos al libro
    formCard.appendChild(formCardTitle);
    formCard.appendChild(removeButton);
    formCard.appendChild(formCardAuthor);
    formCard.appendChild(formCardPages);
    formCard.appendChild(btnToggleRead);

    formCard.classList.add("cardBook");
    container.appendChild(formCard);
}

displayBook();


