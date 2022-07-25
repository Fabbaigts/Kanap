
 /* ---------------------etapes des fonctions attendues sur la page :-------------------------------


    1 - ******* Affichage sout forme de tableau des éléménents du panier (ou LS). *******

        1.1- récup des clés du LS

        1.2 - Création d'une fonction d'affichage des produits <article> grâce à clé/produits du LS
            1.2.1    - appel du fichier JSON des produits et parse (pour récupérer de nouveau les données des produits).
            1.2.2   - Création d'une fonction d'affichage de ses données en fonction de ce que contient le LS.
                1.2.2.1   - affichage de l'image produit <img>
                1.2.2.2   - affichage de la description (<h2>-nom produit, <p>couleur, <p>prix )
                1.2.2.3   - affichage du paramétrage de la quantité <p>-Qté avec un min de 1 et max 100
                1.2.2.4   - affichage d'un cta de suppression de l'article du LS
        
        1.3 - Calcul automatique du TOTAL du panier ( nombres totla d'articles et prix total)
        div class="cart__price">
              <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
            </div>


    2 - ******** FORMULAIRE *************






*/

/* 1 ------------------------- Affichage des produits du panier ----------------------------- */

// 1.1- récup des clés du LS
    /* récupération du local Storage et injection dans une variable
    (https://prograide.com/pregunta/21964/obtenir-les-cles-html5-localstorage)*/

let ProduitsDansLS = Object.entries(localStorage) 
console.log(ProduitsDansLS);

// 1.2 - Création d'une fonction d'affichage des produits <article> grâce à clé/produits du LS



//1.2.1    - appel du fichier JSON des produits et parse (pour récupérer de nouveau les données des produits).


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
  (function recuperationJson(produitsDuCatalogue) 
    {
      console.log(produitsDuCatalogue); //Affichage dans la console du contenu de JSON
      affichageProduitsDuPanier(produitsDuCatalogue); // Lance la fonction "affichageProd" permettant l'affichage des produits du LS
    }
  )
    //Sinon affiche le message d'erreur dans la console et son type
.catch
  (function (err) 
    {
    console.log("Une erreur est survenue" + err);
    }
  );


// 1.2.2   - Création d'une fonction d'affichage de ses données en fonction de ce que contient le LS.
//  L'idée principale de cette fonction est de comparer ce que contient le LS avec le fichier Json.parse
// 1.2.2.1   - affichage de l'image produit <img>


function  affichageProduitsDuPanier(produitsDuCatalogue) {} { 
//ProduitsDansLS => tableau composé des elements du panier
//recuperationJson => Tableau composé de tous les produits (en Json...)

let newArticle = document.querySelector("#cart__items");
for (let i of ProduitsDansLS)
  {
    console.log("Nouvel article détecté dans le fichier JSON:  " + i);
    console.log("Nouvel article détecté dans le fichier JSON:  " + i[0]);

      const produitarse = JSON.parse (i[1])///yeahhhhhhh!! il fallait parser pour pouvoir acceder aux données du ls!
      console.log (produitarse)
      console.log("Nouvel article détecté dans le fichier JSON:  " + produitarse.couleur); //lA PREUVE!


    newArticle.innerHTML += `<section id="cart__items">
            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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

/*  newArticle.innerHTML += 
      `<a href="./product.html?_id=${i._id}"> 
        <article>
          <img src="${i.imageUrl}" alt="${i.altTxt}">
          <h3 class="productName">${i.name}</h3>
          <p class="productDescription">${i.description}</p>
          <p class="productPrice">à partir de ${i.price}€</p>
        </article>
      </a>`;*/
/*<section id="cart__items">
             <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->
            </section>
*/