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
            categoryId: 5,
            authorId: 3,
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



document.getElementById('form').addEventListener('submit', gestisciInvioForm);