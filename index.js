let productQtyElem = document.getElementById("product-qty");
let productNameElem = document.getElementById("product-name");
let productImgElem = document.getElementById("product-img");
let inputField = document.getElementById("guessOfUser");
let rightOrWrong = document.getElementById("right-or-wrong");
let productSugarElem = document.getElementById("outcome-sugar-cubes");
let productIndx = 0;

function updateProducts() {
    productIndx = Math.floor(Math.random() * 10);
    productQtyElem.innerText = products[productIndx].qty;
    productNameElem.innerText = products[productIndx].name;
    productImgElem.src = products[productIndx].image;
    inputField.value = 0;
    document.getElementById('outcome-text').innerHTML = "";
}

function compareNumbers() {
    //when click on check-fact btn, it compares input number with products.cubeCount
    let inputCount = document.getElementById('guessOfUser').value;
    //document.getElementById('demo').innerHTML = inputCount;
    
    if (inputCount === products[productIndx].cubeCount) {
    
        productSugarElem.innerText = products[productIndx].cubeCount;
        document.getElementById('outcome-text').innerHTML = `Exactly! It contains ${productSugarElem.innerText} cubes!`
    }
    else {
        productSugarElem.innerText = products[productIndx].cubeCount;
        document.getElementById('outcome-text').innerHTML = `Nope! It contains ${productSugarElem.innerText} cubes!`
    }
}

//EventListeners
document.querySelector('.btn-check-fact').addEventListener('click', () => {
    compareNumbers();
  });

document.querySelector('.btn-next-product').addEventListener('click', () => {
    updateProducts();
  });
