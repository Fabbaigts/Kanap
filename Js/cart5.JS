/* 1 ------------------------- Affichage des produits du panier ----------------------------- */

// 1.1- récup des clés du LS
    
let panierDuLs = JSON.parse(localStorage.getItem("panier"))
console.log("Tableau du LS contenant les produits mis dans le panier: " )
console.log(panierDuLs);

//1.2 Création d'un tableau vide prêt à reçevoir les données de l'api pour une comparaison d'id ultérieure LS/API.

//***** Fonctionnalité globale d'affichage des produits du panier et ses TOTAUX

// récup des produits ayant le même Id dans L'api

function recupProduitsApi ()
{
        fetch("http://localhost:3000/api/products/"+idProduitLS ) 
        .then
            (function (res)
            { if (res.ok) 
            {console.log("Réponse du fetch : " ) ;console.log (res);
            return res.json();}
            }
            )
        .then
        (function recupProduitApiPrix(articleApi) 
            {   console.log("article dans l'Api ayant le Même ID que ceux dans le LS : ");
                console.log(articleApi); //Affichage dans la console du contenu de JSON de l'api
                console.log("Prix extrait de L'API : ");
                let prixProduit = articleApi.price;
                console.log(articleApi.price);
                //appel à la fonction d'affichage des produits du panier juste en dessous
                affichageProduits () 
            })
            //Sinon affiche le message d'erreur dans la console et son type
        .catch
            (function (err) 
            {
            console.log("Une erreur est survenue" + err);
            }
            )
            
}

recupId(panierDuLs);
function recupId(panierDuLs)
{// lancement de la boucle de parcours des objets du panier
    for (let produits of panierDuLs)//Boucle  d'inventaire des produits dans le LS
    {   console.log("Produit détecté dans le LS : ");
        console.log(produits);
//--------------
        let idProduitLS = produits.id ;
        console.log(idProduitLS);
        return (idProduitLS);
   
    }
  
}

 // ********* Fonctionnalité d'affichage des produits contenus dans le tableau ************
 affichageProduits ()

function affichageProduits ()
                {  let IdproduitPanier = recupId(panierDuLs);
                    console.log(IdproduitPanier);
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
                                        <p>${produit}€</p>
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
                        recupInput();
                        calculToto();

                        affichageDesTotaux ();
                        function affichageDesTotaux ()
                        {
                        let newSpanQuantity = document.getElementById("totalQuantity");
                        newSpanQuantity.textContent = totalNombreArticle;
                        let newSpanPrix = document.getElementById("totalPrice");
                        newSpanPrix.textContent = montantTotalPanier;
                    
                    };

                    
                   
                }   
                
 

//Fonction d'écoute et de modification des champs input Quantité

/*function recupInput() 
{
    console.log("hello world! ");
    let panier = JSON.parse(localStorage.getItem("panier"));
    //let panierVisible = panier.find ((prod) => {console.log (prod.id) , console.log (prod.couleur),console.log (prod.quantite)}) ;
    let champQuantite = document.getElementsByClassName ("itemQuantity");
    console.log(champQuantite);
                     
    for (let i of champQuantite)
    {   console.log(i.value);
        // je récupère le panier (getItem) parsé (parse)
        
        addEventListener('change',(e) =>
        {
        
        console.log(panier.quantite)
        console.log(i.value);
         panier.quantité = i.value; panier.push(panier.quantité);localStorage.setItem("panier", JSON.stringify(panier));
                     })
        
    }
}*/

// Fonction de récupération des Quantités et Prix pour calcul des totaux ultérieurs
function calculToto()
{let totalNombreArticle = 0;
  let montantTotalPanier = 0;
    totalNombreArticle += JSON.parse(produit.quantite);//variable dans laquelle se trouve la qtité totale d'articles par incrémentation (+=)
    let totalArticles = totalNombreArticle;
    montantTotalPanier += JSON.parse(articleApi.price) * (produit.quantite) ;//variable dans laquelle se trouve le montant total du panier
    let prixTotal = montantTotalPanier;
    console.log ('Total des articles = ' + totalArticles);
    console.log ('Montant total calculé :  = ' + prixTotal);
};
