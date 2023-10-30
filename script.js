
// Set grid size programmatically
const gridContainer = document.querySelector('#grid');
const GRID_HEIGHT = 800;
const GRID_WIDTH = 800;
gridContainer.style.width = GRID_WIDTH + "px";
gridContainer.style.height = GRID_HEIGHT + "px";

// Handle grid size UI change
let gridSize = 16;
const gridSizeInput = document.querySelector("#grid-size");
const gridSizeText = document.querySelector("#grid-size-number");
gridSizeInput.addEventListener('input', (e) => {
    gridSize = e.target.value;
    generateGrid();
    gridSizeText.textContent = `(${gridSize}x${gridSize})`;
});

// Handle color UI change
let backgroundColor = "#FFFFFF";
let brushColor = "#000000";

const backgroundColorInput = document.querySelector("#background-color");
backgroundColorInput.addEventListener('input', (e) => {
    backgroundColor = e.target.value;
});

const brushColorInput = document.querySelector("#brush-color");
brushColorInput.addEventListener('input', (e) => {
    brushColor = e.target.value;
});

const generateGridButton = document.querySelector("#generate-grid");
generateGridButton.addEventListener('click', () => {
    generateGrid();
});

// Handle mode change

function generateGrid() {
    document.querySelectorAll('.square').forEach(e => e.remove());
    for(let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement('div');
        square.classList = "square";
        square.style.width = GRID_WIDTH / gridSize + "px";
        square.style.height = GRID_HEIGHT / gridSize + "px";
        square.style.backgroundColor = backgroundColor;
        square.id = i;
        square.addEventListener('mouseover', changeColor)
        square.addEventListener('mousedown', changeColor)
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


// Handle drawing on the grid
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = brushColor;
}

// Generate grid without waiting
generateGrid(0);

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