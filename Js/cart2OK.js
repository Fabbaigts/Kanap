//************************************************************************************************
//******** Déclaration des Variables globales nécessaires aux fonctionnalités de la page *********
//************************************************************************************************
// Création d'un tableau vide pour les Objets "produits" de la commande ultérieure.
let listeDeCommande = [];
// Récupération du panier du LS :

affichageDesProduits();

//************************************************************************************************
//***** BLOC DE Fonctionnalité permettant l'affichage des produits et leurs caractéristiques *****
//************************************************************************************************

async function affichageDesProduits() {
  let panierDuLs = await JSON.parse(localStorage.getItem("panier"));
  // lancement de la boucle qui parcours chaque objets du panier
  // la variable "produit" représente un produit dans le panier.

  if (panierDuLs == null || panierDuLs == "") {
    let newTitle = document.querySelector("h1");

    newTitle.innerHTML = `<h1>Mince, votre chariot est vide! </h1>`;

    let newArticle = document.querySelector("#cart__items");
    newArticle.innerHTML = `<section id="cart__items"> 
                                              <article class="cart__item" data-id="" data-color="">
                                                  <div class="cart__item__img">
                                                    <a href="http://127.0.0.1:5500/html/index.html">
                                                      <img src="/images/chariotvide.jpg" alt="chariot Vide!">
                                                      </a>
                                                  
                                              </article>
                                              <h2 class = "cart__item"> Cliquez sur le chariot pour commencer vos courses!</h2>
                                          </section>`;

    let zoneAffichageformulaire = document.querySelector(".cart__order");
    zoneAffichageformulaire.style.display = "none";
    let zoneAffichageTotaux = document.querySelector(".cart__price");
    zoneAffichageTotaux.style.display = "none";
  } else {
    for (let produit of panierDuLs) {
      fetch("http://localhost:3000/api/products/" + produit.id)
        .then((res) => {
          if (res.ok) {
            console.log(res);
            return res.json();
          }
        })
        .then((produitApi) => {
          listeDeCommande = [];

          let produitAjouteCommande = {};
          produitAjouteCommande.id = produit.id;
          produitAjouteCommande.img = produitApi.imageUrl;
          produitAjouteCommande.Nom = produitApi.name;
          produitAjouteCommande.description = produitApi.altTxt;
          produitAjouteCommande.couleur = produit.couleur;
          produitAjouteCommande.prix = produitApi.price;
          produitAjouteCommande.quantite = produit.quantite;

          listeDeCommande.push(produitAjouteCommande);

          //******Injection du produit dans le HTML du DOM************
          let newArticle = document.querySelector("#cart__items");
          newArticle.innerHTML += `<section id="cart__items"> 
                                             <article class="cart__item" data-id="${produitAjouteCommande.id}" data-color="${produitAjouteCommande.couleur}">
                                                <div class="cart__item__img">
                                                    <img src="${produitAjouteCommande.img}" alt="${produitApi.altTxt}">
                                                </div>
                                                <div class="cart__item__content">
                                                    <div class="cart__item__content__description">
                                                        <h2>${produitAjouteCommande.Nom}</h2>
                                                        <p>${produitAjouteCommande.couleur}</p>
                                                        <p>${produitAjouteCommande.prix}€</p>
                                                    </div>
                                                    <div class="cart__item__content__settings">
                                                        <div class="cart__item__content__settings__quantity">
                                                            <p>Qté : </p>
                                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
                                                            value="${produitAjouteCommande.quantite}">
                                                        </div>
                                                        <div class="cart__item__content__settings__delete">
                                                            <p class="deleteItem">Supprimer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </section>`;

          // Lancement des fonctions modificationQuantite(), suppressionArticle(), et calculDesTotaux().
          modificationQuantite();
          suppressionArticle();
          calculDesTotaux();
        })

        //Si pas de réponse de l'API, affiche le message d'erreur dans la console
        .catch((err) => {
          console.log("Une erreur est survenue" + err);
        });
    }
  }
}
function actualisationListeDeCommande() {
  setTimeout(function actualisationDuPanier() {
    console.log(listeDeCommande);

    for (let produit of panierDuLs) {
      fetch("http://localhost:3000/api/products/" + produit.id)
        .then((res) => {
          if (res.ok) {
            console.log(res);
            return res.json();
          }
        })
        .then((produitApi) => {
          listeDeCommande = [];

          let produitAjouteCommande = {};
          produitAjouteCommande.id = produit.id;
          produitAjouteCommande.img = produitApi.imageUrl;
          produitAjouteCommande.Nom = produitApi.name;
          produitAjouteCommande.description = produitApi.altTxt;
          produitAjouteCommande.couleur = produit.couleur;
          produitAjouteCommande.prix = produitApi.price;
          produitAjouteCommande.quantite = produit.quantite;

          listeDeCommande.push(produitAjouteCommande);

          modificationQuantite();
          suppressionArticle();
          calculDesTotaux();
        })

        //Si pas de réponse de l'API, affiche le message d'erreur dans la console
        .catch((err) => {
          console.log("Une erreur est survenue" + err);
        });
    }
  }, 50);
}

