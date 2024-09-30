const scale = 10; // 0-> 1 (1 unit) = 10px // need the scale it so that the illustration is easier to look at

const canvas = document.querySelector("#canvas");
const rangeInput = document.querySelector('#rangeInput');
const rangeValueDiv = document.querySelector('#rangeValue');

const CANVAS_DIMENSIONS = { height: canvas.height, width: canvas.width };
const ctx = canvas.getContext("2d");

const sequence = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62,
    42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78, 38,
    79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29, 88, 28, 89, 27, 90, 26, 91,
].map(item => item * scale);

let index = 0; // keeps track of how many steps we have to draw.
let direction = 1; // this variable is used to alternate the direction between drawing above and below the horizontal line.

const drawRecaman = (index) => {
    ctx.clearRect(0, 0, CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height);
    // Drwaing the horizontal line at the centre of canvas (half of canvas heights).
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_DIMENSIONS.height / 2); //  initializing the position of horizontal line at the middle of y -aixs.
    ctx.lineTo(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height / 2); // here we are drawing the line having length(width) equal to canvas width at the center of canvas (y-axis/2).  
    ctx.stroke();

    // To draw semi-circles above and below of the straight horizontal line alternatively according to the Recaman Sequence.

    for (let i = 0; i < index; i++) { 
        // index varibale -> represnets the current value/number.
        const start = sequence[i]; // current number in the sequence.
        const end = sequence[i + 1]; // next/upcoming number in the sequence.
        const radius = Math.abs(start - end) / 2; //  calculating the radius/center of each semi-circle to be drawn based on current and next number.
        const centerX = (start + end) / 2;
        const centerY = CANVAS_DIMENSIONS.height / 2;
        // The start and end angles of the arc are determined by the current direction. 
        const startAngle = direction > 0 ? Math.PI : 0; 
        const endAngle = direction > 0 ? 2 * Math.PI : Math.PI;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle, false); // to draw the respective figure.
        ctx.stroke(); // to acutally render the respective element/figure on the canvas.

        direction *= -1; // direction is then alternatively flipped or changed fromm the current direction.
        /*
            for example - 
            1) direction = 1  // positive(forward) direction.
            2) direction = 1 * -1 => -1 // direction is flipped -> negative (backward)  direction.
            3) direction = -1 * -1 => 1 //  direction is again flipped -> positive (forward) direction.
        */
    }
};

// Initially, set the default scale value
const DEFAULT_SCALE_VALUE = 65;
rangeInput.value = DEFAULT_SCALE_VALUE;
rangeValueDiv.innerText = DEFAULT_SCALE_VALUE;
drawRecaman(parseInt(DEFAULT_SCALE_VALUE)); // displaying initial recaman sequence having default value = 65.

const onInputChangeHandler = (value) => {
    rangeValueDiv.innerText = value;
    index = parseInt(value);
    drawRecaman(index);
};

rangeInput.addEventListener('input', e => onInputChangeHandler(e.target.value));
