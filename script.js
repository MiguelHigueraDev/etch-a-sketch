const gridContainer = document.querySelector('#grid');


// x * x
// Set grid size programmatically
let gridSize = 16;
const GRID_HEIGHT = 1200;
const GRID_WIDTH = 1200;
gridContainer.style.width = GRID_WIDTH + "px";
gridContainer.style.height = GRID_HEIGHT + "px";

// Handle range UI change
const rangeInput = document.querySelector("#grid-size");
const rangeText = document.querySelector("#grid-size-number");
rangeInput.addEventListener('input', (e) => {
    gridSize = e.target.value;
    rangeText.textContent = `(${gridSize}x${gridSize})`;
});

const generateGridButton = document.querySelector("#generate-grid");
generateGridButton.addEventListener('click', (e) => {
    generateGrid(gridSize);
})

function generateGrid() {
    // delete old grid first
    document.querySelectorAll('.square').forEach(e => e.remove());
    for(let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement('div');
        square.classList = "square";
        square.style.width = GRID_WIDTH / gridSize + "px";
        square.style.height = GRID_HEIGHT / gridSize + "px";
        gridContainer.appendChild(square);
    }
}

// TODO:
/*
*   Let user select grid size
*   Handle grid square clicks
*   Let user switch modes (draw, delete)
*   Let user clear grid
*   
*/

console.log(gridContainer);