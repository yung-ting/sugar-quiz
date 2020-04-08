let productQtyElem = document.getElementById("product-qty");
let productNameElem = document.getElementById("product-name");
let productImgElem = document.getElementById("product-img");
let inputField = document.getElementById("guessOfUser");
let rightOrWrong = document.getElementById("right-or-wrong");
let productSugarElem = document.getElementById("outcome-sugar-cubes");
let productIndx = 0;
let questionCounts = document.getElementById('points-base');
let pointCounts = document.getElementById('points');
let resultTexts = document.getElementById('result-text');
let startPage = document.getElementById('start-page');
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

function reloadMainPage() {
    productIndx = Math.floor(Math.random() * products.length);
    productQtyElem.innerText = products[productIndx].qty;
    productNameElem.innerText = products[productIndx].name;
    productImgElem.src = products[productIndx].image;
    inputField.value = 0;
    document.getElementById('outcome-text').innerHTML = "";
    questionCounts.innerHTML = 1;
    accumQuestions = 1;
    pointCounts.innerHTML = 0;
    resultTexts.innerHTML = '';
}

function compareNumbers() {
    //when click on check-fact btn, it compares input number with products.cubeCount
    let inputCount = document.getElementById('guessOfUser').value;
    //document.getElementById('demo').innerHTML = inputCount;
    
    if (inputCount == Math.round(products[productIndx].cubeCount)) {
        productSugarElem.innerText = Math.round(products[productIndx].cubeCount);
        document.getElementById('outcome-text').innerHTML = `Exactly! It contains about ${productSugarElem.innerText} cubes!`
        pointCounts.innerHTML ++
    }
    else {
        productSugarElem.innerText = Math.round(products[productIndx].cubeCount);
        document.getElementById('outcome-text').innerHTML = `Nope! It contains about ${productSugarElem.innerText} cubes!`
    }
}

function showNextProdBtn() {
    if (accumQuestions == 5) {
        hiddenBtn.style.visibility = 'hidden';
    } else {
        hiddenBtn.style.visibility = 'visible';
    }
}

function hideOrShowResultBtn() {
    if (accumQuestions >= 5) {
        showBtn.style.display = "block";
    } else {
        showBtn.style.display = "none";
    }
}

function hideStartPageElem() {
    startPage.style.display = "none";
}

function showStartPageElem() {
    startPage.style.display = "block";
}

function hidePlayAgainBtn() {
    document.querySelector('.btn-play-again').style.display = "none";
}

function showPlayAgainBtn() {
    document.querySelector('.btn-play-again').style.display = "block";
}

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
       }, 44 * i); 
     } 
}

function resetSugarCubes() {
    cubeImgContainer.innerHTML = "";
}

function showResultTexts() {
    if (pointCounts.innerHTML >= 3) {
        resultTexts.innerHTML = "You are amzing!";
    } else {
        resultTexts.innerHTML = "You don't know what you are eating!";
    }
}

function disableBtns() {
    document.querySelector('.btn-check-fact').disabled = true;
}

function enableBtns() {
    document.querySelector('.btn-check-fact').disabled = false;
}

hideMainPageElem();
updateProducts();
hideOrShowResultBtn();
hidePlayAgainBtn();


//EventListeners
document.querySelector('.btn-start').addEventListener('click', () => {
    showMainPageElem();
    hideStartPageElem();
  });

document.querySelector('.btn-check-fact').addEventListener('click', () => {
    compareNumbers();
    updateCubesBySec();
    disableBtns();
  });

document.querySelector('.btn-next-product').addEventListener('click', () => {
    updateProducts();
    resetSugarCubes();
    showNextProdBtn();
    hideOrShowResultBtn();
    enableBtns();
  });

document.querySelector('.btn-see-results').addEventListener('click', () => {
    hideMainPageElem();
    showPlayAgainBtn();
    showResultTexts();
});

document.querySelector('.btn-play-again').addEventListener('click', () => {
    reloadMainPage();
    showMainPageElem();
    resetSugarCubes();
    
    hidePlayAgainBtn();
    showNextProdBtn();
    hideOrShowResultBtn();
    enableBtns();
});
