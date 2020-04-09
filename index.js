let products;

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
let resultPage =document.getElementById('result-page');

let cubeImgContainer = document.getElementById("sugar-cube-counts");
let accumQuestions = 0;

//retrieve data
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
    questionCounts.innerHTML ++
    document.getElementById('outcome-text').innerHTML = "";

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
    //document.getElementById('demo').innerHTML = inputCount;
    
    if (inputCount == Math.round(products[productIndx].cubeCount)) {
        productSugarElem.innerText = Math.round(products[productIndx].cubeCount);
        document.getElementById('outcome-text').innerHTML = `Exactly! It contains about ${productSugarElem.innerText} cubes!`
        pointCounts.innerHTML ++
    }
    else {
        productSugarElem.innerText = Math.round(products[productIndx].cubeCount);
        document.getElementById('outcome-text').innerHTML = `It actually contains ${productSugarElem.innerText} cubes! Surprise?`
    }
}

function showNextProdBtn() {
    if (accumQuestions == 5) {
        hiddenBtn.style.display = 'none';
    } else {
        hiddenBtn.style.display = 'block';
    }
}

function onlyHideProdBtn() {
    hiddenBtn.style.display = 'none';
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

function hideStartBtn() {
    document.getElementById('btn-start').style.display = 'none';
}

function showStartBtn() {
    document.getElementById('btn-start').style.display = 'block';
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
    showNextProdBtn();
  });

document.querySelector('.btn-next-product').addEventListener('click', () => {
    updateProducts(); 
    resetSugarCubes();
    hideOrShowResultBtn(); 
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
    showNextProdBtn();
    hideOrShowResultBtn();
    enableBtns();
    hideResultPageElem();
    onlyHideProdBtn();
});



