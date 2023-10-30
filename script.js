
// Set grid size programmatically
const gridContainer = document.querySelector('#grid');
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
    generateGrid();
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
        square.id = i;
        gridContainer.appendChild(square);
    }
}

// Handle mouseover and mouseout, to add (and remove) trailing effect
const TRAIL_DURATION_SECONDS = 0.1;
const trailDuration = TRAIL_DURATION_SECONDS * 1000;
gridContainer.addEventListener('mouseover', (e) => {
    e.target.classList.add('hovered');
});

gridContainer.addEventListener('mouseout', (e) => {
    setTimeout(() => {
        e.target.classList.remove('hovered');
    }, trailDuration);
});

generateGrid();

// TODO:
/*
*   Let user select grid size DONE!
*   Handle grid hover DONE!
*   Handle grid square clicks
*   Let user switch modes (draw, delete)
*   Let user clear grid
*   
*/

console.log(gridContainer);