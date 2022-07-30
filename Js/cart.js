/* ---------------------etapes des fonctions attendues sur la page :-------------------------------


    1 - ******* Affichage sout forme de tableau des éléménents du panier (ou LS). *******



                1.2.2.4   - affichage d'un cta de suppression de l'article du LS
        
        1.3 - Calcul automatique du TOTAL du panier ( nombres totla d'articles et prix total)
        div class="cart__price">
              <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
            </div>

//-------------------------------------------------------------------------------------------------------------------------------




/* 1 ------------------------- Affichage des produits du panier ----------------------------- */

// 1.1- récup des clés du LS
    /* récupération du local Storage et injection dans une variable
    (https://prograide.com/pregunta/21964/obtenir-les-cles-html5-localstorage)*/

let ProduitsDansLS = JSON.parse(localStorage.getItem("panier"))
console.log(ProduitsDansLS);//ProduitsDansLS => tableau composé des elements du panier




// 1.2 - Création d'une fonction d'affichage des produits <article> grâce à clé/produits du LS






fetch("http://localhost:3000/api/products") // Appel vers l'API pour la récupération des données du fichier produits
//Alors, Si le fichier cible est trouvé, (res.ok) retourne les informations en format JSON.
.then
  (function (res)
    { if (res.ok) 
      {console.log (res);
        return res.json();
      }
    }
  )

    /*Ce résultat json étant lui aussi une Promise,
    nous le retournons et récupérons sa vraie valeur
    dans la fonction then() suivante, ayant comme paramètre 'produitsDuCatalogue'*/
.then

  (
    
    function recuperationJson(produitsDuCatalogue) //recuperationJson => Tableau composé de tous les produits (en Json...)
      {
        let newArticle = document.querySelector("#cart__items");//ciblage de l'element html avec l'id cart__items

          for (let instance of produitsDuCatalogue)//Boucle 1 d'inventaire des produits du catalogue général.
          { 
            for (let i of ProduitsDansLS)//Boucle 2 d'inventaire des produits dans le LS
            {
              const produitPanier = JSON.parse (i[1]);// parsage des éléments du LS pour exploitation des données.
             console.log(ProduitsDansLS[0]);
              
              /* Comparaison entre les produits du LS et ceux du Catalogue général pour trouver les similitudes.
              Si similitude il y a alors, injecte le html suivant avec les données relatives au cat. général et celui du panier*/
              if (instance._id === produitPanier.id)
                { newArticle.innerHTML += `<section id="cart__items"> 
                  <article class="cart__item" data-id="${produitPanier.id}" data-color="${produitPanier.couleur}">
                      <div class="cart__item__img">
                        <img src="${instance.imageUrl}" alt="${instance.altTxt}">
                      </div>
                      <div class="cart__item__content">
                        <div class="cart__item__content__description">
                          <h2>${instance.name}</h2>
                          <p>${produitPanier.couleur}</p>
                          <p>${instance.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                          <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitParse.quantite}">
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
       
          }
      }
    
    
  )

 /* .then
  (function (catalogue) 
    {
      console.log(catalogue); //Affichage dans la console du contenu de JSON
      affichageProd(catalogue)// Lance la fonction "affichageProd" permettant l'affichage des produits du fichier JSON
    }
  )*/
/* .then (miseAJourPanier)
  
  //Sinon affiche le message d'erreur dans la console et son type
.catch
  (function (err) 
    {
    console.log('Une erreur est survenue' + err);
    }
  );

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
