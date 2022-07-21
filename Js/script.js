fetch("http://localhost:3000/api/products") // Appel vers l'API pour la récupération des données du fichier produits
//Alors, Si le fichier cible est trouvé, (res.ok) retourne les informations en format JSON.
.then
  (function (res)
    { if (res.ok) 
      {console.log (res);
        return res.json();
      }
    }
  )

    /*Ce résultat json étant lui aussi une Promise,
    nous le retournons et récupérons sa vraie valeur
    dans la fonction then() suivante, ayant comme paramètre 'catalogue'*/
.then
  (function (catalogue) 
    {
      console.log(catalogue); //Affichage dans la console du contenu de JSON
      affichageProd(catalogue); // Lance la fonction "affichageProd" permettant l'affichage des produits du fichier JSON
    }
  )
    //Sinon affiche le message d'erreur dans la console et son type
.catch
  (function (err) 
    {
    console.log("Une erreur est survenue" + err);
    }
  );

/* Fonction d'affichage du catalogue sur la page d'accueil 
(appelée plus haut dans le .then du fetch)*/

function affichageProd(catalogue)
{let newArticle = document.querySelector("#items"); // cible de la div dans laquelle afficher les produits récupérés
  /*boucle pour chaque instance du catalogue sans indice précis*/
  for (let i of catalogue)
  {
      //Affiche dans la console le "nom, name" de chaque instance de champ détecté.
    console.log("Nouvel article détecté dans le fichier JSON:  " + i.name);
      /* Insertion dans le DOM de code HTML (innerHTML) de chaque article contenu dans le fichier JSON.
      1- le lien <a> vers une Url écrite grâce à l'id du tableau et spécifique au produit.
      2- l'image du produit grâce à la valeur $imageUrl et la description "alt" $altTxt.
      3- Le TITRE du produit (en H3) grâce à $name.
      4- La description du produit dans un <p> de classe productDecription grâce à $description
      5-  la valeur $Price du produit dans un <p> de class "productPrice"
      */
   /*  newArticle.innerHTML += 
      `<a href="./product.html?_id=${i._id}"> 
        <article>
          <img src="${i.imageUrl}" alt="${i.altTxt}">
          <h3 class="productName">${i.name}</h3>
          <p class="productDescription">${i.description}</p>
          <p class="productPrice">à partir de ${i.price}€</p>
        </article>
      </a>`;*/
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
        par2.textContent=`${i.price}`;

      lien.appendChild(article);
      article.append(img,titre,par,par2)


      newArticle.appendChild(lien);
  }
}