//****************************************************************
// **** Récupération de l'Id de commande injectée dans l'Url ****
//***************************************************************
let params = new URLSearchParams(document.location.search);
let idUrl = params.get("id");

console.log(idUrl); // vérification de la valeur retournée dans la console

//****************************************************************
//******** Injection du numéro de commande dans le DOM ***********
//********         Et réinitialisation du panier       ***********
//****************************************************************
affichageNumeroCommande();
function affichageNumeroCommande() {
  const recuperationId = document.getElementById("orderId");
  recuperationId.innerHTML = `${idUrl}`;
  localStorage.clear();
}
