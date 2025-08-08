class SudokuSolver {
  isAllowed(array, row, column, value) {
    for (let i = 0; i < array.length; i++) {
      if (this.isAssigned(array[i][column], value)) return false;
      if (this.isAssigned(array[row][i], value)) return false;

      const rowIndex = (row - row % 3) + (i % 3);
      const columnIndex = (column - column % 3) + Math.floor(i / 3);

      if (this.isAssigned(array[rowIndex][columnIndex], value)) return false;
    }
    return true;
  }

  isAssigned(current, value) {
    return current !== null && current == value;
  }

  solve(array) {
    for (let row = 0; row < array.length; row++) {
      for (let column = 0; column < array.length; column++) {
        if (array[row][column] !== null) continue;

        for (let value = 1; value <= array.length; value++) {
          if (this.isAllowed(array, row, column, value)) {
            array[row][column] = value;
            if (this.solve(array)) return true;
            array[row][column] = null;
          }
        }
        return false;
      }
    }
    return true;
  }
}