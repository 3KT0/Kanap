const colorElt = document.querySelector("#colors");
const quantityElt = document.querySelector("#quantity");

let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

/**
 * Récupération des articles de l'API
 * @param {number} idProduct - L'identifiant de l'article à récupérer.
 */
function getArticle() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
      return res.json();
    })

    /**
     * Répartition des données de l'API dans le DOM
     * @param {Object} resultatAPI - Les données de l'API récupérées.
     */
    .then(async function (resultatAPI) {
      article = await resultatAPI;
      console.table(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log("Erreur de la requête API");
    });
}

/**
 * Insère les informations d'un article dans le document HTML.
 * @param {Object} article - L'article dont les informations doivent être insérées.
 */
function getPost(article) {
  console.log("1 => ", typeof article, article);

  // Insère l'image de l'article dans le document HTML.
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // Modifie le titre de l'article dans le document HTML.
  let productName = document.getElementById("title");
  productName.innerText = article.name;

  // Modifie le prix de l'article dans le document HTML.
  let productPrice = document.getElementById("price");
  productPrice.innerText = article.price;

  // Modifie la description de l'article dans le document HTML.
  let productDescription = document.getElementById("description");
  productDescription.innerText = article.description;

  // Insère les options de couleur de l'article dans le document HTML.
  for (let colors of article.colors) {
    console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerText = colors;
  }
  // Ajoute un écouteur d'événement sur le bouton "Ajouter au panier".
  document.querySelector("#addToCart").addEventListener("click",() => {
    addToCart(article);
  });
}

/**
 * Récupère la quantité de canapé, 1 canapé sélectionné si non défini
 * 
 * @param {number} quantity - La quantité de canapé sélectionnée
 * @returns {number} - La quantité de canapé ajustée si nécessaire
 */
function getQuantity(quantity) {
  if (quantity <= 0 || quantity > 100) {
    quantity = 1;
    alert("La quantité devant être comprise entre 1 et 100, celle ci a été ajusté à 1");
  }
  return quantity;
}

/**
 * Vérifie si une couleur a été sélectionnée pour un canapé
 * 
 * @param {string} color - La couleur sélectionnée pour le canapé
 * @returns {boolean} Retourne true si une couleur a été sélectionnée, false sinon
 */
function checkColor(color) {
  if (color === "") {
    alert("Une couleur doit être choisie");
    return false;
  }
  return true;
}

/**
 * Ajoute un article au panier
 * 
 * @param {Object} article - L'article à ajouter au panier
 */
function addToCart(article) {
  let quantity = getQuantity(quantityElt.value);

  if (checkColor(colorElt.value)) {
    let color = colorElt.value;

    /**
     * Récupération des options de l'article à ajouter au panier
     */
    let productOptions = {
      idProduct: idProduct,
      productColor: color,
      productQuantity: Number(quantity),
      productName: article.name,
      productPrice: article.price,
      productDescription: article.description,
      productImg: article.imageUrl,
      altproductImg: article.altTxt,
    };

    /**
     * Initialisation du local storage
     */
    let productLocalStorage = JSON.parse(localStorage.getItem("produit"));

    /**
     * Si le panier comporte déjà au moins 1 article
     */
    if (productLocalStorage) {
      const resultFind = productLocalStorage.find(
        (el) =>
          el.idProduct === idProduct && el.productColor === color
      );

      /**
       * Si le produit commandé est déjà dans le panier
       */
      if (resultFind) {
        let newQuantity =
          parseInt(productOptions.productQuantity) +
          parseInt(resultFind.productQuantity);
        resultFind.productQuantity = newQuantity;
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        window.location.href = "cart.html";

        /**
         * Si le produit commandé n'est pas dans le panier
         */
      } else {
        productLocalStorage.push(productOptions);
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        window.location.href = "cart.html";
      }

      /**
       * Si le panier est vide
       */
    } else {
      productLocalStorage = [];
      productLocalStorage.push(productOptions);
      localStorage.setItem("produit", JSON.stringify(productLocalStorage));
      console.table(productLocalStorage);
      window.location.href = "cart.html";
    }
  }
}
getArticle();
