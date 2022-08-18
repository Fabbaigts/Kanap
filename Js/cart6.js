//************************************************************************************************ 
//******** Déclaration des Variables globales nécessaires aux fonctionnalités de la page *********
//************************************************************************************************ 




let listeDeCommande = []; // Création d'un tableau vide prêt à reçevoir les Objets "produits" de la commande ultéieure.


let panierDuLs = JSON.parse(localStorage.getItem("panier"))//Récupération du panier du LS sous forme de Tableau.
if (panierDuLs == null || panierDuLs == "") {
let newTitle = document.querySelector("h1");

newTitle.innerHTML = `<h1>Mince, votre chariot est vide! </h1>
`


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


let zoneAffichageformulaire = document.querySelector ('.cart__order');(zoneAffichageformulaire).style.display = "none";
let zoneAffichageTotaux = document.querySelector ('.cart__price');(zoneAffichageTotaux).style.display = "none";

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

                 nomApi = produitApi.name;
                 imageApi = produitApi.imageUrl;
                 prixApi = produitApi.price;
                 idApi = produitApi._id
                 qtiteLS = produit.quantite 
                 idLS = produit.id

                 //******Injection du produit dans le HTML du DOM************
             
                let newArticle = document.querySelector("#cart__items");
                newArticle.innerHTML += `<section id="cart__items"> 
                                             <article class="cart__item" data-id="${idApi}" data-color="${produit.couleur}">
                                                <div class="cart__item__img">
                                                    <img src="${imageApi}" alt="${produitApi.altTxt}">
                                                </div>
                                                <div class="cart__item__content">
                                                    <div class="cart__item__content__description">
                                                        <h2>${nomApi}</h2>
                                                        <p>${produit.couleur}</p>
                                                        <p>${prixApi}€</p>
                                                    </div>
                                                    <div class="cart__item__content__settings">
                                                        <div class="cart__item__content__settings__quantity">
                                                            <p>Qté : </p>
                                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
                                                            value="${qtiteLS}">
                                                        </div>
                                                        <div class="cart__item__content__settings__delete">
                                                            <p class="deleteItem">Supprimer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </section>`;

                                        let produitAjouteCommande = {};
                produitAjouteCommande.Nom = produitApi.name;
                produitAjouteCommande.Id = produit.id;  
                produitAjouteCommande.couleur = produit.couleur;  
                produitAjouteCommande.prix = prixApi;
                 produitAjouteCommande.quantite = produit.quantite;
                              listeDeCommande.push (produitAjouteCommande);
                
                   
                                        modificationQuantite();
                                        suppressionArticle ();
                                        calculDesTotaux();
                                        

            })
                //Sinon affiche le message d'erreur dans la console et son type
        .catch((err) =>{ console.log("Une erreur est survenue" + err) });
    }
}
console.log(listeDeCommande);
//*************************************************************************************
//*** Fonction concerant la modification des quantités ou la suppression d'articles ***
//*************************************************************************************
function modificationQuantite(){
    
    let champsQuantite = document.getElementsByClassName ("itemQuantity");
        console.log(champsQuantite);//=>Affiche dans la console un tableau des champs "itemQuantity" trouvés dans le DOM
            
    for (let inputQuantite of champsQuantite) {
                inputQuantite.addEventListener('change',(elementquichange) =>{
                            console.log(elementquichange.target);
                    let idRecupDom = elementquichange.target.closest("article").getAttribute("data-id");
                    let couleurRecupDom = elementquichange.target.closest("article").getAttribute("data-color");
                            console.log(idRecupDom)
                            console.log("nouvelles valeurs de quantité détectée :");
                            console.log(inputQuantite.value);

                    // fonction find pour trouver dans le LS l'id qui correspond à la valeur retournee idRecupDom et color
                    
                    let indexDuProduitAChanger = panierDuLs.findIndex(indexPanier => (indexPanier.id == idRecupDom) && (indexPanier.couleur == couleurRecupDom));
                            console.log(panierDuLs [indexDuProduitAChanger].quantite);
                            console.log (indexDuProduitAChanger.quantite);
                    if (inputQuantite.value == 0 || inputQuantite.value == "null" || inputQuantite.value >= 101 ) {
                    alert("La quantité d'articles doit être supérieure à 0 et inférieure à 100!");
                    inputQuantite.value = 1;window.location.reload();
                    }
                    else  {
                    panierDuLs [indexDuProduitAChanger].quantite = parseInt(elementquichange.target.value);
                    localStorage.setItem ("panier",JSON.stringify(panierDuLs));
                            console.log(elementquichange.target.value);
                    listeDeCommande  [indexDuProduitAChanger].quantite = parseInt(elementquichange.target.value);
                    localStorage.setItem ("panier",JSON.stringify(panierDuLs));
                            console.log(elementquichange.target.value)};
                    // et modifie la quantité dans le tableau  listeDeCommande 


                //réinitialisation de l'affichage du panier 
                        
                         

                    //window.location.reload(false);//rafraichis la page une fois la quantité changée

                    constitutionCommande();
                    calculDesTotaux();
                    
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
                    let idDuProduitSupprime = supprime.target.closest("article").getAttribute("data-id");/*retourne l'id dom*/ 
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
                    constitutionCommande();
                    calculDesTotaux();
                })
            }
    
};

