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

  //-------------------Option-<option value>---------------
  // Boucle ayant comme iteration le nombre de valeurs contenues dans le tableau [color]
  // et permettant la création d'élément enfants de le div "option" ayant comme valeur
  // le contenu des instances du tableau et comme decritpion text le contenu de l'instance de ce tableau.
  for (let i of product.colors) {
    let option = document.createElement("option");
    colors.appendChild(option);
    option.value = i;
    option.text = i;
    console.log(i);
  }
}
//*******************************************************************************************
//***** Fonction d'injection dans le tableau nommé "Panier" des objets "produitsChoisi" *****
//*******************************************************************************************

function injectionLS() {
  let couleurDiv = document.getElementById("colors").value;
  let quantiteAAjouter = parseInt(document.getElementById("quantity").value);
  produitChoisi.quantite = quantiteAAjouter;
  produitChoisi.couleur = couleurDiv;

  // Si quantité <1 OU couleur != i alors renvoie un message "Merci de bien vouloir choisir une option de couleur Et un quantité"
  if (quantiteAAjouter < 1 || couleurDiv == "") {
    console.log(quantiteAAjouter);
    console.log(couleurDiv);
    alert(
      "Merci de bien vouloir renseigner une option couleur Et une Quantité! "
    );
  } else if (quantiteAAjouter > 100) {
    console.log(produitChoisi.quantite);
    alert("La quantité ne peut exceder 100 unités.");
    produitChoisi.quantite = 100;
  } else {
    // SINON je vérifie que je trouve la condition suivante :
    // l'id dans le tableau est = à idUrl **ET** la couleur dans le tab. est = à celle à ajouter au panier.
    let panier = JSON.parse(localStorage.getItem("panier"));
    const produitEtCouleurDejaDansPanier = panier.find((prod) => {
      return prod.id === idUrl && prod.couleur === couleurDiv;
    });
    // Si la Couleur ET L'id renvoie la valeur "indefine" c'est que la condition au dessus n'est pas vérifiée,
    // alors ajoute un produit dans le LS.
    if (produitEtCouleurDejaDansPanier === undefined) {
      panier.push(produitChoisi);
      console.log(
        "Valeur de la variable produit.couleur déjà dans panier : " +
          panier.couleur
      );
      alert("Votre produit a bien été ajouté au panier. ");
      localStorage.setItem("panier", JSON.stringify(panier));
    }

    //Sinon la condition id+couleur sont bien vérifiées:
    // incrémente la quantité du produit concerné de la quantité entrée dans le input.
    else if (produitEtCouleurDejaDansPanier.quantite + quantiteAAjouter > 100) {
      console.log(produitChoisi.quantite);
      alert("Vous avez déjà le Maximum de 100 Unités dans votre panier !.");
      produitEtCouleurDejaDansPanier.quantite = 100;
    } else {
      produitEtCouleurDejaDansPanier.quantite += quantiteAAjouter;
      alert(
        "Votre produit a bien été ajouté au panier. pour une quantité totale de "
      );
      localStorage.setItem("panier", JSON.stringify(panier));
    }
  }

  console.log(
    "Valeur de la variable produitChoisi.couleur : " + produitChoisi.couleur
  );
}
