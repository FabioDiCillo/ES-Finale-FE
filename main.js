class BookService{
    basePath="https://jsonplaceholder.typicode.com/users";
    async getBooks(){
        
        fetch("https://jsonplaceholder.typicode.com/users", {
            mode: "no-cors",
            headers: {
                "content-type": "application/json" 
                }
            }).then(r => r.json());
    }

}
async function loadAllBooks(){

    fetch("https://localhost:7173/api/Book")
        .then(r => 
            {
                console.log(r);
                return r.json();
            })
        .then(json => console.log(json));




    //const bookService=new BookService();
    //const books= await bookService.getBooks();
    //console.log(books);

    // books.forEach((value,index,array) => {
    //     loadSingleBook(value);
    // });
}
function loadSingleBook(book){
    const listcontainer= document.getElementById("bookList");
    listcontainer.innerHTML=`<div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800">
            <p class="text-white">${book.year}</p>
         <div class="flex flex-col justify-between p-4 leading-normal">
             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${book.tite}</h5>
             <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${book.description}</p>
             <div class="flex justify-between">
                 
                 <button class="btn-cat">Categoria</button>
                 <button class="btnelimina">Elimina</button>

             </div>
            
         </div>

        </div>`
}
loadAllBooks();
