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
    //------------------image-------------
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
    const option = document.getElementById("colors");
    for (let i of product.colors){
       let option = document.createElement("option");
       colors.appendChild(option);
       option.value = i;
       option.text = i;
       console.log(i)
    }}


    //--Récupération des données du choix client depuis l'affichage écran .


