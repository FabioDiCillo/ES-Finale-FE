class AuthorService {
    basePath = "https://localhost:7173/api/Author";
    
    async getAuthors() {
        return fetch(this.basePath)
            .then(r => r.json());
    }

   
   
}
async function loadAllAuthors() {
    const authorService = new AuthorService();
    try {
        const author = await authorService.getAuthors();
        console.log(author);
        author.forEach(author => {
            loadSingleAuthor(author);
        });
    } catch (error) {
        console.error("Error loading author:", error);
    }


}
async function deleteAuthor(id) {
    return fetch("https://localhost:7173/api/Author" + "/" + id, {
        method: 'DELETE'
    }).then(() => {
        return true; 
    }).catch(err => {
        console.error(err);
        return false; 
    });
}
function loadSingleAuthor(author) {
    const listcontainer = document.getElementById("authorList");
    const authorElement = document.createElement('div');
 
    authorElement.innerHTML = `
        <div class=" flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800">
        <div class="flex flex-col justify-between p-4 leading-normal">
             <p class="text-white">Nome: ${author.name}</p>
            
             <p class="text-white">Cognome: ${author.surname}</p>
            
             <p class="text-white">Indirizzo: ${author.address}</p>
            
             <p class="text-white">Città: ${author.city}</p>
            
        </div>
   
                
                        <div class="flex justify-evenly sm:gap-4 mb-2">
                    <button class="btn-cat"><a href="listalibri.html">Libri</a></button>
                    <button class="btnelimina"data-id="${author.id}">Elimina</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    const deleteButton = authorElement.querySelector('.btnelimina');
  
    deleteButton.addEventListener('click', async () => {
        const deleted = await deleteAuthor(author.id);
        if (deleted) {   
            authorElement.remove();
        }
    });
    
    listcontainer.appendChild(authorElement);
    
}
loadAllAuthors();
