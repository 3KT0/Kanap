/**
 * Initialisation du local storage
 * @type {Array}
 */
let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(productLocalStorage);

/**
 * Element HTML où les items seront affichés
 * @type {HTMLElement}
 */
const positionEmptyCart = document.querySelector("#cart__items");

/**
 * Récupération des coordonnées du formulaire client
 * @type {HTMLInputElement}
 */
const firstNameElt = document.getElementById("firstName");
const lastNameElt = document.getElementById("lastName");
const adressElt = document.getElementById("address");
const cityElt = document.getElementById("city");
const mailElt = document.getElementById("email");

/**
 * Création des expressions régulières
 * @type {RegExp}
 */
const charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
console.log(firstNameElt);

/**
 *  Si le panier est vide
 */
function getCart() {
  if (productLocalStorage === null || productLocalStorage == 0) {
    positionEmptyCart.innerText = `Votre panier est vide`;
  } else {
    for (let produit in productLocalStorage) {
      /**
       * Insertion de l'élément "article"
       * @type {HTMLElement}
       */
      let productArticle = document.createElement("article");
      productArticle.className = "cart__item";
      productArticle.setAttribute(
        "data-id",
        productLocalStorage[produit].idProduct
      );
      document.querySelector("#cart__items").appendChild(productArticle);

      /**
       *  Insertion de l'élément "div"
       * @type {HTMLElement}
       */
      let productDivImg = document.createElement("div");
      productDivImg.className = "cart__item__img";
      productArticle.appendChild(productDivImg);

      /**
       * Insertion de l'image
       * @type {HTMLImageElement}
       */
      let productImg = document.createElement("img");
      productImg.src = productLocalStorage[produit].productImg;
      productImg.alt = productLocalStorage[produit].altproductImg;
      productDivImg.appendChild(productImg);

      /**
       * Insertion de l'élément "div"
       * @type {HTMLElement}
       */
      let productItemContent = document.createElement("div");
      productItemContent.className = "cart__item__content";
      productArticle.appendChild(productItemContent);

      /**
       * Insertion de l'élément "div"
       * @type {HTMLElement}
       */
      let productItemContentTitlePrice = document.createElement("div");
      productItemContentTitlePrice.className = "cart__item__content__titlePrice";
      productItemContent.appendChild(productItemContentTitlePrice);

      /**
       * Insertion du titre h2
       * @type {HTMLHeadingElement}
       */
      let productTitle = document.createElement("h2");
      productTitle.innerText = productLocalStorage[produit].productName;
      productItemContentTitlePrice.appendChild(productTitle);

      /**
       * Insertion de la couleur
       * @type {HTMLParagraphElement}
       */
      let productColor = document.createElement("p");
      productColor.innerText = productLocalStorage[produit].productColor;
      productColor.style.fontSize = "20px";
      productTitle.appendChild(productColor);

      /**
       * Insertion du prix
       * @type {HTMLParagraphElement}
       */
      let productPrice = document.createElement("p");
      productPrice.innerText = productLocalStorage[produit].productPrice + " €";
      productItemContentTitlePrice.appendChild(productPrice);

      /**
       * Insertion de l'élément "div"
       * @type {HTMLElement}
       */
      let productItemContentSettings = document.createElement("div");
      productItemContentSettings.className = "cart__item__content__settings";
      productItemContent.appendChild(productItemContentSettings);

      /**
       * Insertion de l'élément "div"
       * @type {HTMLElement}
       */
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
      productItemContentSettings.appendChild(productItemContentSettingsQuantity);

      /**
       * Insertion de "Qté : "
       * @type {HTMLParagraphElement}
       */
      let productQte = document.createElement("p");
      productQte.innerText = "Qté : ";
      productItemContentSettingsQuantity.appendChild(productQte);

      /**
       * Insertion de la quantité
       */
      let productQuantity = document.createElement("input");
      productQuantity.value = productLocalStorage[produit].productQuantity;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");
      productItemContentSettingsQuantity.appendChild(productQuantity);

      /**
       * Insertion de l'élément "div"
       */
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
      productItemContentSettings.appendChild(productItemContentSettingsDelete);

      /**
       * Insertion de "p" supprimer
       */
      let productDeleted = document.createElement("p");
      productDeleted.className = "deleteItem";
      productDeleted.innerText = "Supprimer";
      productItemContentSettingsDelete.appendChild(productDeleted);
    }
  }
}

/**
 * Récupération du total des quantités
 * @function
 * @returns {void}
 */
function getTotals() {
  /** @type {HTMLCollectionOf<HTMLInputElement>} */
  let elemsQtt = document.getElementsByClassName("itemQuantity");
  let myLength = elemsQtt.length,
    totalQtt = 0;

  for (let i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerText = totalQtt;

  /**
   *  Récupération du prix total
   */
  totalPrice = 0;
  /** @type {Array} */
  for (let i = 0; i < myLength; ++i) {
    totalPrice +=
      elemsQtt[i].valueAsNumber * productLocalStorage[i].productPrice;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerText = totalPrice;
}

/**
 * Modification d'une quantité de produit
 */
function modifyQtt() {
  /** @type {NodeListOf<HTMLInputElement>} */
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();
      /** @type {number} */
      let qttModifValue = qttModif[k].valueAsNumber;

      /** @type {Object} */
      const resultFind = productLocalStorage[k];

      resultFind.productQuantity = qttModifValue;
      productLocalStorage[k].productQuantity = resultFind.productQuantity;

      localStorage.setItem("produit", JSON.stringify(productLocalStorage));

      /**
       *  refresh rapide
       */
      location.reload();
    });
  }
}

