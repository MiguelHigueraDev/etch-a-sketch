const HSL_REGEX = /(.*?)hsl\((\d+),(\d+)%,(\d+)%\)/;
const RGB_REGEX = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;


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
let mode;
const modeOptions = document.getElementsByName('modes');
for (mode of modeOptions) {
    mode.addEventListener('input', updateMode);
    mode = "color";
}

function updateMode(e) {
    mode = e.target.value;
}

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

// Handle drawing on the grid
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if(mode === "color") e.target.style.backgroundColor = brushColor;
    if(mode === "eraser") e.target.style.backgroundColor = backgroundColor;
    if(mode === "rainbow") e.target.style.backgroundColor = getRandomHslColor();
    if(mode === "lighten") e.target.style.backgroundColor = shade(true, e.target.style.backgroundColor);
    if(mode === "darken") e.target.style.backgroundColor = shade(false, e.target.style.backgroundColor);

}

function getRandomHslColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    const lightness = Math.floor(Math.random() * 100);
    return `hsl(${hue},${saturation}%,${lightness}%)`;
}

function shade(lighten, rgb) {
    const hsl = getHslFromRgb(rgb);
    const hslArray = HSL_REGEX.exec(hsl);
    let hue = hslArray[2];
    let saturation = hslArray[3];
    let lightness = Number(hslArray[4]);
    if(lighten) lightness += 7;
    if (!lighten) lightness -= 7;
    return `hsl(${hue},${saturation}%,${lightness}%)`;
}

function getHslFromRgb(rgb) {

    // Extract RGB channels from RGB string
    const rgbArray = RGB_REGEX.exec(rgb);
    let r = rgbArray[1];
    let g = rgbArray[2];
    let b = rgbArray[3];

    // Credit: https://css-tricks.com/converting-color-spaces-in-javascript/
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
    h = 0;
    // Red is max
    else if (cmax == r)
    h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
    h = (b - r) / delta + 2;
    // Blue is max
    else
    h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
    h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return `hsl(${Math.round(h)},${Math.round(s)}%,${Math.round(l)}%)`;
}


generateGrid();