function isAllowed(array, row, column, value) {
  for(var i = 0; i < array.length; i++) {
    if(isAssigned(array[i][column], value)) return false;
    if(isAssigned(array[row][i], value)) return false;

    var rowIndex = (row - row % 3) + i % 3;
    var columnIndex = (column - column % 3) + i / 3;

    if(isAssigned(array[rowIndex][columnIndex], value)) return false;
  }
  return true;
}

function isAssigned(current, value) {
  return (current != null && current == value);
}

function solve(array) {
  for (var row = 0; row < array.length; row++) {
    for (var column = 0; column < array.length; column++) {
      if(array[row][column] != null) continue;

      for (var value = 1; value <= array.length; value++) {
        if (isAllowed(array, row, column, value)) {
          array[row][column] = value;
          if(solve(array)) return true;
          array[row][column] = null;
        }
      }

      return false;
    }
  }
  return true;
}