/**
 * Suppression d'un produit
 * @function
 * @returns {void}
 */
function deleteProduct() {
  let btn_dlt = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < btn_dlt.length; j++) {
    btn_dlt[j].addEventListener("click", (event) => {
      event.preventDefault();

      /**
       * Selection de l'element à supprimer en fonction de son id ET sa couleur
       */
      let idDelete = productLocalStorage[j].idProduct;
      let colorDelete = productLocalStorage[j].productColor;

      productLocalStorage = productLocalStorage.filter(
        (el) => el.idProduct !== idDelete || el.productColor !== colorDelete
      );

      localStorage.setItem("produit", JSON.stringify(productLocalStorage));

      /**
       * Alerte produit supprimé et refresh
       */
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}

/**
 * Valide le champ de saisie du prénom.
 * @param {object} firstNameElt - L'élément HTML du champ de saisie du prénom.
 * @returns {boolean} - True si la valeur du champ de saisie correspond à l'expression régulière, false sinon.
 */
function validFirstName(firstNameElt) {
  console.log(typeof firstNameElt, firstNameElt);

  let firstNameErrorMsg = firstNameElt.nextElementSibling;

  console.log(typeof firstNameErrorMsg, firstNameErrorMsg);
  console.log(typeof firstNameElt.value, firstNameElt.value);

  if (charRegExp.test(firstNameElt.value)) {
    firstNameErrorMsg.innerText = "";

    console.log(typeof firstNameErrorMsg, firstNameErrorMsg);

    return true;
  } else {
    firstNameErrorMsg.innerText = "Veuillez renseigner un prénom.";

    console.log(typeof firstNameErrorMsg, firstNameErrorMsg);

    return false;
  }
}

/**
 * Fonction de validation du nom de famille.
 * @param {object} lastNameElt - Élément HTML contenant le nom de famille à valider.
 * @returns {boolean} - Retourne true si le nom de famille est valide, sinon false.
 */
function validLastName(lastNameElt) {
  let lastNameErrorMsg = lastNameElt.nextElementSibling;

  if (charRegExp.test(lastNameElt.value)) {
    lastNameErrorMsg.innerText = "";
    return true;
  } else {
    lastNameErrorMsg.innerText = "Veuillez renseigner un nom de famille.";
    return false;
  }
}

/**
 * Valide une adresse.
 * @param {object} adressElt - L'élément DOM contenant l'adresse à valider.
 * @returns {boolean} - Renvoie true si l'adresse est valide, sinon false.
 */
function validAddress(adressElt) {
  const addressRegExp = new RegExp(
    "^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\\s,-]+(?:(bis|ter|qua)[\\s,-]+)?([\\w]+[\\-\\w]*)[\\s,]+([-\\w].+)$"
  );
  let addressErrorMsg = adressElt.nextElementSibling;

  if (addressRegExp.test(adressElt.value)) {
    addressErrorMsg.innerText = "";
    return true;
  } else {
    addressErrorMsg.innerText = "Veuillez renseigner une addresse valide.";
    return false;
  }
}

/**
 * Fonction de validation de la ville.
 * @param {object} cityElt - Élément HTML représentant le champ de saisie de la ville.
 * @returns {boolean} - Indique si l'entrée de l'utilisateur est valide ou non.
 */
function validCity(cityElt) {
  let cityErrorMsg = cityElt.nextElementSibling;

  if (charRegExp.test(cityElt.value)) {
    cityErrorMsg.innerText = "";
    return true;
  } else {
    cityErrorMsg.innerText = "Veuillez renseigner votre ville .";
    return false;
  }
}

/**
 * Vérifie si une adresse e-mail est valide
 * @param {object} mailElt - L'élément DOM correspondant au champ d'adresse e-mail
 * @returns {boolean} - true si l'adresse e-mail est valide, false sinon
 */
function validEmail(mailElt) {
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let emailErrorMsg = mailElt.nextElementSibling;

  if (emailRegExp.test(mailElt.value)) {
    emailErrorMsg.innerText = "";
    return true;
  } else {
    emailErrorMsg.innerText = "Veuillez renseigner un email valide.";
    return false;
  }
}
/**
 * Valide le formulaire entier
 * @function
 * @returns {void}
 */
function checkForm() {
  if (
    validFirstName(firstNameElt) &&
    validLastName(lastNameElt) &&
    validAddress(adressElt) &&
    validCity(cityElt) &&
    validEmail(mailElt)
  ) {
    sendOrder();
  }
}

/**
 * Envoi des informations client au localstorage
 */
console.log(firstNameElt);

/**
 * Envoie une commande au serveur avec les produits stockés dans localStorage et les informations de contact
 * fournies par l'utilisateur dans le formulaire. Renvoie une promesse qui se résout aux données de réponse du serveur.
 *
 * @return {Promise} Une promesse qui se résout aux données de réponse du serveur.
 */
function sendOrder() {
  console.log(productLocalStorage);
  let idProducts = [];
  for (let i = 0; i < productLocalStorage.length; i++) {
    idProducts.push(productLocalStorage[i].idProduct);
  }
  console.log(idProducts);

  const order = {
    contact: {
      firstName: firstNameElt.value,
      lastName: lastNameElt.value,
      address: adressElt.value,
      city: cityElt.value,
      email: mailElt.value,
    },
    products: idProducts,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.clear();
      localStorage.setItem("orderId", data.orderId);
      document.location.href = "confirmation.html";
    })
    .catch((err) => {
      alert("Problème avec fetch : " + err.message);
    });
}

getCart();
getTotals();
modifyQtt();
deleteProduct();
console.log(firstNameElt);

document.getElementById("order").addEventListener("click",checkForm);
