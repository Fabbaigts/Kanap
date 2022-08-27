//************************************************************************************************
//******** Déclaration des Variables globales nécessaires aux fonctionnalités de la page *********
//************************************************************************************************

// Création d'un tableau dns lequels seront stockés  les Objets "PRODUITS" de la commande ultérieure
let listeDeCommande = [];

//Récupération du panier du LS


//*********************************************************************************************************
//******************Boucle sur un fetch pour aller chercher les renseignement manquants********************
//*************************** en fonction des produits existants dans le LS *******************************
//*********************************************************************************************************

constitutionPanierLocal();

async function constitutionPanierLocal() {

  let panierDuLs = JSON.parse(localStorage.getItem("panier"));

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

affichagePanier();
//***********************************************************************************
//********* boucle permettant l'affichage des produits sur la page CART *************
//***********************************************************************************
function affichagePanier() {
  setTimeout(function affichagePanierDuLs() {
    console.log(listeDeCommande); // j'ai bien l'affichage du tableau dans la console
    console.log(listeDeCommande.length); // et quand j'interroge sa taille, il m'indique 0 !

    for (let produit of listeDeCommande) {
      let newArticle = document.querySelector("#cart__items");
      newArticle.innerHTML += `<section id="cart__items"> 
                                             <article class="cart__item" data-id="${produit.id}" data-color="${produit.couleur}">
                                                <div class="cart__item__img">
                                                    <img src="${produit.img}" alt="${produit.alt}">
                                                </div>
                                                <div class="cart__item__content">
                                                    <div class="cart__item__content__description">
                                                        <h2>${produit.nom}</h2>
                                                        <p>${produit.couleur}</p>
                                                        <p>${produit.prix}€</p>
                                                    </div>
                                                    <div class="cart__item__content__settings">
                                                        <div class="cart__item__content__settings__quantity">
                                                            <p>Qté : </p>
                                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
                                                            value="${produit.quantite}">
                                                        </div>
                                                        <div class="cart__item__content__settings__delete">
                                                            <p class="deleteItem">Supprimer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </section>`;
    }
  modificationQuantite();
  suppressionArticle()
  calculDesTotaux();


  }, 50);
  
}

