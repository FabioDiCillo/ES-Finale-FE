class BookService {
    basePath = "https://localhost:7173/api/Book";

    async getBooks() {
        return fetch(this.basePath)
            .then(r => r.json());
    }

    async aggiungiLibro(datiLibro) {
        console.log("Dati inviati 1:", datiLibro); // Log dei dati inviati
        const payload = {
            title: datiLibro.title,
            description: datiLibro.description,
            year: datiLibro.year,
            // categoryId: 5,
            // authorId: 3,
        };
        console.log("Dati inviati:", datiLibro); // Log dei dati inviati
        return await fetch(this.basePath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(r =>{
            console.log("Dati inviati:", r.status); // Log dei dati inviati  
            return r.status;
        }).catch(err => {
            console.error("Error loading books:", err);
        });
    }

}


function gestisciInvioForm(evento) {
    evento.preventDefault();
    const form = evento.target;
    const formData = new FormData(form);
    const datiLibro = Object.fromEntries(formData.entries());

    console.log("Dati dal form:", datiLibro);

    const servizioLibri = new BookService();
    servizioLibri.aggiungiLibro(datiLibro)
        .then(nuovoLibro => {
            console.log('Libro aggiunto:', nuovoLibro);
            form.reset();
        })
        .catch(errore => console.error('Errore nell\'aggiunta del libro:', errore));
}

class CategoryService{
    basePath="https://localhost:7173/api/Category";
    async getCategories() {
        return fetch(this.basePath)
            .then(r => r.json());
    }
}
async function loadAllCategory() {
    const categoryService = new CategoryService();
    try {
        const categoryService = await categoryService.getCategories();
        console.log(categoryService);
        categoryService.forEach(category => {
            loadSingleCategory(category);
        });
    } catch (error) {
        console.error("Error loading books:", error);
    }
}

document.getElementById('form').addEventListener('submit', gestisciInvioForm);

function loadSingleCategory(category) {
    const listcontainer = document.getElementById("select-multi");
    const categoryElement = document.createElement('div');
 
    categoryElement.innerHTML = `
                    <div class="relative z-0 w-full mb-5 group">
                        <label for="author" name="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Autore</label>
                        <select id="author" name="author" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            
                        
                        </select>
                    </div>

                    <div class="relative z-0 w-full mb-5 group">
                        <label for="category" name="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Categorie</label>
                        <select id="category" name="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>${category.category.map(cat=>cat.name)} </option>    
                           
                        </select>
                    </div>
    `;
  

    listcontainer.appendChild(categoryElement);
}
