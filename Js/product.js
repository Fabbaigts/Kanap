//*******************************************
//*****Récupération de l'Id de l'URL*********
//*******************************************

let params = new URLSearchParams(document.location.search); //
let idUrl = params.get("_id");

// Création d'un variable Objet qui contiendra les élémente damndés (id, color, qtité)
let produitChoisi = { id: idUrl };

//  A  l'écoute du chargement du DOM => Lancement  la fonction affichageProduit
document.addEventListener(
  "DOMContentLoaded",
  verificationPanierexistant(),
  affichageProduit()
);

//******************************************************************
//* Vérification de l'existance d'une panier dans le Local Storage *
//******************************************************************

function verificationPanierexistant() {
  const actionBouton = document.getElementById("addToCart");
  actionBouton.addEventListener("click", function () {
    const panier = localStorage.getItem("panier"); //Essayer d'accéder au local storage

    // Si le panier n'existe pas
    if (panier == null) {
      // Tu créé un nouveau tableau vide dans le localstorage
      localStorage.setItem("panier", JSON.stringify([]));
    } else {
      injectionLS();
    }
  });
}
//*****************************************************
//**** FONCTION D'AFFICHAGE DU PRODUIT SUR LA PAGE ****
//*****************************************************

async function affichageProduit() {
  const res = await fetch("http://localhost:3000/api/products/" + idUrl); //attente d'obtention de l'idUrl avant interrogation de l'APi.
  const product = await res.json(); //Attend d'avoir une réponse de l'API.

  //********* Affichage de l'image ***********
  const imgProduit = document.getElementsByClassName("item__img")[0]; //recupere LE PREMIER ENFANT (childNodes: NodeList [0]) avec une div de la class item_img
  const img = document.createElement("img");
  imgProduit.appendChild(img); // crée un element enfant "img" à la cible div class ="imgProduit"
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  ///********* Affichage du titre H1  ***********
  const titre = document.getElementById("title");
  titre.textContent = product.name;

  //********* Affichage du PRIX  ***********
  const prix = document.getElementById("price");
  prix.textContent = product.price;

  //********* Affichage de la DESCRIPTION ***********
  const description = document.getElementById("description");
  description.textContent = product.description;

  //************************ AFFICHAGE DU CHOIX DES COULEURS *********************************
  // Boucle ayant comme iteration le nombre de valeurs contenues dans le tableau [color]
  // et permettant la création d'élément enfants de le div "option"
  //******************************************************************************************
  for (let i of product.colors) {
    let option = document.createElement("option");
    colors.appendChild(option);
    option.value = i;
    option.text = i;
    console.log(i);
  }
}
//*******************************************************************************************
//***** Fonction de vérification du champ input par REGEX (eviter le champ vide Nan) ********
//*******************************************************************************************

const regexInput = /([0-9\S]){1,}/;
let verif = "ok";
let ecouteChampQuantite = document.getElementById("quantity");
ecouteChampQuantite.addEventListener("change", (input) => {
  if (input.target.value.match(regexInput)) {
    console.log("match ok");
    verif = "ok";
  } else {
    console.log("le champ n'est pas conforme");
    verif = "non ok";
  }
});

//*******************************************************************************************
//***** Fonction d'injection dans le tableau nommé "Panier" des objets "produitsChoisi" *****
//*******************************************************************************************

function injectionLS() {
  let panier = JSON.parse(localStorage.getItem("panier"));
  let couleurDiv = document.getElementById("colors").value;
  let quantiteAAjouter = parseInt(document.getElementById("quantity").value);
  produitChoisi.quantite = quantiteAAjouter;
  produitChoisi.couleur = couleurDiv;

  //*****************************************************************************/
  //*********************** CAS DE REJETS D'INJECTION ***************************/
  //*****************************************************************************/

  if (
    // Si quantité <1 OU couleur != choix
    produitChoisi.quantite < 1 ||
    produitChoisi.couleur == null ||
    produitChoisi.couleur == "" ||
    verif == "non ok"
  ) {
    console.log(produitChoisi.quantite);
    console.log(produitChoisi.couleur);
    alert(
      "Merci de bien vouloir vérifier votre saisie. Une option couleur et une quantité valide (de 1 et 100) doit être saisie "
    );
  } else {
    /********************* CAS D'INJECTION ENVISAGES ******************************/
    //  vérifie que je trouve la condition suivante :
    // l'ID  * ET * la COULEUR sont déjà dans le panier.
    // SI NON alors la  const produitEtCouleurDejaDansPanier = undefined
    // SI OUI alors la const produitEtCouleurDejaDansPanier != undefined
    /******************************************************************************/

    const produitEtCouleurDejaDansPanier = panier.find((prod) => {
      return prod.id === idUrl && prod.couleur === couleurDiv;
    });
    console.log(produitEtCouleurDejaDansPanier);

    /*  AJOUT D'UN NOUVEAU  PRODUIT AU LS SI  PAS DE PRODUIT SIMILAIRE (undefined) */

    if (produitEtCouleurDejaDansPanier === undefined) {
      // Si la Couleur ET L'id renvoie la valeur "indefine", le panier ne contient donc pas l'article selectionné.
      panier.push(produitChoisi); // alors ajoute un produit dans le LS.
      console.log(
        "couleur ajoutee : " +
          produitChoisi.couleur +
          " / quantité ajoutée : " +
          produitChoisi.quantite
      );
      alert("Votre produit a bien été ajouté au panier. ");
      localStorage.setItem("panier", JSON.stringify(panier));
    }
    /*  SI QUANTITE > 100 mais PRODUIT NON PRESENT Ajoute la quantité MAXIMUM */
    if (produitChoisi.quantite > 100) {
      console.log(produitChoisi.quantite);
      alert("La quantité ne peut exceder 100 unités.");
      produitChoisi.quantite = 100;
      localStorage.setItem("panier", JSON.stringify(panier));
    }
    /**********************************************************************************/
    /***********   AJOUT DE QUANTITE SUR UN  PRODUIT DEJA EXISTANT DANS LE  LS ********/
    /**********************************************************************************/

    // si le TOTAL AJOUTE DEPASSE LES 100 Unités
    if (
      produitEtCouleurDejaDansPanier !=
      undefined && produitEtCouleurDejaDansPanier.quantite + quantiteAAjouter > 100
    ) {
      console.log(produitChoisi.quantite);
      alert("Vous avez déjà le Maximum de 100 Unités dans votre panier !.");
      produitEtCouleurDejaDansPanier.quantite = 100;
      localStorage.setItem("panier", JSON.stringify(panier));
    }
    // si le TOTAL AJOUTE NE DEPASSE PAS LES 100 Unités Alors incrémente  de la quantité renseignée
    if (produitEtCouleurDejaDansPanier !=
      undefined ) {
      produitEtCouleurDejaDansPanier.quantite += quantiteAAjouter; // incrémente la quantité du produit concerné
      alert(
        "Votre NOUVELLE QUANTITE produit a bien été ajouté au panier de +" +
          produitChoisi.quantite
      );
      console.log(
        "Votre NOUVELLE QUANTITE produit a bien été ajouté au panier de +" +
          produitChoisi.quantite
      );
      localStorage.setItem("panier", JSON.stringify(panier));
    }
  }
}
