// class BookService {
//     basePath = "https://localhost:7173/api/Book";
    
//     async getBooks() {
//         return fetch(this.basePath)
//             .then(r => r.json());
//     }

   
   
// }

// async function loadAllBooks() {
//     const bookService = new BookService();
//     try {
//         const books = await bookService.getBooks();
//         console.log(books);
//         books.forEach(book => {
//             loadSingleBook(book);
//         });
//     } catch (error) {
//         console.error("Error loading books:", error);
//     }


// }

// async function deleteBook(id) {
//     return fetch("https://localhost:7173/api/Book" + "/" + id, {
//         method: 'DELETE'
//     }).then(() => {
//         return true; 
//     }).catch(err => {
//         console.error(err);
//         return false; 
//     });
// }

// async function aggiungiLibro(datiLibro) {
//     return fetch("https://localhost:7173/api/Book", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(datiLibro)
//     }).then(r => r.json());
// }

// function gestisciInvioForm(evento) {
//     evento.preventDefault();
//     const form = evento.target;
//     const formData = new FormData(form);
//     const datiLibro = Object.fromEntries(formData.entries());

//     const servizioLibri = new BookService();
//     servizioLibri.aggiungiLibro(datiLibro)
//         .then(nuovoLibro => {
//             console.log('Libro aggiunto:', nuovoLibro);
//             loadSingleBook(nuovoLibro);
//             form.reset();
//         })
//         .catch(errore => console.error('Errore nell\'aggiunta del libro:', errore));
// }


// function loadSingleBook(book) {
//     const listcontainer = document.getElementById("bookList");
//     const bookElement = document.createElement('div');
 
//     bookElement.innerHTML = `
//         <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800">
//             <p class="text-white">${book.year}</p>
//             <div class="flex flex-col justify-between p-4 leading-normal">
//                 <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${book.title}</h5>
//                 <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${book.description}</p>
//                 <div class="flex justify-between sm:gap-4">

//                     <button class="btn-cat">Categoria</button>
//                     <button class="btnelimina"data-id="${book.id}">Elimina</button>
//                 </div>
//             </div>
//         </div>
//     `;
//     const deleteButton = bookElement.querySelector('.btnelimina');
  
//     deleteButton.addEventListener('click', async () => {
//         const deleted = await deleteBook(book.id);
//         if (deleted) {   
//             bookElement.remove();
//         }
//     });
    
//     listcontainer.appendChild(bookElement);
    
// }


// document.getElementById('form').addEventListener('submit', gestisciInvioForm);

// loadAllBooks();

class BookService {
    basePath = "https://localhost:7173/api/Book";

    async getBooks() {
        return fetch(this.basePath)
            .then(r => r.json());
    }


}

async function loadAllBooks() {
    const bookService = new BookService();
    try {
        const books = await bookService.getBooks();
        console.log(books);
        books.forEach(book => {
            loadSingleBook(book);
        });
    } catch (error) {
        console.error("Error loading books:", error);
    }
}

async function deleteBook(id) {
    return fetch(`https://localhost:7173/api/Book/${id}`, {
        method: 'DELETE'
    }).then(() => {
        return true;
    }).catch(err => {
        console.error(err);
        return false;
    });
}


function loadSingleBook(book) {
    const listcontainer = document.getElementById("bookList");
    const bookElement = document.createElement('div');
 
    bookElement.innerHTML = `
        <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800">
            <p class="text-gray-700">Anno: ${book.year}</p>
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Titolo: ${book.title}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Descrizione: ${book.description}</p>
                <div class="flex justify-between sm:gap-4">
                    <button class="btn-cat">Categoria</button>
                    <button class="btnelimina"data-id="${book.id}">Elimina</button>
                    <button class="btnmodifica"data-id="${book.id}"><a href="updatelibro.html?bookId=${book.id}">Modifica</a></button>
                </div>
            </div>
        </div>
    `;
    const deleteButton = bookElement.querySelector('.btnelimina');
  
    deleteButton.addEventListener('click', async () => {
        const deleted = await deleteBook(book.id);
        if (deleted) {   
            bookElement.remove();
        }
    });

    listcontainer.appendChild(bookElement);
}



loadAllBooks();
