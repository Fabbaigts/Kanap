
let params = new URLSearchParams(document.location.search); 
let idUrl = params.get("id"); // Récupère l'id "_id" dans params et donne donne cette valeur à la variable "idUrl"
console.log(idUrl) // vérification de la valeur retournée dans la consol
affichageNumeroCommande();
function affichageNumeroCommande (){
    const recuperationId = document.getElementById("orderId");
    recuperationId.innerHTML = `${idUrl}`
    localStorage.clear();
    
}
