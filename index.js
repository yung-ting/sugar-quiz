function compareNumbers() {
    //when click on check-fact btn, it compares input number with products.cubeCount
    let inputCount = document.getElementById('guessOfUser').value;
    document.getElementById('demo').innerHTML = inputCount;
}

document.querySelector('.btn-check-fact').addEventListener('click', () => {
    compareNumbers();
  });

//   function myFunction() {
//     var x = document.getElementById("myNumber").value;
//     document.getElementById("demo").innerHTML = x;
//   }