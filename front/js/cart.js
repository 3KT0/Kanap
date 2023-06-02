//Initialisation du local storage

let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

//Récupération des coordonnées du formulaire client
const firstNameElt  = document.getElementById("firstName");
const lastNameElt   = document.getElementById("lastName");
const adressElt     = document.getElementById("address");
const cityElt       = document.getElementById("city");
const mailElt       = document.getElementById("email");

//Création des expressions régulières
const charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
console.log(firstNameElt);

// Si le panier est vide
function getCart() {

  if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `Votre panier est vide`;
    positionEmptyCart.innerText = emptyCart;
  } else {

    for (let produit in productLocalStorage) {
      
      // Insertion de l'élément "article"
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute(
        "data-id",
        productLocalStorage[produit].idProduct
      );

      // Insertion de l'élément "div"
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      // Insertion de l'image
      let productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = productLocalStorage[produit].productImg;
      productImg.alt = productLocalStorage[produit].altproductImg;

      // Insertion de l'élément "div"
      let productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      // Insertion de l'élément "div"
      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className = "cart__item__content__titlePrice";

      // Insertion du titre h3
      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerText = productLocalStorage[produit].productName;

      // Insertion de la couleur
      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerText = productLocalStorage[produit].productColor;
      productColor.style.fontSize = "20px";

      // Insertion du prix
      let productPrice = document.createElement("p");
      productItemContentTitlePrice.appendChild(productPrice);
      productPrice.innerText = productLocalStorage[produit].productPrice + " €";

      // Insertion de l'élément "div"
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      // Insertion de l'élément "div"
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsQuantity);
      productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

      // Insertion de "Qté : "
      let productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.innerText = "Qté : ";

      // Insertion de la quantité
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = productLocalStorage[produit].productQuantity;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // Insertion de l'élément "div"
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

      // Insertion de "p" supprimer
      let productDeleted = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productDeleted);
      productDeleted.className = "deleteItem";
      productDeleted.innerText = "Supprimer";
    }
  }
}
getCart();

function getTotals() {

  // Récupération du total des quantités
  let elemsQtt = document.getElementsByClassName("itemQuantity");
  let myLength = elemsQtt.length, totalQtt = 0;

  for (let i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerText = totalQtt;

  // Récupération du prix total
  totalPrice = 0;

  for (let i = 0; i < myLength; ++i) {
    totalPrice +=
      elemsQtt[i].valueAsNumber * productLocalStorage[i].productPrice;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerText = totalPrice;
}
getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();
      let qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = productLocalStorage[k]

      resultFind.productQuantity = qttModifValue;
      productLocalStorage[k].productQuantity = resultFind.productQuantity;

      localStorage.setItem("produit", JSON.stringify(productLocalStorage));

      // refresh rapide
      location.reload();
    });
  }
}
modifyQtt();

// Suppression d'un produit
function deleteProduct() {
  let btn_dlt = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < btn_dlt.length; j++) {
    btn_dlt[j].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = productLocalStorage[j].idProduct;
      let colorDelete = productLocalStorage[j].productColor;

      productLocalStorage = productLocalStorage.filter(
        (el) => el.idProduct !== idDelete || el.productColor !== colorDelete
      );

      localStorage.setItem("produit", JSON.stringify(productLocalStorage));

      //Alerte produit supprimé et refresh
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}
deleteProduct();
console.log(firstNameElt);

/**
 * VALIDATION DU PRENOM
 * @param {object} firstNameElt 
 * @returns 
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
    firstNameErrorMsg.innerText = "Veuillez renseigner ce champ???.";

    console.log(typeof firstNameErrorMsg, firstNameErrorMsg);

    return false;
  }
};

//validation du nom
function validLastName(lastNameElt) {
  let lastNameErrorMsg = lastNameElt.nextElementSibling;

  if (charRegExp.test(lastNameElt.value)) {
    lastNameErrorMsg.innerText = "";
  } else {
    lastNameErrorMsg.innerText = "Veuillez renseigner ce champ.";
  }
};

//validation de l'adresse
function validAddress (adressElt) {
  const addressRegExp = new RegExp(
    "^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\\s,-]+(?:(bis|ter|qua)[\\s,-]+)?([\\w]+[\\-\\w]*)[\\s,]+([-\\w].+)$"
  );
  let addressErrorMsg = adressElt.nextElementSibling;

  if (addressRegExp.test(adressElt.value)) {
    addressErrorMsg.innerText = "";
  } else {
    addressErrorMsg.innerText = "Veuillez renseigner ce champ.";
  }
};

//validation de la ville
function validCity (cityElt) {
  let cityErrorMsg = cityElt.nextElementSibling;

  if (charRegExp.test(cityElt.value)) {
    cityErrorMsg.innerText = "";
  } else {
    cityErrorMsg.innerText = "Veuillez renseigner ce champ.";
  }
};

//validation de l'email
function validEmail (mailElt) {
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let emailErrorMsg = mailElt.nextElementSibling;

  if (emailRegExp.test(mailElt.value)) {
    emailErrorMsg.innerText = "";
  } else {
    emailErrorMsg.innerText = "Veuillez renseigner votre email.";
  }
};

function checkForm() {
  console.log("1 => ", typeof validFirstName(), validFirstName(firstName))
  if (!validFirstName(firstNameElt) || !validLastName(lastNameElt) || !validAddress(adressElt) || !validCity(cityElt) || !validEmail(mailElt)) {
}
}

//Envoi des informations client au localstorage
console.log(firstNameElt);
function postForm() {
  const btn_order = document.getElementById("order");
  console.log(firstNameElt);

  //Ecouter le panier
  btn_order.addEventListener("click", checkForm);

    //Construction d'un array depuis le local storage
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
