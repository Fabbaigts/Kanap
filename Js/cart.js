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

let infoPrixImageProduit =[];





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
      { infoPrixImageProduit.push ({id:prod._id, image:prod.imageUrl, prix: prod.price});
      }
       for (let element of infoPrixImageProduit)
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


 

// *********** Fonctionnalité de récupération du prix et de l'image des produits du LS depuis l'API *********



/* function recupPrixApi(catalogue) { for (let i of catalogue)
  {let donneesApi= { identifiant : i._id, }
    console.log("Nouvel article détecté dans le fichier JSON:  " + i.price);
    if (i._id === produit.id){donneesApi.prix = i.price; console.log(donneesApi.prix)}

}};*/

//***************************************************************************************************** */
/*for (let i of catalogue)
  {console.log("Nouvel article détecté dans le fichier JSON:  " + i.name);
      
      const lien=document.createElement('a');
       lien.href=`./product.html?_id=${i._id}`;

      const article=document.createElement("article");

      const img=document.createElement("img");
       img.src=`${i.imageUrl}`;
       img.alt=`${i.altTxt}`;

       const titre=document.createElement("h3");
        titre.textContent=`${i.name}`;

      const par=document.createElement("p");
        par.textContent=`${i.description}`;

      const par2=document.createElement("p");
        par2.textContent=`à partir de ${i.price}€`;

      lien.appendChild(article);
      article.append(img,titre,par,par2)


      newArticle.appendChild(lien);
  }*/

//************************************************************************************************* */

//affichage dans la console du tableau recupéré de l'api avec prix et images
 console.log(infoPrixImageProduit);


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
                            <p>${produit.prix} €</p>
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
   


    

  
// ***************  Calcul et affichage  des TOTAUX panier ****************

  totalNombreArticle += JSON.parse(produit.quantite);//variable dans laquelle se trouve la qtité totale d'articles par incrémentation (+=)
  let totalArticles = totalNombreArticle;
  montantTotalPanier += JSON.parse(infoPrixImageProduit.prix);//variable dans laquell e se trouve le montant total du panier
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

      
// **********  mise à jour panier en fonction des variations de quantité ou de suppression 
    // écoute du bouton up / down quantité itemquantity getbyname .value =

    // # 1. Etape 1 : Etre sure de toujours avoir un tableau dans le local storage

    // L'idée c'est d'avoir un tableau `panier` dans le localStorage
    // Pour être sure que tu as toujours un tableau panier dans ton local storage
    // A chaque chargement de page tu vérifie s'il y a un tableau 

/*verificationPanierexistant()
function verificationPanierexistant() {
  const champInput = document.getElementsByClassName("itemQuantity");
  champInput.addEventListener('change',function()
    {
      const panier = localStorage.getItem("panier"); //Essayer d'accéder au local storage

      // Si le panier n'existe pas
      if (panier == null) {
      // Tu créé un nouveau tableau vide dans le localstorage
      localStorage.setItem("panier", JSON.stringify([]));
}

   
// Ajout 

let couleurDiv = document.getElementById("colors").value;
let quantiteAAjouter = parseInt(document.getElementById("quantity").value)

produitChoisi.quantite = quantiteAAjouter;
produitChoisi.couleur = couleurDiv;

// Si quantité <1 OU couleur != i alors renvoie un message "Merci de bien vouloir choisir une option de couleur Et un quantité"
if (quantiteAAjouter < 1 || couleurDiv == "" ) 
  {
    console.log(quantiteAAjouter);
    console.log(couleurDiv);
    alert("Merci de bien vouloir renseigner une option couleur Et une Quantité! ");
  } 
  // SINON je récupère le panier (getItem) parsé (parse)
else {
        let panier = JSON.parse(localStorage.getItem("panier"));
        // je vérifie que je trouve la condition suivante : l'id dans le tableau est = à idUrl *ET* la couleur dans le tab. est = à celle à ajouter au panier.
         const produitEtCouleurDejaDansPanier = panier.find ((prod) => {return prod.id === idUrl && prod.couleur === couleurDiv;});
        // Si la Couleur ET L'id renvoie la valeur "indefine" c'est que la condition au dessus n'est pas vérifiée, alors ajoute un produit dans le LS.  
          if (produitEtCouleurDejaDansPanier===undefined ) 
          { panier.push(produitChoisi);console.log('Valeur de la variable produit.couleur déjà dans panier : ' + panier.couleur);} 
        //Sinon la condition id+couleur sont bien vérifiées, du coup incrémente la quantité du produit concerné de la quantité entrée dans le input.
          else {produitEtCouleurDejaDansPanier.quantite += quantiteAAjouter;}
          localStorage.setItem("panier", JSON.stringify(panier));
        
      }

        console.log('Valeur de la variable produitChoisi.couleur : ' + produitChoisi.couleur);
        
     
    })}


   
   /*let valeurmodifiee =  valeursInput.addEventListener('change',function()
    {
      
});

   for ( let input of valeursInput){
    console.log(input.value);
    

   
}*/

   /*function verificationPanierexistant() {
  const actionBouton = document.getElementById("addToCart");
  actionBouton.addEventListener('click',function()
    {
      const panier = localStorage.getItem("panier"); //Essayer d'accéder au local storage

      // Si le panier n'existe pas
      if (panier == null) {
      // Tu créé un nouveau tableau vide dans le localstorage
      localStorage.setItem("panier", JSON.stringify([]));
}
*/
   




    


    
// ***********     Fonctionnalité de calcul des TOTAUX     **************

  
  
  






       
        
    

 
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

// ******** FORMULAIRE ************* 