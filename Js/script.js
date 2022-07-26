//**************************************************************************
//*** 1 - Interrogation de l'APi sur l'existance d'un fichier "products" ***
//**************************************************************************

// Appel vers l'API pour la récupération des données du fichier produits

fetch("http://localhost:3000/api/products")
  // Si le fichier cible est trouvé, (res.ok) retourne les informations en format JSON.
  .then(function (res) {
    if (res.ok) {
      console.log(res);
      return res.json();
    }
  })
  .then(function (catalogue) {
    // Lance la fonction "affichageProd" permettant l'affichage des produits du fichier JSON
    affichageProd(catalogue);
  })

  .catch(function (err) {
    console.log("Une erreur est survenue" + err);
  });

//*******************************************************************
//*** 2 - Fonction d'affichage du catalogue sur la page d'accueil ***
//*******************************************************************

function affichageProd(catalogue) {
  // cible de la div dans laquelle afficher les produits récupérés
  let newArticle = document.querySelector("#items");
  /*boucle pour chaque instance du catalogue sans indice précis*/
  for (let i of catalogue) {
    console.log("Nouvel article détecté dans le fichier JSON:  " + i.name);

    const lien = document.createElement("a");
    lien.href = `./product.html?_id=${i._id}`;

    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = `${i.imageUrl}`;
    img.alt = `${i.altTxt}`;

    const titre = document.createElement("h3");
    titre.textContent = `${i.name}`;

    const par = document.createElement("p");
    par.textContent = `${i.description}`;

    lien.appendChild(article);
    article.append(img, titre, par);

    newArticle.appendChild(lien);
  }
}
