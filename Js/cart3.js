
/* 1 ------------------------- Affichage des produits du panier ----------------------------- */

// 1.1- récup des clés du LS
    
let panierDuLs = JSON.parse(localStorage.getItem("panier"))
console.log(panierDuLs);

//ECOUTE DES INPUTS DE LA PAGE du formulaire
 
async function modifQtite() 
{
  const champQuantite = document.querySelectorAll("itemQuantity.value");
  console.log(champQuantite);
  champQuantite.addEventListener
  ('click',function()
    {
      console.log(panierDuLs);
      /*if (panier == null) 
            {
                // Tu créé un nouveau tableau vide dans le localstorage
                localStorage.setItem("panier", JSON.stringify([]));
            }*/
    }
    )
}

//1.2 Création d'un tableau vide prêt à reçevoir les données de l'api pour une comparaison d'id ultérieure LS/API.

//***** Fonctionnalité globale d'affichage des produits du panier et ses TOTAUX

affichage (panierDuLs);


function affichage (panierDuLs)
{
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
            return res.json();}
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
                    recupInput()
                     function recupInput() 
                    {
                         const champQuantite =  document.getElementsByClassName ('itemQuantity');
                         
                        for ( let input of champQuantite ){
                       
                    
                      addEventListener('change',(e) =>
                        {
                       produit.quantite = input.value ;
                    
                     console.log(input.value);
                      console.log(produit.quantite);
                            
                        }
                        )}
                    }
                    };

                    //ECOUTE DES INPUTS DE LA PAGE du formulaire
                   
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

                

    }
}