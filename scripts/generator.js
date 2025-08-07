var baseNumbers = [1,2,3,4,5,6,7,8,9];
const arraySize = 9;

function generate(difficulty) {
  var array = [];
  var arrayFinal = [];

  array = swap(populate());

  for(let x = 0; x < 9; x++) {
    arrayFinal[x] = [];
    for(let y = 0; y < 9; y++) {
      arrayFinal[x][y] = Math.random() > difficulty && (x != 0 || y != 0) ? array[x][y] : null;
    }
  }

  return arrayFinal;
}

function populate() {
  var array = [];
  for (let x = 0; x < arraySize; x++) {
    array[x] = [];
    for (let y = 0; y < arraySize; y++) {
        array[x][y] = parseInt((x + 3 * (y % 3) + Math.floor(y / 3)) % 9) + 1;
    }
  }
  return array;
}

function swap(array) {
  for(let i = 0; i < Math.sqrt(arraySize); i ++) {
    let numbers = [0,1,2];
    numbers.sort(function(a, b) {return 0.5 - Math.random()});

    let temp = [
      array[0 + i * 3],
      array[1 + i * 3],
      array[2 + i * 3]
    ];

    array[0 + i * 3] = temp[numbers[0]];
    array[1 + i * 3] = temp[numbers[1]];
    array[2 + i * 3] = temp[numbers[2]];
  }

  return array;
}
