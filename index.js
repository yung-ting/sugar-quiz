let productQtyElem = document.getElementById("product-qty");
let productNameElem = document.getElementById("product-name");
let productImgElem = document.getElementById("product-img");
let inputField = document.getElementById("guessOfUser");
let rightOrWrong = document.getElementById("right-or-wrong");
let productSugarElem = document.getElementById("outcome-sugar-cubes");
let productIndx = 0;
let questionCounts = document.getElementById('points-base');
//hide and show
let hiddenBtn = document.querySelector('.btn-next-product');
let showBtn = document.querySelector('.btn-see-results');
let mainPage = document.getElementById('main-page');

let cubeImgContainer = document.getElementById("sugar-cube-counts");
let accumQuestions = 0;

function updateProducts() {
    productIndx = Math.floor(Math.random() * products.length);
    productQtyElem.innerText = products[productIndx].qty;
    productNameElem.innerText = products[productIndx].name;
    productImgElem.src = products[productIndx].image;
    inputField.value = 0;
    questionCounts.innerHTML ++
    document.getElementById('outcome-text').innerHTML = "";

    accumQuestions ++
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
//======
function showNextProd() {
    if (accumQuestions == 5) {
        hiddenBtn.style.visibility = 'hidden';
    }
}

function showResultBtn() {
    if (accumQuestions >= 5) {
        showBtn.style.display = "block";
    } else {
        showBtn.style.display = "none";
    }
}

function hidePlayAgainBtn() {
    document.querySelector('.btn-play-again').style.display = "none";
}

function showPlayAgainBtn() {
    document.querySelector('.btn-play-again').style.display = "block";
}
///======== above are not working
function hideMainPageElem() {
    mainPage.style.display = "none";
}

function showMainPageElem() {
    mainPage.style.display = "block";
}

function updateCubesBySec() {
    for (let i = 0; i < productSugarElem.innerText; i ++ ) { 
        task(i); 
     } 
       
    function task(i) { 
       setTimeout(function() { 
           // Add tasks to do 
           let cubeImgElem = document.createElement('img');
           cubeImgElem.src =  'images/sugar cube.svg'; 
           cubeImgElem.setAttribute('class','sugar-cube-img');
           cubeImgContainer.appendChild(cubeImgElem);
       }, 220 * i); 
     } 
}

function resetSugarCubes() {
    cubeImgContainer.innerHTML = "";
}



updateProducts();
showResultBtn();
hidePlayAgainBtn();


//EventListeners
document.querySelector('.btn-check-fact').addEventListener('click', () => {
    compareNumbers();
    updateCubesBySec();
  });

document.querySelector('.btn-next-product').addEventListener('click', () => {
    updateProducts();
    resetSugarCubes();
    showNextProd();
    showResultBtn();
  });

document.querySelector('.btn-see-results').addEventListener('click', () => {
    hideMainPageElem();
    showPlayAgainBtn();
});

document.querySelector('.btn-play-again').addEventListener('click', () => {
    showMainPageElem();
});
