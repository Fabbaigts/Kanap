/* ---------------------etapes des fonctions attendues sur la page :-------------------------------


    1 - ******* Affichage éléménents du panier (ou LS). *******
    2 - ******* Ajout d'une fonctionnalité d'incrémentation / décrémentation / supression de produits existant
                dans le panier avec mise à jour en temps réel du prix total + Nombre d'articles.
    3 - ******* Ajout d'une fonctionnalité d'écoute de champs de formulaire avec alerte de conformité de données inérées.
    4 - ******* Ajout d'une fonctionnalité de d'envois du formulaire + des données de la commande vers l'API avec confirmation.

              <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
            </div>

//-------------------------------------------------------------------------------------------------------------------------------

/* 1 ------------------------- Affichage des produits du panier ----------------------------- */

// 1.1- récup des clés du LS
    /* récupération du local Storage et injection dans une variable
    (https://prograide.com/pregunta/21964/obtenir-les-cles-html5-localstorage)*/

let ProduitsDansLS = JSON.parse(localStorage.getItem("panier"))
console.log(ProduitsDansLS);
// Fonctionnalité d'affichage des produits contenus dans le tableau ayant pour clé "panier" dans le LS.
   
for (let i of ProduitsDansLS)//Boucle 2 d'inventaire des produits dans le LS
    {
      let afficherProduitPanier = i;  
      console.log(afficherProduitPanier);
      let newArticle = document.querySelector("#cart__items");
      { newArticle.innerHTML += `<section id="cart__items"> 
          <article class="cart__item" data-id="${afficherProduitPanier.id}" data-color="${afficherProduitPanier.couleur}">
            <div class="cart__item__img">
                <img src="${afficherProduitPanier.image}" alt="${afficherProduitPanier.altTxt}">
                  </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                          <h2>${afficherProduitPanier.nom}</h2>
                          <p>${afficherProduitPanier.couleur}</p>
                          <p>${afficherProduitPanier.prix} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                          <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${afficherProduitPanier.quantite}">
                          </div>
                          <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </section>`;
                }
            }
       
        
    

 
  // Ajout des fonctionnalités d'incrémentation/décrémentation  d'articles du panier et de suppression
  // Principe :   
  //  1 - ciblage des éléments du DOM dont la "value" de l'input doit être modifiée
  //  2 - écoute du bouton d'incrémentation/décrémentation de qtité 
  //  3 - Au "clic" sur les bouton du haut/bas : augmente/diminue la valeur qtitié du LS.

    
/*
    
const modifQuantite = document.getElementsByClassName("cart__item__content__settings__quantity").length;
console.log(modifQuantite);


async function miseAJourPanier()
{/*recherche dans le DOM le nombre d'éléments ayant pour classe "cart...." 
  (representant donc le nombre d'articles dans la panier et dont la "value" de l'imput peut être modifiée)*/

/*

  const modifQuantite = document.getElementsByClassName("cart__item__content__settings__quantity").length;
  console.log(modifQuantite);
  

  
  //change
      
};
*/



//2 - ******** FORMULAIRE *************
