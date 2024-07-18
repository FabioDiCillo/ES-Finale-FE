class useService{
    basePath="https://localhost:7173/api/Book";
    async getBooks(){
        try{
            const response = await fetch (this.basePath);
            if(!response.ok){
                throw new Error("ERRORE");
            }
            return response.json();
        }catch(e){
            return [];
        }
    }
    
}
async function loadAllBooks(){
    const useService= new useService();
    const users = await useService.getBooks();
    console.log(users);
}
loadAllBooks()

