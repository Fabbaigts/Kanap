


//console.log(document.location) ///Affiche les options de windows.location

let params = new URLSearchParams(document.location.search); //
//console.log(document.location.search)///Affiche  l'id Brute dans la console
let idUrl = params.get("_id"); // Récupère l'id "_id" dans params et donne donne cette valeur à la variable "idUrl"
console.log(idUrl) // vérification de la valeur retournée dans la console


//------ Ecoute du chargement du DOM => Lance la fonction affichageProduit
document.addEventListener("DOMContentLoaded",affichageProduit())


//----------------------------FONCTION D'AFFICHAGE DU PRODUIT SUR LA PAGE --------------------------
async function  affichageProduit()
  {//récupération du produit concerné par l'affichage via l'APi ,grâce à son Id récupéré plus haut
    const res = await fetch("http://localhost:3000/api/products/"+idUrl)//attente d'une réponse de l'api concernant un id de produit.
    const product = await res.json(); //Attend d'avoir une réponse avant d'éxecuter le reste du code Si réponse ok de l'APi, donne la réponse en format Json.
    console.log(product)//Affiche la réponse dans la console
    //-------------------image-<img>-------------
    const imgProduit=document.getElementsByClassName("item__img")[0];//recupere div avec la class item_img
    const img=document.createElement("img");

    imgProduit.appendChild(img);// crée un element enfant "img" à la cible div class ="imgProduit"
    img.setAttribute("src",product.imageUrl) /*va cherche dans la const product qui correspon au json l'attribut imageUrl et incremente le dans src*/
    img.setAttribute("alt",product.altTxt) 
    console.log(img)
    //-------------------Titre-<p>----------------
    const titre = document.getElementById("title");
    titre.textContent= product.name;
    //-------------------Price-<p>---------------
    const prix = document.getElementById("price");
    prix.textContent= product.price;
    //-------------------Description-<p>--------------
    const description = document.getElementById("description");
    description.textContent= product.description;
    //-------------------Option-<option value>---------------
    
    for (let i of product.colors)
      {
         let option = document.createElement("option");
         colors.appendChild(option);
         option.value = i;
         option.text = i;
         console.log(i)
         
      }
      /* ----------------------------------------------------------------------------*/
      const AjoutPanier = document.getElementById("addToCart");
      let quantite = document.getElementById("quantity").value;
      console.log(quantite);

      AjoutPanier.addEventListener('click',function()
      {
          const colorValue = document.getElementById("colors").value;
          let quantite = parseInt(document.getElementById("quantity").value);
      
         
          let valArticle = 
         {
            id: idUrl, // idUrl est une constant déclarée au début lors de la récupértation de l'Id
            quantité: quantite, // Const quantity
            couleur: colorValue
         } 
          panier = [];
         // Si quantité <1 OU couleur != i alors renvoie un message "Merci de bien vouloir choisir une option de couleur Et un quantité"
          if ((quantite < 1) || (colorValue === "")) {console.log(quantite); console.log(colorValue);
           alert("Merci de bien vouloir renseigner une option couleur Et une Quantité! ")}

          else 
          {
            let testIdLs = localStorage.getItem (idUrl)
            if (testIdLs != null){
              testIdLs=JSON.parse(testIdLs);
              testIdLs.quantité += quantite;
              localStorage.setItem (idUrl,JSON.stringify(testIdLs))
            }
            else {
              localStorage.setItem (idUrl,JSON.stringify(valArticle))
            }

            /*panier.push(valArticle);//rajoute un élément article au tableau panier[]
            console.log("console.log de la variable article  push dans le tableau 'panier'",valArticle);
            remplissagelocalStorage(valArticle)*/

            console.log(valArticle.quantité);
            console.log(valArticle.couleur);  
          }
      })
  }

