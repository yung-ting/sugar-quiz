//list of product objects
let products; 
//page elements
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
let cubeImgContainer = document.getElementById("sugar-cube-counts");
let accumQuestions = 0;
//hide and show page and buttons
let nextProdBtn = document.querySelector('.btn-next-product');
let resultBtn = document.querySelector('.btn-see-results');
let mainPage = document.getElementById('main-page');
let resultPage = document.getElementById('result-page');
let startBtn = document.getElementById('btn-start');
let playAgainBtn = document.querySelector('.btn-play-again');

//retrieve data to products list
function retrieveData() {
    const xmlhttp = new XMLHttpRequest();
    const method = 'GET';
    const url = 'https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=countries&tag_contains_0=contains&tag_0=germany&tagtype_1=ingredients&tag_contains_1=contains&tag_1=sugar&nutriment_0=sugars&nutriment_compare_0=gt&nutriment_value_0=1&sort_by=unique_scans_n&page_size=100&axis_x=energy-kj&axis_y=products_n&action=display&json=true';
  
    xmlhttp.open(method, url);
    xmlhttp.onload = function() {
        const json = xmlhttp.response;
        const obj = JSON.parse(json);
        let newArr = [];
        for (let i = 0; i < obj.products.length; i++) {
            let name = obj.products[i].product_name;
            let quantity = obj.products[i].quantity;
            let quantityCal = Number.parseInt(obj.products[i].quantity);
            let sugarPer100g = obj.products[i].nutriments.sugars_100g;
            let image = obj.products[i].image_url;
            
            if (image !== undefined && quantityCal >= 100 && name !== "") {
                const productObj = {
                    name: name,
                    quantity: quantity,
                    sugarPer100g: sugarPer100g,
                    image: image,
                    cubeCount: (quantityCal / 100) * sugarPer100g / 4,
                }
                newArr.push(productObj);
            }
        }
        products = newArr;
        updateProducts();
        hideLoader()
        showStartBtn();
    };
    xmlhttp.send();
}

//pages' functions
function updateProducts() {
    productIndx = Math.floor(Math.random() * products.length);
    productQtyElem.innerText = products[productIndx].quantity;
    productNameElem.innerText = products[productIndx].name;
    productImgElem.src = products[productIndx].image;
    inputField.value = 0;
    document.getElementById('outcome-text').innerHTML = "";

    questionCounts.innerHTML ++
    accumQuestions ++
}

function reloadMainPage() {
    productIndx = Math.floor(Math.random() * products.length);
    productQtyElem.innerText = products[productIndx].quantity;
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
   
    if (inputCount == Math.round(products[productIndx].cubeCount)) {
        productSugarElem.innerText = Math.round(products[productIndx].cubeCount);
        document.getElementById('outcome-text').innerHTML = `Exactly! It contains about ${productSugarElem.innerText} cubes!`
        pointCounts.innerHTML ++
    }
    else {
        productSugarElem.innerText = Math.round(products[productIndx].cubeCount);
        document.getElementById('outcome-text').innerHTML = `It actually contains ${productSugarElem.innerText} cubes of free sugars! Surprise?`
    }
}

function updateCubesBySec() {
    for (let i = 0; i < productSugarElem.innerText; i ++ ) { 
        task(i); 
     } 
       
    function task(i) { 
       setTimeout(function() { 
           let cubeImgElem = document.createElement('img');
           cubeImgElem.src =  'images/sugar cube.svg'; 
           cubeImgElem.setAttribute('class','sugar-cube-img');
           cubeImgContainer.appendChild(cubeImgElem);

           if (i == productSugarElem.innerText - 1) {
            hideOrShowNextProdBtn();
            hideOrShowResultBtn(); 
           }
       }, 44 * i); 
     } 
}

function showResultTexts() {
    if (pointCounts.innerHTML >= 3) {
        resultTexts.innerHTML = "You are amzing!";
    } else {
        resultTexts.innerHTML = "You don't know what you are eating!";
    }
}

//pages transitions 
function hideOrShowNextProdBtn() {
    if (accumQuestions == 5) {
        nextProdBtn.style.display = 'none'; 
    } else {
        nextProdBtn.style.display = 'block';
    }
}

function onlyHideProdBtn() {
    nextProdBtn.style.display = 'none';
}

function hideOrShowResultBtn() {
    if (accumQuestions >= 5) {
        resultBtn.style.display = "block";
    } else {
        resultBtn.style.display = "none";
    }
}

function hideStartPageElem() {
    startPage.style.display = "none";
}

function showStartPageElem() {
    startPage.style.display = "block";
}

function hideStartBtn() {
    startBtn.style.display = 'none';
}

function showStartBtn() {
    startBtn.style.display = 'block';
}

function hidePlayAgainBtn() {
    playAgainBtn.style.display = "none";
}

function showPlayAgainBtn() {
    playAgainBtn.style.display = "block";
}

function hideMainPageElem() {
    mainPage.style.display = "none";
}

function showMainPageElem() {
    mainPage.style.display = "flex";
}

function hideResultPageElem() {
    resultPage.style.display = "none";
}

function showResultPageElem() {
    resultPage.style.display = "flex";
}

function hideLoader() {
    document.getElementById('loader').style.display = "none";
}

function resetSugarCubes() {
    cubeImgContainer.innerHTML = "";
}

function disableBtns() {
    document.querySelector('.btn-check-fact').disabled = true;
}

function enableBtns() {
    document.querySelector('.btn-check-fact').disabled = false;
}

retrieveData();
hideStartBtn();
hideMainPageElem();
hideOrShowResultBtn();
hidePlayAgainBtn();
hideResultPageElem();
onlyHideProdBtn();

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
    enableBtns();
    onlyHideProdBtn();
  });

document.querySelector('.btn-see-results').addEventListener('click', () => {
    hideMainPageElem();
    showPlayAgainBtn();
    showResultTexts();
    showResultPageElem();
});

document.querySelector('.btn-play-again').addEventListener('click', () => {
    reloadMainPage();
    showMainPageElem();
    resetSugarCubes();
    
    hidePlayAgainBtn();
    hideOrShowNextProdBtn();
    hideOrShowResultBtn();
    enableBtns();
    hideResultPageElem();
    onlyHideProdBtn();
});



