class SudokuGenerator {
  constructor(size = 9) {
    this.size = size;
    this.baseNumbers = Array.from({ length: size }, (_, i) => i + 1);
  }

  generate(difficulty) {
    const solved = this.swap(this.populate());
    const puzzle = [];

    for (let x = 0; x < this.size; x++) {
      puzzle[x] = [];
      for (let y = 0; y < this.size; y++) {
        puzzle[x][y] = Math.random() > difficulty && (x !== 0 || y !== 0) ? solved[x][y] : null;
      }
    }

    return puzzle;
  }

  populate() {
    const array = [];
    for (let x = 0; x < this.size; x++) {
      array[x] = [];
      for (let y = 0; y < this.size; y++) {
        array[x][y] = ((x + 3 * (y % 3) + Math.floor(y / 3)) % this.size) + 1;
      }
    }
    return array;
  }

  swap(array) {
    const sectionSize = Math.sqrt(this.size);

    for (let i = 0; i < sectionSize; i++) {
      const numbers = [0, 1, 2].sort(() => Math.random() - 0.5);

      const temp = [
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
}
