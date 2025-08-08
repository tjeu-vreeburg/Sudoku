class SudokuCore {
    constructor() {
        this.generator = new SudokuGenerator();
        this.solver = new SudokuSolver();
        this.array = null;
        this.arrayCurrent = null;
        this.table = document.getElementById('sudoku');
        this.required = 0;
        this.mistakes = 0;
        this.maxMistakes = 3;
        this.initEvents();
    }

    initEvents() {
        $('#easy').click(() => this.create("Easy", "success", 0.4));
        $('#medium').click(() => this.create("Medium", "warning", 0.5));
        $('#hard').click(() => this.create("Hard", "danger", 0.6));

        $('#solve').click(() => {
            this.solver.solve(this.array);
            this.updateGrid();
            $('.progress-bar').width("100%");
            $("#difficulty p").text(`Game Solved!`);
        });

        $('#back').click(() => {
            $('.game').toggle();
            $('.setup').toggle();
        });
    }

    create(type, badge, difficulty) {
        this.array = this.generator.generate(difficulty);
        this.solvedArray = JSON.parse(JSON.stringify(this.array));
        this.solver.solve(this.solvedArray);
        this.mistakes = 0;

        $("#" + this.table.id).empty();
        $("#difficulty").html(`SUDOKU <span class="badge badge-${badge} text-white">${type}</span><p class="small">Mistakes: ${this.mistakes}/${this.maxMistakes}</p>`);
        $(".progress").html(`<div class="progress-bar progress-bar-striped progress-bar-animated bg-${badge}" role="progressbar"></div>`);

        this.required = this.setupGrid();
        this.updateGrid();

        $('.progress-bar').width("0%");
        $('.game').toggle();
        $('.setup').toggle();
    }

    setupGrid() {
        let amount = 0;
        for (let i = 0; i < this.array.length; i++) {
            $("#" + this.table.id).append($(`<tr id=row-${i}></tr>`));
            for (let j = 0; j < this.array.length; j++) {
                let element = $(`#row-${i}`);
                let value = this.array[i][j];

                if (value == null) {
                    amount++;
                    element.append($(`<td><input type="text" maxlength="1"></td>`).on('change', (e) => this.checkRegex(e.target.value, e.target, i, j)));
                } else {
                    element.append($(`<td><input type="text" class="static-td bg-custom-gray" value="${value}" readonly></td>`));
                }
            }
        }
        return amount;
    }

    checkRegex(value, element, row, col) {
        if(this.mistakes >= this.maxMistakes) return;
        
        const trimmedValue = value.trim();
        if (!/^[1-9]$/.test(trimmedValue)) {
            element.value = "";
            element.classList.remove('bg-incorrect');
        } else {
            const num = parseInt(trimmedValue, 10);
            if (this.solvedArray && num !== this.solvedArray[row][col]) {
                element.classList.add('bg-incorrect');
                this.mistakes++;
            } else {
                element.classList.remove('bg-incorrect');
            }
        }

        const correctCount = this.updateArray();
        if(this.mistakes >= this.maxMistakes) {
            $('#sudoku input[type="text"]:not([readonly])').prop('disabled', true);
            $("#difficulty p").text(`Game Over!`);
        } else if(correctCount >= this.required) {
            $('#sudoku input[type="text"]:not([readonly])').prop('disabled', true);
            $("#difficulty p").text(`You have won!`);
        } else {
            const progressPercent = (correctCount / this.required) * 100;
            $("#difficulty p").text(`Mistakes: ${this.mistakes}/${this.maxMistakes}`);
            $('.progress-bar').width(progressPercent + "%");
        }
    }

    updateArray() {
        this.arrayCurrent = [];
        let rows = this.table.childNodes;
        let correctCount = 0;

        for (let x = 0; x < this.array.length; x++) {
            this.arrayCurrent[x] = [];
            let columns = rows[x].childNodes;

            for (let y = 0; y < this.array.length; y++) {
                let cellValue = columns[y].childNodes[0].value.trim();

                if (/^[1-9]$/.test(cellValue)) {
                    const num = parseInt(cellValue, 10);
                    this.arrayCurrent[x][y] = num;

                    if (this.array[x][y] === null && this.solvedArray && num === this.solvedArray[x][y]) {
                        correctCount++;
                    }
                } else {
                    this.arrayCurrent[x][y] = null;
                }
            }
        }

        return correctCount;
    }

    updateGrid() {
        let rows = this.table.childNodes;
        for (let x = 0; x < this.array.length; x++) {
            let columns = rows[x].childNodes;
            for (let y = 0; y < this.array.length; y++) {
                columns[y].childNodes[0].value = this.array[x][y];
            }
        }
    }

    updateDifficulty() {
        $("#difficulty").html(`SUDOKU <span class="badge badge-${badge}">${type}</span><p>${this.mistakes}/${this.maxMistakes}`);
    }
}