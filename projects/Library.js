//var inputNumber = 18745983478932750;
var row = 0;
var shelf = 0;
var book = 0;
var page = 0;
function setup() {
  row = 79435265446;
  shelf = 563;
  book = 818;
  page = 482;
}

function draw() {
  if (shelf > 1000) {
    shelf = 1000;
  }
  if (book > 1000) {
    book = 1000;
  }
  if (page > 1000) {
    page = 1000;
  }
  console.log(base36(172913282679552704222604828666));
  //172913282679552704222604828666
  //console.log(base36((row*1000000000)+(shelf*1000000)+(book*1000)+(page)));
  // shelf = document.getElementById('Shelf');
  // console.log(shelf);
}

function base36(number) {
  var answer = " ";
  var X = "number";
  var Z = [];
  var M = -1;
  var A =["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  for(i = X; 0 < i; i = Math.floor(i / 36)) {
    if(i % 36 >= 10) {
      Z.push(A[i % 36 - 10]);
    } else {
      Z.push(i % 36);
    }
    M = M + 1;
  }
  for(j = M; j >= 0; j--) {
    answer = answer.concat(Z[j]);
  }
  return(answer);
}