//*************************************************************************************
//************************** MODIFICATION DES QUANTITES *******************************
//*************************************************************************************

function modificationQuantite() {
  let panierDuLs = JSON.parse(localStorage.getItem("panier"));
  let champsQuantite = document.getElementsByClassName("itemQuantity");
  for (let inputQuantite of champsQuantite) {
    inputQuantite.addEventListener("change", (elementquichange) => {
      let idRecupDom = elementquichange.target
        .closest("article")
        .getAttribute("data-id");
      let couleurRecupDom = elementquichange.target
        .closest("article")
        .getAttribute("data-color");
      // fonction find pour trouver dans le LS l'id qui correspond à la valeur retournee idRecupDom et color
      let indexDuProduitAChanger = panierDuLs.findIndex(
        (indexPanier) =>
          indexPanier.id == idRecupDom && indexPanier.couleur == couleurRecupDom
      );
      if (
        inputQuantite.value == 0 ||
        inputQuantite.value == "null" ||
        inputQuantite.value >= 101
      ) {
        alert(
          "La quantité d'articles doit être supérieure à 0 et inférieure à 100!"
        );
        inputQuantite.value = 1;
        window.location.reload();
      } else {
        panierDuLs[indexDuProduitAChanger].quantite = parseInt(
          elementquichange.target.value
        );
        localStorage.setItem("panier", JSON.stringify(panierDuLs));
      }
      calculDesTotaux();
      suppressionArticle();
    });
  }
}
//*********************************************************************
// ***************** SUPPRESSION d'articles du panier *****************
//*********************************************************************

function suppressionArticle() {
  let boutonsSupprimer = document.getElementsByClassName("deleteItem");
  console.log(boutonsSupprimer); //=>Affiche dans la console un tableau des boutons supprimés trouvés dans le DOM
  let panierDuLs = JSON.parse(localStorage.getItem("panier"));
  for (let boutons of boutonsSupprimer) {
    boutons.addEventListener("click", (supprime) => {
      console.log(supprime.target);

      let idDuProduitSupprime = supprime.target
        .closest("article")
        .getAttribute("data-id"); /*retourne l'id dom*/
      let couleurDuProduitSupprime = supprime.target
        .closest("article")
        .getAttribute("data-color");

      // fonction find pour trouver dans le LS l'id qui correspond à la valeur retournee idquichange et color
      let indexDuProduitASupprimer = panierDuLs.findIndex(
        (x) =>
          x.id == idDuProduitSupprime && x.couleur == couleurDuProduitSupprime
      );
      console.log(panierDuLs[indexDuProduitASupprimer]);

      //https://www.delftstack.com/fr/howto/javascript/javascript-remove-from-array-by-value/#supprimer-un-%C3%A9l%C3%A9ment-d-un-tableau-par-valeur-%C3%A0-l-aide-de-la-fonction-filter-en-javascript
      //filtre qui garde tous les element n'ayant pas l'index concerné par la suppression

      var nouveauPanier = panierDuLs.filter(function (f) {
        return f !== panierDuLs[indexDuProduitASupprimer];
      });
      console.log(indexDuProduitASupprimer);
      console.log(nouveauPanier);

      //****** Suppression De tous les articles De L'AFFICHAGE ******
      let ProduitASupprimerDom =
        document.querySelectorAll("article.cart__item");
      console.log(ProduitASupprimerDom);
      for (let i of ProduitASupprimerDom) {
        i.remove();
      }

      //*************** effacement de l'ancien Panier Du LS  **********

      panierDuLs = [];
      console.log(panierDuLs);

      //*************** Reconstruction du Nouveau panier du LS  **********
      localStorage.setItem("panier", JSON.stringify(nouveauPanier));

      console.log(panierDuLs);

      // window.location.reload(); //rafraichis la page une fois la quantité changée
      //*************** Lancement de fonction de Ré_affichage du nouveau panier et calcul des totaux  **********

      calculDesTotaux();
      suppressionArticle();
      affichageDesProduits();
    });
  }
}

