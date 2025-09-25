function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    let readStatus = this.read ? "Already read" : "Not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`
  };
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(crypto.randomUUID(),title,author,pages,read);
  return myLibrary.push(book);
}


function displayBooks() {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${book.title}</h3>
      <h4>Author: ${book.author}</h4>
      <p><Strong>Pages:</Strong> ${book.pages}</p>
      <p><Strong>Status:</Strong><span class="status ${book.read ? "read" : "unread"}"> ${book.read ? "Already read" : "Not read yet"}</p>
      <button onclick="toggleBook('${book.id}')" class="toggle-read">Toggle Read</button>
      <button onclick="removeBook('${book.id}')" class="remove-book">Remove</button>
      `;
    cards.appendChild(card);
  }
}

displayBooks();

const dialog = document.querySelector(".add-book");
const showButton = document.querySelector(".open-dialog");
const closeButton = document.querySelector(".close-dialog");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

const form = document.getElementById("add-book-form")

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const pages = parseInt(document.querySelector("#pages").value, 10);
  const read = document.querySelector("#read").checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();
  form.reset();
  dialog.close();
});

function toggleBook(id) {
  const book = myLibrary.find(b => b.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

function removeBook(id) {
  const index = myLibrary.findIndex(b => b.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}