//*************************************************** 
//********* Fonction de CALCUL des totaux ***********
//*************************************************** 

function calculDesTotaux(articles){
    let totalNombreArticle = 0;
    let prixTotalPanier = 0;
    
    let newSpanQuantity = document.getElementById("totalQuantity");
    let newSpanPrix = document.getElementById("totalPrice");
    for(let produit of listeDeCommande){ 
        let prixTotalLigneProduit = produit.quantite * produit.prix;
        console.log(prixTotalLigneProduit);


        /**/prixTotalPanier += prixTotalLigneProduit;
        console.log(prixTotalPanier);
        /**/totalNombreArticle +=  produit.quantite ;
            /**/newSpanQuantity.textContent = totalNombreArticle;
            /**/newSpanPrix.textContent = prixTotalPanier;
           
        
        }
        ecouteDesInput()
            
};


//****************************************************************************************** */
function constitutionCommande(lignesArticles) {



};

//******************************************************************************************* */




//**********************************************************************
//********** Fonctions concernant le formulaire de commande  ***********
//**********************************************************************

//**********Construction d'objets d'expression régulières (RegExp)************/

const regexPrenom = /^[A-Za-z]{3,}[A-Za-zéèôöàçêëù.,'-\s]*$/;

const regexNom = /^[A-Za-z]{3,}[A-Za-zéèôöàçêëù.,'-\s]*$/;
/*regexAdresse accepte un minimum de trois caractères,
 il n'y a pas de limite max de caractères. 
 Les personnages peuvent inclure a-z, A-Z, 
 des alphabets, des espaces, des virgules(,), point(.), apostrophe ( ' ) 
 et le tiret(-) des symboles.*/

const regexAdresse =/^[A-Za-z0-9]{3,}[A-Za-zéèôöàçêëù.,'-\s]*$/;

const regexVille = /^[A-Za-z]{3,}[A-Za-zéèôöàçêëù.,'-\s]*$/;

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


/******** Création d'un objet "contact" Vide qui va *********
 ******** s'enrichir des données du formulaire   *********
 ******** en fonction de la validité de chaque   *********
 ********            champs écouté.              *********/

let contact ={};
/******** Création d'un objet "formulair" pour les besoin des tests Regex *********/
let formulaire = {};

function ecouteDesInput() {
ecoutePrenom();
ecouteNom();
ecouteAdresse();
ecouteVille();
ecouteEmail();

};


//************************* Validation RegEx PRENOM ***************************** 

function ecoutePrenom(){
    
    let champPrenom = document.getElementById ('firstName');
    console.log(champPrenom);
    
    champPrenom.addEventListener('change',(prenom) =>{
            console.log(prenom.target.value);
            
           if (prenom.target.value.match(regexPrenom)){
                console.log(champPrenom);
                (champPrenom).style.backgroundColor = "rgb(209, 255, 222)";
                console.log("match ok");
                firstNameErrorMsg.innerHTML='';
                contact.prenom = prenom.target.value;
                console.log(contact);
                formulaire.prenom = regexPrenom.test(prenom.target.value);
                console.log(formulaire);
                
                
            }
            
            else { 
                console.log(champPrenom);
                formulaire.prenom = regexPrenom.test(prenom.target.value);
                console.log("le champ Prénom n'est pas conforme");
                firstNameErrorMsg.innerHTML="Ce champ n'est pas Valide. Merci de le vérifier.";
                (champPrenom).style.backgroundColor = "pink"; 
                
            }
    })
}
//************************* Validation RegEx NOM ***************************** 

function ecouteNom(){
    
    let champNom = document.getElementById ('lastName');
    console.log(champNom);
    
    champNom.addEventListener('change',(nom) =>{
            console.log(nom.target.value);
            if (nom.target.value.match(regexNom)){
                console.log(champNom);
                (champNom).style.backgroundColor = "rgb(209, 255, 222)";
                console.log("match ok");
                lastNameErrorMsg.innerHTML='';
                contact.nom = nom.target.value;
                console.log(contact);
                formulaire.nom = regexNom.test(nom.target.value);
                console.log(formulaire);
              
            }
              
            else {
                console.log(champNom);
                formulaire.nom = regexNom.test(nom.target.value);
                console.log("le champ NOM n'est pas conforme");
                lastNameErrorMsg.innerHTML="Ce champ n'est pas Valide. Merci de le vérifier.";
                (champNom).style.backgroundColor = "pink";
                
            }
    })
}
//************************* Validation RegEx NOM ***************************** 

function ecouteAdresse(){
    
    let champAdresse = document.getElementById ('address');
    console.log(champAdresse);
    
    champAdresse.addEventListener('change',(adresse) =>{
            console.log(adresse.target.value);
            if (adresse.target.value.match(regexAdresse)){
                console.log(champAdresse);
                (champAdresse).style.backgroundColor = "rgb(209, 255, 222)";
                console.log("match ok");
                addressErrorMsg.innerHTML='';
                contact.adresse = adresse.target.value;
                console.log(contact);
                formulaire.adresse = regexAdresse.test(adresse.target.value);
                console.log(formulaire);
                
              
            }
            else {
                console.log(champAdresse);
                formulaire.adresse = regexAdresse.test(adresse.target.value);
                console.log("le champ Adresse n'est pas conforme");
                addressErrorMsg.innerHTML="Ce champ n'est pas Valide. Merci de le vérifier.";
                (champAdresse).style.backgroundColor = "pink";
               
             }
    })
}
//************************* Validation RegEx Ville ***************************** 

function ecouteVille(){
    
    let champVille = document.getElementById ('city');
    console.log(champVille);
    
    champVille.addEventListener('change',(ville) =>{
            console.log(ville.target.value);
            if (ville.target.value.match(regexVille)){
                console.log(champVille);
                (champVille).style.backgroundColor = "rgb(209, 255, 222)";
                console.log("match ok");
                cityErrorMsg.innerHTML='';
                contact.ville = ville.target.value;
                console.log(contact);
                formulaire.ville = regexVille.test(ville.target.value);
                console.log(formulaire);
               
            
            }
            else {
                console.log(champVille);
                console.log("le champ Ville n'est pas conforme");
                formulaire.ville = regexVille.test(ville.target.value);
                cityErrorMsg.innerHTML="Ce champ n'est pas Valide. Merci de le vérifier.";
                (champVille).style.backgroundColor = "pink"; 
              
            }
    })
}

//************************* Validation RegEx Ville ***************************** 

function ecouteEmail(){
    
    let champEmail = document.getElementById ('email');
    console.log(champEmail);
    (champEmail).style.backgroundColor = "gey";
    champEmail.addEventListener('change',(email) =>{
            console.log(email.target.value);
           
            
            if (email.target.value.match(regexEmail)){
                console.log(email.target.value);
                (champEmail).style.backgroundColor = "rgb(209, 255, 222)";
                console.log("match ok");
                emailErrorMsg.innerHTML='';
                contact.email = email.target.value;
                console.log(contact);
                console.log (regexEmail.test(email.target.value));
                formulaire.email = regexEmail.test(email.target.value);
                console.log(formulaire);
                console.log(formulaire.email);
                

            }
            else {
                console.log(champEmail);
                console.log("le champ Email n'est pas conforme");
                console.log (regexEmail.test(email.target.value));
                formulaire.email = regexEmail.test(email.target.value);
                emailErrorMsg.innerHTML="Ce champ n'est pas Valide. Merci de le vérifier.";
             (champEmail).style.backgroundColor = "pink"; 
             console.log(formulaire.email);
             

            }
    })
}
// *****************************  Ecoute de la confomité globale du formulaire avant envoi ***************************
    let boutonCommander = document.getElementById ('order');
    boutonCommander.addEventListener('click',(commander) =>{
      if (formulaire.prenom != true || formulaire.nom != true || formulaire.adresse != true || formulaire.ville != true || formulaire.email != true )
         {alert("Le formulaire n'est pas encore conforme ou complet, merci de réessayer !");
        alert("Le formulaire va se réinitialiser!");
         
        }
         else {
       
         console.log("Merci!");
          envoiDeLaCommande();}
           alert("Merci!");
        
    });



// *****************************  Fonctions d'envoi de la commande ***************************
function envoiDeLaCommande(){
    
        
    //rappel de l'objet  {contact} attendu par l'APi construit au fure et à mesure  du remplissage des champs du formulaire
    const objetContactClient = (contact) ;
    console.log (contact);
    // Création du tableau d'ID des produits à partir du tableau "listeDeCommande" créé au début de la page et modifié en fonction des suppressions.
    let products = [];
    for (let element of listeDeCommande){
        products.push(element.Id);
    }
    console.log (products);
    
    
    
    
    
    /******* a retirer *********/localStorage.setItem("contact", JSON.stringify(objetContactClient));
    
  
};


/*Validation des données Pour les routes POST, l’objet CONTACT envoyé au serveur doit contenir les champs 
firstName, lastName, address, city et email. 
Le tableau des produits envoyé au back-end doit être un array de strings product-ID. 
Les types de ces champs et leur présence doivent être validés avant l’envoi des données au serveur.*/

        
     
    
console.log(contact);
