let productQtyElem = document.getElementById("product-qty");
let productNameElem = document.getElementById("product-name");
let productImgElem = document.getElementById("product-img");

function updateProducts() {
    let productIndx = Math.floor(Math.random() * 10);
    productQtyElem.innerText = products[productIndx].qty;
    productNameElem.innerText = products[productIndx].name;
    productImgElem.src = products[productIndx].image;
}
updateProducts();


function compareNumbers() {
    //when click on check-fact btn, it compares input number with products.cubeCount
    let inputCount = document.getElementById('guessOfUser').value;
    document.getElementById('demo').innerHTML = inputCount;
}

document.querySelector('.btn-check-fact').addEventListener('click', () => {
    compareNumbers();
  });
