/**
 * Cette fonction asynchrone renvoie les articles.
 *
 * @returns {Promise<object>} une promesse qui se résout en renvoyant le contenu JSON de la réponse.
 */
async function getArticles() {
  let articlesCatch = await fetch("http://localhost:3000/api/products");
  return await articlesCatch.json();
}

/**
 * Remplit la section avec les données de l'API.
 * @async
 */
async function fillSection() {
  // Récupère les articles depuis l'API
  let result = await getArticles()
    .then(function (resultatAPI) {
      const articles = resultatAPI;
      for (let article in articles) {
        
        /**
         * Insère l'élément "a".
         * @type {HTMLAnchorElement}
         */
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.html?id=${resultatAPI[article]._id}`;

        /**
         * Insère l'élément "article".
         * @type {HTMLElement}
         */
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        /**
         * Insère l'image.
         * @type {HTMLImageElement}
         */
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = resultatAPI[article].imageUrl;
        productImg.alt = resultatAPI[article].altTxt;

        /**
         * Insère le titre "h3".
         * @type {HTMLHeadingElement}
         */
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerText = resultatAPI[article].name;

        /**
         * Insère la description "p".
         * @type {HTMLParagraphElement}
         */
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productName");
        productDescription.innerText = resultatAPI[article].description;
      }
    })
    .catch(function (error) {
      return error;
    });
}

fillSection();