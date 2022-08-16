//************************************************************************************************ 
//******** Déclaration des Variables globales nécessaires aux fonctionnalités de la page *********
//************************************************************************************************ 
let totalNombreArticle = 0; //initialisation du nombre total d'articles au chargement de la page
let prixTotalPanier = 0;//initialisation du Montant total en € au chargement de la page
let prixApi = {}; //Création d'un OBJET ayant pour valeur le prix d'un produit issu de l'API
let qtiteLS = {};//Création d'un OBJET ayant pour valeur la  quantité de produit issue du LS.
let idLS = {};
let totalPrixligneProduit = {};
let panierDuLs = JSON.parse(localStorage.getItem("panier"))//Récupération du panier du LS sous forme de Tableau.
if (panierDuLs == null || panierDuLs == "") {
      // Tu créé un nouveau tableau vide dans le localstorage
      localStorage.setItem("panier", JSON.stringify([]));
      alert("Votre panier est vide! Mais vous pouvez toujours le remplir!");
      document.location.href="http://127.0.0.1:5500/html/index.html";
    }

console.log(panierDuLs);
//************************************************************************************************ 


//************************************************************************************************ 
//***** BLOC DE Fonctionnalité permettant l'affichage des produits et leurs caractéristiques *****
//************************************************************************************************ 
affichageDesProduits(panierDuLs);
function affichageDesProduits(panierDuLs)
{
    // lancement de la boucle qui parcours chaque objets du panier
    // la variable "produit" représente un produit dans le panier.
    for (let produit of panierDuLs){
         console.log(produit.id);
         
         console.log(produit.quantite)
         
            // interrogation de l'api (fetch) concerant le produit parcouru
        fetch("http://localhost:3000/api/products/"+produit.id) 
        .then((res) => { 
                if (res.ok) 
                {console.log (res);
                return res.json();}
                }
            ) 
        .then((produitApi) => {
                 console.log(produitApi);  
                 prixApi = produitApi.price;// => insertion de la valeur "Prix" de l'api dans l'objet {prixApi} à la racine du document (hors boucle)
                 qtiteLS = produit.quantite //=> insertion de la valeur "quantite" du LS dans l'objet {qtite} à la racine du document (hors boucle)
                 idLS = produit.id//=> insertion de la valeur "id" du LS dans l'objet {idUrl} à la racine du document (hors boucle)
                //******Injection du produit dans le HTML du DOM************
                let newArticle = document.querySelector("#cart__items");
                newArticle.innerHTML += `<section id="cart__items"> 
                                             <article class="cart__item" data-id="${produit.id}" data-color="${produit.couleur}">
                                                <div class="cart__item__img">
                                                    <img src="${produit.image}" alt="${produit.altTxt}">
                                                </div>
                                                <div class="cart__item__content">
                                                    <div class="cart__item__content__description">
                                                        <h2>${produit.nom}</h2>
                                                        <p>${produit.couleur}</p>
                                                        <p>${prixApi}€</p>
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
                //***** Lancement des fonctions de calcul des totaux ET de modification des quantités*****
                totalPrixligneProduit = qtiteLS * prixApi;
                console.log ('total de la ligne :');
                console.log (totalPrixligneProduit);
               
                calculDesTotaux();
                modificationQuantite();
                suppressionArticle ();
           
            })
                //Sinon affiche le message d'erreur dans la console et son type
        .catch((err) =>{ console.log("Une erreur est survenue" + err) });
    }
}
//*************************************************** 
//********* Fonction de CALCUL des totaux ***********
//*************************************************** 

function calculDesTotaux(){
    let newSpanQuantity = document.getElementById("totalQuantity");
    let newSpanPrix = document.getElementById("totalPrice");
    /**///Verification des valeurs nécessaires dans la console
    /**/ console.log(qtiteLS);
    /**/ console.log(prixApi);
    /**/ console.log(idLS);
    /**//////////////////////////////////////////////
    /**///Calcul des totaux par "incrémentaion des valeurs de la boucle dans la fonction "affichageDesProduits()"
    /**/totalNombreArticle +=  qtiteLS ;
    /**/prixTotalPanier += totalPrixligneProduit 
    /**/newSpanQuantity.textContent = totalNombreArticle;
    /**/newSpanPrix.textContent = prixTotalPanier;
    /**//////////////////////////////////////////////
};

//*************************************************************************************
//*** Fonction concerant la modification des quantités ou la suppression d'articles ***
//*************************************************************************************
function modificationQuantite(){
    
    let champQuantite = document.getElementsByClassName ("itemQuantity");
    console.log(champQuantite);//=>Affiche dans la console un tableau des champs "itemQuantity" trouvés dans le DOM
            
    for (let inputQuantite of champQuantite) {
                inputQuantite.addEventListener('change',(elementquichange) =>{
                       
                        console.log(elementquichange.target);
/*retourne l'id dom*/   let idQuiChange = elementquichange.target.closest("article").getAttribute("data-id");
                        let couleurQuiChange = elementquichange.target.closest("article").getAttribute("data-color");
                        console.log(idQuiChange)
                        console.log("nouvelles valeurs de quantité détectée :");
                        console.log(inputQuantite.value);

                // fonction find pour trouver dans le LS l'id qui correspond à la valeur retournee idquichange et color
                    
                    let indexDuProduitAChanger = panierDuLs.findIndex(x => (x.id == idQuiChange) && (x.couleur == couleurQuiChange));
                    console.log(panierDuLs [indexDuProduitAChanger].quantite);
                    console.log (indexDuProduitAChanger.quantite);
                    if (inputQuantite.value == 0 || inputQuantite.value == "null") {
                    alert("La quantité d'articles doit être supérieure à 0 !");}
                    else  {panierDuLs [indexDuProduitAChanger].quantite = parseInt(elementquichange.target.value);
                    localStorage.setItem ("panier",JSON.stringify(panierDuLs));
                    console.log(elementquichange.target.value);};

                    window.location.reload(false);//rafraichis la page une fois la quantité changée
                    
                    
                })
        
    }
};




// ***************** Suppression d'articles du panier *****************


function suppressionArticle () {
    let boutonsSupprimer = document.getElementsByClassName ("deleteItem");
    console.log(boutonsSupprimer);//=>Affiche dans la console un tableau des boutons supprimés trouvés dans le DOM
            
    for (let boutons of boutonsSupprimer) {
                boutons.addEventListener('click',(supprime) =>{
                       
                        console.log(supprime.target);
/*retourne l'id dom*/   let idDuProduitSupprime = supprime.target.closest("article").getAttribute("data-id");
                        let couleurDuProduitSupprime = supprime.target.closest("article").getAttribute("data-color");
                        console.log(idDuProduitSupprime)
                        console.log(couleurDuProduitSupprime)
                       

                // fonction find pour trouver dans le LS l'id qui correspond à la valeur retournee idquichange et color
                    
                    let indexDuProduitASupprimer = panierDuLs.findIndex(x => (x.id == idDuProduitSupprime && x.couleur == couleurDuProduitSupprime));
                    console.log(panierDuLs [indexDuProduitASupprimer]);
                    
                // Suppression d'un objet d'un tableau avec la Technique filter() ( La technique avec slice supprimait tous les produits en dessous de celui selectionné!)
                //https://www.delftstack.com/fr/howto/javascript/javascript-remove-from-array-by-value/#supprimer-un-%C3%A9l%C3%A9ment-d-un-tableau-par-valeur-%C3%A0-l-aide-de-la-fonction-filter-en-javascript
                    var nouveauPanier = panierDuLs.filter(function(f){ return f !== panierDuLs [indexDuProduitASupprimer]});
                            console.log(indexDuProduitASupprimer);
                            console.log(nouveauPanier);
                    localStorage.setItem ("panier",JSON.stringify(nouveauPanier));
             
                    window.location.reload(false);//rafraichis la page une fois la quantité changée
                    
                    
                })
         
    }
    
};



//**********************************************************************
//********** Fonctions concernant le formulaire de commande  ***********
//**********************************************************************

//**********Construction d'objets d'expression régulières (RegExp)************/

const regexPrenomOk = /^[A-Za-z]{3,}[A-Za-zéèôöàçêëù.,'-\s]*$/;

/*regexAdresse accepte un minimum de trois caractères,
 il n'y a pas de limite max de caractères. 
 Les personnages peuvent inclure a-z, A-Z, 
 des alphabets, des espaces, des virgules(,), point(.), apostrophe ( ' ) 
 et le tiret(-) des symboles.*/

const regexAdresse = /^[0-9A-Za-zéèôöàçêëù.,'-\s]*$/;

const regexVille = /^[A-Za-z][A-Za-zéèôöàçêëù.,'-]*$/;

const regexEmail =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/******** Création d'un objet client Vide qui va *********
 ******** s'enrichir des données du formulaire   *********
 ******** en fonction de la validité de chaque   *********
 ********            champs écouté.              *********/

let client ={};

//************************* Validation RegEx PRENOM ***************************** 
ecoutePrenom()
function ecoutePrenom(){
    
    let champPrenom = document.getElementById ('firstName');
    console.log(champPrenom);
    
    champPrenom.addEventListener('change',(prenom) =>{
            console.log(prenom.target.value);
            
           if (prenom.target.value.match(regexPrenomOk)){
                console.log(champPrenom);
                console.log("match ok");
                firstNameErrorMsg.innerHTML='';
                
                client.prenom = prenom.target.value;
                console.log(client);
            }
            else if (champPrenom == "null") {firstNameErrorMsg.innerHTML='Merci de Saisir un minimum valide S.V. ';}
            else { 
                console.log(champPrenom);
                
                console.log("erreur");
                firstNameErrorMsg.innerHTML='Veuillez vérifier ce champ S.V.P';

            }
    })
}
//************************* Validation RegEx NOM ***************************** 
ecouteNom()
function ecouteNom(){
    
    let champNom = document.getElementById ('lastName');
    console.log(champNom);
    
    champNom.addEventListener('change',(nom) =>{
            console.log(nom.target.value);
            if (nom.target.value.match(regexPrenomOk)){
                console.log(champNom);
                console.log("match ok");
                lastNameErrorMsg.innerHTML='';
                client.nom = nom.target.value;
                console.log(client);
            }
            else {
                console.log(champNom);
                console.log("erreur");
                lastNameErrorMsg.innerHTML='Veuillez vérifier ce champ S.V.P';

            }
    })
}
//************************* Validation RegEx NOM ***************************** 
ecouteAdresse()
function ecouteAdresse(){
    
    let champAdresse = document.getElementById ('address');
    console.log(champAdresse);
    
    champAdresse.addEventListener('change',(adresse) =>{
            console.log(adresse.target.value);
            if (adresse.target.value.match(regexAdresse)){
                console.log(champAdresse);
                console.log("match ok");
                addressErrorMsg.innerHTML='';
                client.adresse = adresse.target.value;
                console.log(client);
            }
            else {
                console.log(champAdresse);
                console.log("erreur");
                addressErrorMsg.innerHTML='Veuillez vérifier ce champ S.V.P';

            }
    })
}
//************************* Validation RegEx Ville ***************************** 
ecouteVille()
function ecouteVille(){
    
    let champVille = document.getElementById ('city');
    console.log(champVille);
    
    champVille.addEventListener('change',(ville) =>{
            console.log(ville.target.value);
            if (ville.target.value.match(regexEmail)){
                console.log(champVille);
                console.log("match ok");
                cityErrorMsg.innerHTML='';
                client.ville = ville.target.value;
                console.log(client);
            }
            else {
                console.log(champVille);
                console.log("erreur");
                cityErrorMsg.innerHTML='Veuillez vérifier ce champ S.V.P';

            }
    })
}

//************************* Validation RegEx Ville ***************************** 
ecouteEmail()
function ecouteEmail(){
    
    let champEmail = document.getElementById ('email');
    console.log(champEmail);
    
    champEmail.addEventListener('change',(email) =>{
            console.log(email.target.value);
            if (email.target.value.match(regexEmail)){
                console.log(champEmail);
                console.log("match ok");
                emailErrorMsg.innerHTML='';
                client.email = email.target.value;
                console.log(client);
            }
            else {
                console.log(champEmail);
                console.log("erreur");
                emailErrorMsg.innerHTML='Veuillez vérifier ce champ S.V.P';

            }
    })
}


// ***************** Création de la clé "Client" dans Le LS ********************




