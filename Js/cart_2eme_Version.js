

//************************************************************************************************
//******** Déclaration des Variables globales nécessaires aux fonctionnalités de la page *********
//************************************************************************************************

let listeDeCommande = []; // Création d'un tableau vide prêt à reçevoir les Objets "produits" de la commande ultéieure.

let panierDuLs = JSON.parse(localStorage.getItem("panier")); //Récupération du panier du LS sous forme de Tableau.


//***************************************************************************
//*************************************************************************** */ */
constitutionPanierLocal();
function constitutionPanierLocal() {
  

  for (let i = 0; i < panierDuLs.length; i++) {
    //(let i = 0; i < panierDuLs.length; i++)
    fetch("http://localhost:3000/api/products/" + panierDuLs[i].id)
      .then(function (res) {
        return res.json();
      })

      .then((products) => {
        const produitAjouteCommande = {
          nom: products.name,
          id: products._id,
          couleur: panierDuLs[i].couleur,
          prix: products.price,
          img: products.imageUrl,
          alt: products.altTxt,
          quantite: panierDuLs[i].quantite,
        };
        listeDeCommande.push(produitAjouteCommande);
        affichagePanier();
      })

      .catch((err) => {
        console.log("Une erreur est survenue" + err);
      });
  }
 
}



async function affichagePanier() { console.log(listeDeCommande.length);
  console.log(listeDeCommande);

  for (let i = 0; i < listeDeCommande.length; i++) {
    console.log("hello");
  }
}

