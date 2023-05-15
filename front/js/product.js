const colorElt = document.querySelector("#colors");
const quantityElt = document.querySelector("#quantity");

let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

getArticle();

// Récupération des articles de l'API
function getArticle() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
      return res.json();
    })

    // Répartition des données de l'API dans le DOM
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
 *
 * @param {*} article
 */
function getPost(article) {
  console.log("1 => ", typeof article, article);

  // Insertion de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // Modification du titre "h1"
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // Modification du prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  // Modification de la description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  // Insertion des options de couleurs
  for (let colors of article.colors) {
    console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  document.querySelector("#addToCart").addEventListener("click",() => {
    addToCart(article);
  });


  //addToCart(article);
}
  //quantités de canapé, 1 canapé selectionné si non  défini
function getQuantity(quantity) {
  if (quantity <= 0 || quantity > 100) {
    quantity = 1;
    alert("La quantité devant être comprise entre 1 et 100, celle ci a été ajusté à 1");
  }
  return quantity;
}

//selection de  la  couleur de canapé rendu obligatoire
function checkColor(color) {
  if (color === "") {
    alert("Une couleur doit être choisie");
    return false;
  }
  return true;
}

//Gestion du panier
function addToCart(article) {
  let quantity = getQuantity(quantityElt.value);

  if (checkColor(colorElt.value)) {
    let color = colorElt.value;

    //Récupération des options de l'article à ajouter au panier
    let optionsProduit = {
      idProduit: idProduct,
      couleurProduit: color,
      quantiteProduit: Number(quantity),
      nomProduit: article.name,
      prixProduit: article.price,
      descriptionProduit: article.description,
      imgProduit: article.imageUrl,
      altImgProduit: article.altTxt,
    };

    //Initialisation du local storage
    let productLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (productLocalStorage) {
      const resultFind = productLocalStorage.find(
        (el) =>
          el.idProduit === idProduct && el.couleurProduit === color
      );
      //Si le produit commandé est déjà dans le panier
      if (resultFind) {
        let newQuantity =
          parseInt(optionsProduit.quantiteProduit) +
          parseInt(resultFind.quantiteProduit);
        resultFind.quantiteProduit = newQuantity;
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        window.location.href = "cart.html";
        //Si le produit commandé n'est pas dans le panier
      } else {
        productLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        window.location.href = "cart.html";
      }
      //Si le panier est vide
    } else {
      productLocalStorage = [];
      productLocalStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(productLocalStorage));
      console.table(productLocalStorage);
      window.location.href = "cart.html";
    }
  }
}
