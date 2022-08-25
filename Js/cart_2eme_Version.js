//************************************************************************************************
//******** Déclaration des Variables globales nécessaires aux fonctionnalités de la page *********
//************************************************************************************************

//Récupération du panier du LS
let panierDuLs = JSON.parse(localStorage.getItem("panier"));

//*********************************************************************************************************
//******************Boucle sur un fetch pour aller chercher les renseignement manquants********************
//*************************** en fonction des produits existants dans le LS *******************************
//*********************************************************************************************************

constitutionPanierLocal();
function constitutionPanierLocal() {
  for (let i = 0; i < panierDuLs.length; i++) {
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
      })

      .catch((err) => {
        console.log("Une erreur est survenue" + err);
      });
  }
}

// Création d'un tableau dns lequels seront stockés  les Objets "PRODUITS" de la commande ultérieure
let listeDeCommande = [];

//***********************************************************************************
//********* boucle permettant l'affichage des produits sur la page CART *************
//***********************************************************************************
affichagePanier([listeDeCommande], panierDuLs);
async function affichagePanier() {
  console.log(listeDeCommande); // j'ai bien l'affichage du tableau dans la console
  console.log(listeDeCommande.length); // et quand j'interroge sa taille, il m'indique 0 !

  for (let i of listeDeCommande) {
    console.log("hello"); //normlement je devrai avoir "hello" dans la console autant de fois qu'il y a de produits dans le tableau listeDeCommande...Mais NON!
  }
}
