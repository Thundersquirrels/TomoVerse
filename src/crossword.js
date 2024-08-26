class Crossword {
    constructor() {
        this.grid = [];
    }

    generateGrid(size) {
        for(let i = 0; i < size; i++) {
            this.grid[i] = [];
            for(let j = 0; j < size; j++) {
                this.grid[i][j] = '-';
            }
        }
    }

    printGrid() {
        for(let i = 0; i < this.grid.length; i++) {
            console.log(this.grid[i].join(' '));
        }
    }
}

let crossword = new Crossword();
crossword.generateGrid(10);
crossword.printGrid();