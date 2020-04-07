let productQtyElem = document.getElementById("product-qty");
let productNameElem = document.getElementById("product-name");
let productImgElem = document.getElementById("product-img");
let inputField = document.getElementById("guessOfUser");
let rightOrWrong = document.getElementById("right-or-wrong");
let productSugarElem = document.getElementById("outcome-sugar-cubes");
let productIndx = 0;

const cubeImgContainer = document.getElementById("sugar-cube-counts");
//for (let x = 0; x < 3; x++) {
//     const boardElement = document.createElement('div');
//     boardElement.setAttribute('class', 'board');
//     roomElement.appendChild(boardElement);

//     for (let y = 0; y < 3; y++) {
//         const blockElement = document.createElement('div');
//         blockElement.setAttribute('class', 'block');
//         boardElement.appendChild(blockElement);
//     }
// }

function updateProducts() {
    productIndx = Math.floor(Math.random() * products.length);
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
    
    if (inputCount == Math.round(products[productIndx].cubeCount)) {
        productSugarElem.innerText = Math.round(products[productIndx].cubeCount);
        document.getElementById('outcome-text').innerHTML = `Exactly! It contains about ${productSugarElem.innerText} cubes!`
        document.getElementById('points').innerHTML ++
    }
    else {
        productSugarElem.innerText = Math.round(products[productIndx].cubeCount);
        document.getElementById('outcome-text').innerHTML = `Nope! It contains about ${productSugarElem.innerText} cubes!`
    }

}

function updateSugarCubes() {
    for (let i = 0; i < productSugarElem.innerText; i ++ ) {
       let cubeImgElem = document.createElement('img');
       cubeImgElem.src =  'images/sugar cube.svg'; 
       cubeImgElem.setAttribute('class','sugar-cube-img');
       cubeImgContainer.appendChild(cubeImgElem);
    }
}

function resetSugarCubes() {
    cubeImgContainer.innerHTML = "";
}

updateProducts();

//EventListeners
document.querySelector('.btn-check-fact').addEventListener('click', () => {
    compareNumbers();
    updateSugarCubes();
  });

document.querySelector('.btn-next-product').addEventListener('click', () => {
    updateProducts();
    resetSugarCubes();
  });
