class BookService {
    basePath = "https://localhost:7173/api/Book";
    
    async getBooks() {
        try {
            const response = await fetch(this.basePath);
            return await response.json();
        } catch (error) {
            console.error("Error loading books:", error);
            return [];
        }
    }

    async aggiungiLibro(datiLibro) {
        console.log("Dati inviati 1:", datiLibro); // Log dei dati inviati
        const categoriaSelezionata = document.getElementById("category").value;
        const autoreSelezionato = document.getElementById("author").value;
        const payload = {
            title: datiLibro.title,
            description: datiLibro.description,
            year: datiLibro.year,
            categoryId: parseInt(categoriaSelezionata, 10),
            authorId: parseInt(autoreSelezionato, 10)
        };
        console.log("Dati inviati:", payload); // Log dei dati inviati
        try {
            const response = await fetch(this.basePath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            console.log("Dati inviati:", response.status); // Log dei dati inviati  
            return response.status;
        } catch (err) {
            console.error("Error adding book:", err);
            return null;
        }
    }
}

class CategoryService {
    basePath = "https://localhost:7173/api/Category";
  
    async getCategories() {
        try {
            const response = await fetch(this.basePath);
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Errore durante il recupero delle categorie:", error);
            return [];
        }
    }
}

class AuthorService {
    basePath = "https://localhost:7173/api/Author"; // Assumiamo questo endpoint per l'API degli autori
  
    async getAuthors() {
        try {
            const response = await fetch(this.basePath);
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Errore durante il recupero degli autori:", error);
            return [];
        }
    }
}

async function loadAllCategories() {
    const categoryService = new CategoryService();
    const categories = await categoryService.getCategories();
  
    const selectElement = document.getElementById("category");
    if (selectElement) {
        selectElement.innerHTML = ''; // Svuota il menu a tendina
  
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.text = "Seleziona una categoria";
        selectElement.appendChild(placeholderOption);
  
        categories.forEach(cat => {
            const optionElement = document.createElement("option");
            optionElement.value = cat.id;
            optionElement.text = cat.name;
            selectElement.appendChild(optionElement);
        });
    } else {
        console.error("Elemento 'category' non trovato nell'HTML.");
    }
}

async function loadAllAuthors() {
    const authorService = new AuthorService();
    const authors = await authorService.getAuthors();
  
    const selectElement = document.getElementById("author");
    if (selectElement) {
        selectElement.innerHTML = '';
  
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.text = "Seleziona un autore";
        selectElement.appendChild(placeholderOption);
  
        authors.forEach(author => {
            const optionElement = document.createElement("option");
            optionElement.value = author.id;
            optionElement.text = author.name;
            selectElement.appendChild(optionElement);
        });
    } else {
        console.error("Elemento 'author' non trovato nell'HTML.");
    }
}

function gestisciInvioForm(event) {
    event.preventDefault(); // Impedisci l'invio standard del form
    const form = event.target;
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

document.addEventListener('DOMContentLoaded', () => {
    loadAllCategories();
    loadAllAuthors();
  
    const form = document.getElementById('form'); // Assicurati che l'ID del form sia corretto
    if (form) {
        form.addEventListener('submit', gestisciInvioForm);
    } else {
        console.error("Elemento 'form' non trovato nell'HTML.");
    }
});

  