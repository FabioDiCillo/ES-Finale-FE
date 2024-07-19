// class BookService{
//     basePath="https://localhost:7173/api/Book";
//     async getBooks(){
        
//         fetch("https://localhost:7173/api/Book", {
//             mode: "no-cors",
//             headers: {
//                 "content-type": "application/json" 
//                 }
//             }).then(r => r.json());
//     }

// }
// async function loadAllBooks(){

//     fetch("https://localhost:7173/api/Book")
//         .then(r => 
//             {
//                 console.log(r);
//                 return r.json();
//             })
//         .then(json => console.log(json));




//     const bookService=new BookService();
//     const books= await bookService.getBooks();
//     console.log(books);

//     books.forEach((value,index,array) => {
//         loadSingleBook(value);
//     });
// }
// function loadSingleBook(book){
//     const listcontainer= document.getElementById("bookList");
//     listcontainer.innerHTML=`<div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800">
//             <p class="text-white">${book.year}</p>
//          <div class="flex flex-col justify-between p-4 leading-normal">
//              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${book.title}</h5>
//              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${book.description}</p>
//              <div class="flex justify-between">
                 
//                  <button class="btn-cat">Categoria</button>
//                  <button class="btnelimina">Elimina</button>

//              </div>
            
//          </div>

//         </div>`
// }
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
// async function deleteBook(id){
//     fetch("https://localhost:7173/api/Book" + "/" + id, {
//       method: 'DELETE'
//     }).then(() => {
//        console.log('removed');
//     }).catch(err => {
//       console.error(err)
//     });
// }
async function deleteBook(id) {
    return fetch("https://localhost:7173/api/Book" + "/" + id, {
        method: 'DELETE'
    }).then(() => {
        console.log('removed');
        return true; // Indica che l'eliminazione è avvenuta con successo
    }).catch(err => {
        console.error(err);
        return false; // Indica che c'è stato un errore nell'eliminazione
    });
}


function loadSingleBook(book) {
    const listcontainer = document.getElementById("bookList");
    const bookElement = document.createElement('div');
 
    bookElement.innerHTML = `
        <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800">
            <p class="text-white">${book.year}</p>
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${book.title}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${book.description}</p>
                <div class="flex justify-between sm:gap-4">

                    <button class="btn-cat">Categoria</button>
                    <button class="btnelimina"data-id="${book.id}">Elimina</button>
                </div>
            </div>
        </div>
    `;
    const deleteButton = bookElement.querySelector('.btnelimina');
    // deleteButton.addEventListener('click', () =>{
    //     deleteBook(book.id)
    // });
    deleteButton.addEventListener('click', async () => {
        const deleted = await deleteBook(book.id);
        if (deleted) {
            // Rimuovi l'elemento dalla DOM
            bookElement.remove();
            // Opzionale: ricarica tutti i libri
            // document.getElementById("bookList").innerHTML = '';
            // await loadAllBooks();
        }
    });
    
    listcontainer.appendChild(bookElement);
    
}
loadAllBooks();



