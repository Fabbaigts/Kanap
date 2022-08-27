//************************************************
//***** 1 - Récupération de l'Id de l'URL*********
//************************************************

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
//** 2 - Vérification de l'existance d'une panier dans le LS *******
//******************************************************************

function verificationPanierexistant() {
  const actionBouton = document.getElementById("addToCart");
  // ECOUTE DU CLICK BOUTON
  actionBouton.addEventListener("click", function () {
    const panier = localStorage.getItem("panier");

    // Si le panier n'existe pas
    if (panier == null) {
      // Tu créé un nouveau tableau vide dans le localstorage
      localStorage.setItem("panier", JSON.stringify([]));
      injectionLS();
    } else {
      injectionLS();
    }
  });
}
//*****************************************************
//** 3 - FONCTION D'AFFICHAGE DU PRODUIT SUR LA PAGE **
//*****************************************************

async function affichageProduit() {
  //attente d'obtention de l'idUrl avant interrogation de l'APi.
  const res = await fetch("http://localhost:3000/api/products/" + idUrl);
  const product = await res.json(); //Attend d'avoir une réponse de l'API.

  //********* Affichage de l'IMAGE **********
  //recupere LE PREMIER ENFANT (childNodes: NodeList [0]) avec une div de la class item_img
  const imgProduit = document.getElementsByClassName("item__img")[0];
  const img = document.createElement("img");
  // crée un element enfant "img" à la cible div class ="imgProduit"
  imgProduit.appendChild(img);
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  //********* Affichage du TITRE H1  ***********
  const titre = document.getElementById("title");
  titre.textContent = product.name;

  //********* Affichage du PRIX  ***********
  const prix = document.getElementById("price");
  prix.textContent = product.price;

  //********* Affichage de la DESCRIPTION ***********
  const description = document.getElementById("description");
  description.textContent = product.description;

  //************************ 4 - AFFICHAGE DU CHOIX DES COULEURS ****************************
  //** Boucle ayant comme iteration le nombre de valeurs contenues dans le tableau [color] **
  //********* et permettant la création d'élément enfants de le div "option" ****************
  //*****************************************************************************************
  for (let i of product.colors) {
    let option = document.createElement("option");
    colors.appendChild(option);
    option.value = i;
    option.text = i;
  }
}
//***********************************************************************************
//***** 5 - Vérification du champ input par REGEX (eviter le champ vide Nan) ********
//***********************************************************************************

const regexInput = /([0-9\S]){1,}/;
let verif = "ok";
let ecouteChampQuantite = document.getElementById("quantity");
// ECOUTE DU CHAMP INPUT QUANTITY
ecouteChampQuantite.addEventListener("change", (input) => {
  if (input.target.value.match(regexInput)) {
    verif = "ok";
  } else {
    verif = "non ok";
  }
});

//***********************************************************************************************
//***** 6 - Fonction d'injection dans le tableau nommé "Panier" des objets "produitsChoisi" *****
//***********************************************************************************************

function injectionLS() {
  let panier = JSON.parse(localStorage.getItem("panier"));
  let couleurDiv = document.getElementById("colors").value;
  let quantiteAAjouter = parseInt(document.getElementById("quantity").value);
  produitChoisi.quantite = quantiteAAjouter;
  produitChoisi.couleur = couleurDiv;

  //***********************************************************************************
  //*********************** 6.1 - CAS DE REJETS D'INJECTION ***************************
  //***********************************************************************************

  if (
    // Si quantité <1 OU couleur != choix
    produitChoisi.quantite < 1 ||
    produitChoisi.couleur == null ||
    produitChoisi.couleur == "" ||
    verif == "non ok"
  ) {
    alert(
      "Merci de bien vouloir vérifier votre saisie. Une option couleur et une quantité valide (de 1 et 100) doit être saisie "
    );
  } else {
    //*********************  6.2 - CAS D'INJECTION ENVISAGES  *************************
    //***************** Vérification des conditions suivante : ************************
    //*************** l'ID  * ET * la COULEUR sont déjà dans le panier. ***************
    //***** SI NON alors la  const produitEtCouleurDejaDansPanier = undefined *********
    //***** SI OUI alors la const produitEtCouleurDejaDansPanier != undefined *********
    //*********************************************************************************

    const produitEtCouleurDejaDansPanier = panier.find((prod) => {
      return prod.id === idUrl && prod.couleur === couleurDiv;
    });

    //  AJOUT D'UN NOUVEAU  PRODUIT AU LS SI  PAS DE PRODUIT SIMILAIRE (undefined)
    if (produitEtCouleurDejaDansPanier === undefined) {
      panier.push(produitChoisi);
      localStorage.setItem("panier", JSON.stringify(panier));
      alert("Votre produit a bien été ajouté au panier. ");
    }
    //  SI QUANTITE > 100 mais PRODUIT NON PRESENT Ajoute la quantité MAXIMUM
    if (produitChoisi.quantite > 100) {
      alert("La quantité ne peut exceder 100 unités.");
      produitChoisi.quantite = 100;
      localStorage.setItem("panier", JSON.stringify(panier));
    }
    /**********************************************************************************/
    /******* 6.3 -  AJOUT DE QUANTITE SUR UN  PRODUIT DEJA EXISTANT DANS LE LS ********/
    /**********************************************************************************/

    // si le TOTAL AJOUTE DEPASSE LES 100 Unités
    if (
      produitEtCouleurDejaDansPanier != undefined &&
      produitEtCouleurDejaDansPanier.quantite + quantiteAAjouter > 100
    ) {
      console.log(produitChoisi.quantite);
      alert("Vous avez déjà le Maximum de 100 Unités dans votre panier !.");
      produitEtCouleurDejaDansPanier.quantite = 100;
      localStorage.setItem("panier", JSON.stringify(panier));
    }
    // si le TOTAL AJOUTE NE DEPASSE PAS LES 100 Unités Alors incrémente  de la quantité renseignée
    if (produitEtCouleurDejaDansPanier != undefined) {
      produitEtCouleurDejaDansPanier.quantite += quantiteAAjouter;
      localStorage.setItem("panier", JSON.stringify(panier));
      alert(
        "Votre NOUVELLE QUANTITE produit a bien été ajouté au panier de +" +
          produitChoisi.quantite
      );
    }
  }
}
