const params = new URL (document.location).searchParams
const id = params.get("id")

const url = `http://localhost:3000/api/products/${id}`

const getArticle = () => {
    fetch(url)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        console.log(data)
        const addTitle = (document.getElementById("title").innerHTML= data.name)
        const addPrice = (document.getElementById("price").innerHTML= data.price)
        const addImg = document.createElement("img")
        document.querySelector(".item__img").appendChild(addImg)
        addImg.setAttribute("src", `${data.imageUrl}`)

    })
}

getArticle()