//***************************************************
//********* Fonction de CALCUL des totaux ***********
//***************************************************

async function calculDesTotaux() {
  let totalNombreArticle = 0;
  let prixTotalPanier = 0;
  let CalculpanierDuLs = await JSON.parse(localStorage.getItem("panier"));

  console.log(CalculpanierDuLs);

  for (let n of CalculpanierDuLs) {
    fetch("http://localhost:3000/api/products/" + n.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((recupPrixApi) => {
        prixProduit = recupPrixApi.price;

        /**/ let prixTotalLigneProduit = n.quantite * prixProduit;
        console.log(prixTotalLigneProduit);
        /**/ prixTotalPanier += prixTotalLigneProduit;
        console.log(prixTotalPanier);
        /**/ totalNombreArticle += n.quantite;

        let newSpanQuantity = document.getElementById("totalQuantity");
        let newSpanPrix = document.getElementById("totalPrice");
        /**/ newSpanQuantity.textContent = totalNombreArticle;
        /**/ newSpanPrix.textContent = prixTotalPanier;
      });

    ecouteDesInput();
  }
}

//******************************************************************************************************
//************************* Fonctions concernant le formulaire de commande  ****************************
//******************************************************************************************************

//****Définition des expressions régulières (RegExp)************

const regexPrenom = /^[A-Za-z]{3,}[A-Za-zéèôöàçêëù.,'-\s]*$/;
const regexNom = /^[A-Za-z]{3,}[A-Za-zéèôöàçêëù.,'-\s]*$/;
const regexAdresse = /^[A-Za-z0-9]{3,}[A-Za-zéèôöàçêëù.,'-\s]*$/;
const regexVille = /^[A-Za-z]{3,}[A-Za-zéèôöàçêëù.,'-\s]*$/;
const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//******** Création d'un objet "contact" Vide ********
let contact = {};

/******** Création d'un objet "formulaire" juste pour les besoin des tests Regex *********/
let formulaire = {};

/******** function de lancement des vérification des inputs *********/
function ecouteDesInput() {
  ecoutePrenom();
  ecouteNom();
  ecouteAdresse();
  ecouteVille();
  ecouteEmail();
}
//**************************************************************
//******** Validation RegEx du champ input "PRENOM" ************
//**************************************************************
function ecoutePrenom() {
  let champPrenom = document.getElementById("firstName");
  champPrenom.addEventListener("change", (prenom) => {
    if (prenom.target.value.match(regexPrenom)) {
      console.log("match ok");
      firstNameErrorMsg.innerHTML = "";
      contact.firstName = prenom.target.value;
      formulaire.prenom = regexPrenom.test(prenom.target.value);
    } else {
      formulaire.prenom = regexPrenom.test(prenom.target.value);
      console.log("le champ Prénom n'est pas conforme");
      firstNameErrorMsg.innerHTML =
        "Ce champ n'est pas Valide. Merci de le vérifier.";
    }
  });
}
//************************************************************
//********** Validation RegEx du champ input "NOM" ***********
//************************************************************
function ecouteNom() {
  let champNom = document.getElementById("lastName");
  champNom.addEventListener("change", (nom) => {
    if (nom.target.value.match(regexNom)) {
      console.log("match ok");
      lastNameErrorMsg.innerHTML = "";
      contact.lastName = nom.target.value;
      formulaire.nom = regexNom.test(nom.target.value);
    } else {
      formulaire.nom = regexNom.test(nom.target.value);
      console.log("le champ NOM n'est pas conforme");
      lastNameErrorMsg.innerHTML =
        "Ce champ n'est pas Valide. Merci de le vérifier.";
    }
  });
}
//****************************************************************
//********** Validation RegEx du champ input "Adresse" ***********
//****************************************************************
function ecouteAdresse() {
  let champAdresse = document.getElementById("address");
  console.log(champAdresse);

  champAdresse.addEventListener("change", (adresse) => {
    console.log(adresse.target.value);
    if (adresse.target.value.match(regexAdresse)) {
      console.log("match ok");
      addressErrorMsg.innerHTML = "";
      contact.address = adresse.target.value;
      formulaire.adresse = regexAdresse.test(adresse.target.value);
    } else {
      formulaire.adresse = regexAdresse.test(adresse.target.value);
      console.log("le champ Adresse n'est pas conforme");
      addressErrorMsg.innerHTML =
        "Ce champ n'est pas Valide. Merci de le vérifier.";
    }
  });
}
//************************************************************
//********** Validation RegEx du champ input "Ville" *********
//************************************************************

function ecouteVille() {
  let champVille = document.getElementById("city");
  console.log(champVille);

  champVille.addEventListener("change", (ville) => {
    if (ville.target.value.match(regexVille)) {
      console.log("match ok");
      cityErrorMsg.innerHTML = "";
      contact.city = ville.target.value;
      formulaire.ville = regexVille.test(ville.target.value);
    } else {
      console.log("le champ Ville n'est pas conforme");
      formulaire.ville = regexVille.test(ville.target.value);
      cityErrorMsg.innerHTML =
        "Ce champ n'est pas Valide. Merci de le vérifier.";
    }
  });
}

//************************************************************
//********** Validation RegEx du champ input "Email" *********
//************************************************************

function ecouteEmail() {
  let champEmail = document.getElementById("email");
  champEmail.addEventListener("change", (email) => {
    if (email.target.value.match(regexEmail)) {
      console.log("match ok");
      emailErrorMsg.innerHTML = "";
      contact.email = email.target.value;
      formulaire.email = regexEmail.test(email.target.value);
    } else {
      console.log("le champ Email n'est pas conforme");
      formulaire.email = regexEmail.test(email.target.value);
      emailErrorMsg.innerHTML =
        "Ce champ n'est pas Valide. Merci de le vérifier.";
    }
  });
}

//********************************************************************
// **** Conditions de confomité globale du formulaire avant envoi ****
//********************************************************************
let boutonCommander = document.getElementById("order");
boutonCommander.addEventListener("click", () => {
  if (
    formulaire.prenom != true ||
    formulaire.nom != true ||
    formulaire.adresse != true ||
    formulaire.ville != true ||
    formulaire.email != true
  ) {
    alert(
      "Le formulaire n'est pas encore conforme ou complet, merci de réessayer !"
    );
  } else {
    envoiDeLaCommande();
  }
});

//********************************************
// ****  Fonctions d'envoi de la commande ****
//********************************************
function envoiDeLaCommande() {
  //rappel de l'objet  {contact} attendu par l'APi
  const objetContactClient = contact;
  // Création du tableau d'ID des produits à partir du tableau "listeDeCommande"
  let produitsDeLaCommande = [];
  for (let element of listeDeCommande) {
    produitsDeLaCommande.push(element.Id);
  }
  //Création d'un objet contenant l'objet client et le tableau de produits
  const order = { products: produitsDeLaCommande, contact: objetContactClient };
  console.log(order.contact);
  console.log(order.products);
  // Connexion à l'APi , envoi de la commande et du contact et récupération du Numéro unique de commande avec injection dans l'URL
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(order),
  })
    .then(function (res) {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
    })
    .then(function (value) {
      //recupération des valeurs de retour et injection dans l'URL de la valeur "orderId"
      window.location = `..//html/confirmation.html?id=${value.orderId}`;
    })
    .catch(function (err) {
      alert("Une erreur est survenue!" + err);
    });
}
