
/* 1 ------------------------- Affichage des produits du panier ----------------------------- */

// 1.1- récup des clés du LS
    
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
    //declaration des variables du compteur des totaux
  let totalNombreArticle = 0;
  let montantTotalPanier = 0;
    // lancement de la boucle de parcours des objets du panier
   

  for (let produit of panierDuLs)//Boucle  d'inventaire des produits dans le LS
    { console.log(produit);

    // interrogation de l'api (fetch) concerant le produit parcouru
        let idProduitLS = produit.id 
    fetch("http://localhost:3000/api/products/"+idProduitLS ) 
        .then
        (function (res)
            { if (res.ok) 
            {console.log (res);
                return res.json();
            }
            }
        )
        .then
        (function (articleApi) 
            {
            console.log(articleApi); //Affichage dans la console du contenu de JSON de l'api
            let prixProduit = articleApi.price;
            console.log(articleApi.price);
            
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
                            <p>${prixProduit}€</p>
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

    totalNombreArticle += JSON.parse(produit.quantite);//variable dans laquelle se trouve la qtité totale d'articles par incrémentation (+=)
  let totalArticles = totalNombreArticle;
  montantTotalPanier += JSON.parse(articleApi.price) * (produit.quantite) ;//variable dans laquelle se trouve le montant total du panier
  let prixTotal = montantTotalPanier;
  console.log ('Total des articles = ' + totalArticles);
  console.log ('Montant total calculé :  = ' + prixTotal);

  affichageDesTotaux ();
    function affichageDesTotaux ()
      {
          let newSpanQuantity = document.getElementById("totalQuantity");
          newSpanQuantity.textContent = totalNombreArticle;
          let newSpanPrix = document.getElementById("totalPrice");
          newSpanPrix.textContent = montantTotalPanier;
        };
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

   

    }}