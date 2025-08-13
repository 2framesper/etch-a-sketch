// default settings
const DEFAULT_SIZE = 16;
const DEFAULT_COLOUR = 'rgba(80, 80, 80, 1)';
const DEFAULT_MODE = 'colour';

let lastSquare = null;

// select Dom
const root = document.documentElement;
const currentColour = getComputedStyle(root).getPropertyValue('--main-colour');

const colourBtn = document.getElementById('colourBtn');
const colourInput = document.getElementById('colourInput');
const eraserBtn = document.getElementById('eraserBtn');
const rainbowBtn = document.getElementById('rainbowBtn');

const canvas = document.getElementById('canvas');
const slider = document.getElementById('sizeBtn');
const sliderValue = document.getElementById('sizeValue');
const clearBtn = document.getElementById('clearBtn');

// set initial slider value display
slider.value = 16;
sliderValue.textContent = `${DEFAULT_SIZE} X ${DEFAULT_SIZE}`;

slider.oninput = function() {
    sliderValue.textContent = `${this.value} X ${this.value}`;
};

colourInput.value = DEFAULT_COLOUR;

// set initial drawing state
let currentMode = DEFAULT_MODE;
let isDrawing = false;

// setting drawing mode
colourBtn.onclick = () => setCurrentMode('colour');
eraserBtn.onclick = () => setCurrentMode('erase');
rainbowBtn.onclick = () => setCurrentMode('rainbow');

function setCurrentMode(mode) {
    currentMode = mode;
}

// setting clear button
clearBtn.onclick = () => addGrid(slider.value);

// get random RGB
function getRandomColour() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// draw functions
function colour(square) {
    square.style.backgroundColor = colourInput.value;
}

function erase(square){
    square.style.backgroundColor = 'white';
}

function rainbow(square) {
    square.style.backgroundColor = getRandomColour();
}


// adding amount of squares
function addGrid(size) {
    // clear initial grid
    canvas.innerHTML = '';

    // calculate square size
    const squareSize = `calc(100% / ${size})`;

    for (let i = 0; i < size * size; i++) {
        let square = document.createElement('div');
        square.classList.add('grid-item')
        square.style.width = squareSize;
        square.style.height = squareSize;

        square.addEventListener('mousedown', () => {
            isDrawing = true;
            draw(square);
        })

        square.addEventListener('mousemove', (e) => {
            if (isDrawing && e.target !== lastSquare) {
                draw(square);
                lastSquare = e.target;
            }
        })

        square.addEventListener('mouseup', () => {
            isDrawing = false;
        })

        canvas.appendChild(square);
    }
}

// draw logic
function draw(square) {
    if (currentMode == 'colour') {
        colour(square);
    } else if (currentMode == 'erase') {
        erase(square);
    } else if (currentMode == 'rainbow') {
        rainbow(square);
    }
}

window.onload = () => {
    addGrid(DEFAULT_SIZE)

    window.addEventListener('mouseup', () => {
        isDrawing = false;
        lastSquare = null;
    });
}