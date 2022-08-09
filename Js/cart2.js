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

let panierDuLs = JSON.parse(localStorage.getItem("panier"))
console.log(panierDuLs);

//1.2 Création d'un tableau vide prêt à reçevoir les données de l'api pour une comparaison d'id ultérieure LS/API.

let infoPrixProduit =[];

/* 1.3 - Récup des infos du service web ( On récupère tous le catalogue produits , 
pour ne récupéré que l'image et surtout les Prix car plus sécurisés et non manipulable dans l'api*/
// A cette étape j'obtient donc 2 tableaux: celui de LS avec les produits mis dans le panier (panierDuLS) et celui de l'api 
//avec tous les prix et images des produits (infoPrixImagesProduit).

fetch("http://localhost:3000/api/products") 
.then
  (function (res)
    { if (res.ok) 
      {console.log (res);
        return res.json();
      }
    }
  )
.then
  (function recup(catalogue) 
    {
      console.log(catalogue); //Affichage dans la console du contenu de JSON de l'api
      for  (let prod of catalogue)
      { infoPrixProduit.push ({id:prod._id, image:prod.imageUrl, prix: prod.price});
      }
       for (let element of infoPrixProduit)
     { console.log(element); prixCatalogue = element.prix; console.log(prixCatalogue)
    }
    }
  )
    //Sinon affiche le message d'erreur dans la console et son type
.catch
  (function (err) 
    {
    console.log("Une erreur est survenue" + err);
    }
  );


//************************************************************************************************* */

//affichage dans la console du tableau recupéré de l'api avec prix et images
 console.log(infoPrixProduit);


// 





//***** Fonctionnalité globale d'affichage des produits du panier et ses TOTAUX

affichage (panierDuLs);


function affichage (panierDuLs){
  let totalNombreArticle = 0;
  let montantTotalPanier = 0;
   

  for (let produit of panierDuLs)//Boucle  d'inventaire des produits dans le LS
    { console.log(produit);

      // ********* Fonctionnalité d'affichage des produits contenus dans le tableau ************

       affichageProduits () //appel à la fonction d'affichage des produits du panier juste en dessous
      function affichageProduits ()
      {
        let newArticle = document.querySelector("#cart__items");// création d'un nouvel article dans le DOM
        { newArticle.innerHTML += //injection du nouvel article dans le DOM
          `<section id="cart__items"> 
            <article class="cart__item" data-id="${produit.id}" data-color="${produit.couleur}">
              <div class="cart__item__img">
                  <img src="${produit.image}" alt="${produit.altTxt}">
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
      }   
   

    }}