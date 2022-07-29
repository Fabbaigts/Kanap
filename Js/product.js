//console.log(document.location) ///Affiche les options de windows.location

let params = new URLSearchParams(document.location.search); //
//console.log(document.location.search)///Affiche  l'id Brute dans la console
let idUrl = params.get("_id"); // Récupère l'id "_id" dans params et donne donne cette valeur à la variable "idUrl"
console.log(idUrl) // vérification de la valeur retournée dans la console


//------ Ecoute du chargement du DOM => Lance la fonction affichageProduit
document.addEventListener("DOMContentLoaded",affichageProduit(),verificationPanierexistant())


//----------------------------FONCTION D'AFFICHAGE DU PRODUIT SUR LA PAGE --------------------------
async function  affichageProduit()
  {//récupération du produit concerné par l'affichage via l'APi ,grâce à son Id récupéré plus haut
    const res = await fetch("http://localhost:3000/api/products/"+idUrl)//attente d'une réponse de l'api concernant un id de produit.
    const product = await res.json(); //Attend d'avoir une réponse avant d'éxecuter le reste du code Si réponse ok de l'APi, donne la réponse en format Json.
    console.log(product)//Affiche la réponse du produit recherhcé dans la console
    //-------------------image-<img>-------------
    const imgProduit=document.getElementsByClassName("item__img")[0];//recupere LE PREMIER ENFANT (childNodes: NodeList []) avec une div de la class item_img
    const img=document.createElement("img");

    imgProduit.appendChild(img);// crée un element enfant "img" à la cible div class ="imgProduit"
    img.setAttribute("src",product.imageUrl) /*va cherche dans la const product qui correspon au json l'attribut imageUrl et incremente le dans src*/
    img.setAttribute("alt",product.altTxt) 
    console.log(img)
    //-------------------Titre-<h1>----------------
    const titre = document.getElementById("title");
    titre.textContent= product.name;
    //-------------------Price-<p>---------------
    const prix = document.getElementById("price");
    prix.textContent= product.price;
    //-------------------Description-<p>--------------
    const description = document.getElementById("description");
    description.textContent= product.description;
    //-------------------Option-<option value>---------------
    //Boucle ayant comme iteration le nombre de valeurs contenues dans le tableau [color] 
    //et permettant la création d'élément enfants de le div "option" ayant comme valeur le contenu des instances du tableau
    // et comme decritpion text le contenu de l'instance de ce tableau.
    for (let i of product.colors)
      {
         let option = document.createElement("option");
         colors.appendChild(option);
         option.value = i;
         option.text = i;
         console.log(i)
         
      }
  }


// # 1. Etape 1 : Etre sure de toujours avoir un tableau dans le local storage

    // L'idée c'est d'avoir un tableau `panier` dans le localStorage
    // Pour être sure que tu as toujours un tableau panier dans ton local storage
    // A chaque chargement de page tu vérifie s'il y a un tableau
function verificationPanierexistant() {
  const actionBouton = document.getElementById("addToCart");
  actionBouton.addEventListener('click',function()
    {
      const panier = localStorage.getItem("panier"); //Essayer d'accéder au local storage

      // Si le panier n'existe pas
      if (panier == null) {
      // Tu créé un nouveau tableau vide dans le localstorage
      localStorage.setItem("panier", JSON.stringify([]));
}

   
// Ajout 

let couleurDiv = document.getElementById("colors").value;
let quantiteAAjouter = parseInt(document.getElementById("quantity").value);
// Quand tu as ton objet qui ressemble à ceci
let produitChoisi = {
  id: idUrl, // idUrl est une constant déclarée au début lors de la récupértation de l'Id
  quantite: quantiteAAjouter, // Const quantity
  couleur: couleurDiv,
};

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

