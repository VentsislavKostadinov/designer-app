let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let img = new Image();


// Checking rotation - portrait or landscape


document.addEventListener('load', resizedDynamically);

function resizedDynamically() {
    window.addEventListener("resize", detectDevice)
}

function detectDevice() {
    // Cheking orientation device. Should be only a protrait
    let canvas = document.getElementById('myCanvas');
    let viewWidth = $(window).width();

    let orientationDevice = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
    console.log('orientationDevice', orientationDevice);

    let orietationPortrait = document.querySelector('#orientation-portrait > img');
    let pleaseRotateText = document.getElementById('rotate-portrait-text');
    let logo = document.querySelector('header > img');
    let filters = document.querySelector('.filters')

    if (orientationDevice === "landscape-primary" && viewWidth <= 700) {

        orietationPortrait.style.display = 'block'
        orietationPortrait.style.textAlign = 'center';
        pleaseRotateText.style.display = 'block';
        pleaseRotateText.style.textAlign = 'center';
        canvas.style.display = 'none';
        logo.style.display = 'none';
        filters.style.display = 'none';

    } else {
        orietationPortrait.style.display = 'none';
        pleaseRotateText.style.display = 'none';
        canvas.style.display = 'inline';
        logo.style.display = 'block';
        filters.style.display = 'block';


    }
}


let grayscale = document.getElementById('grayscale');
let contrast = document.getElementById('contrast');
let hueRotate = document.getElementById('hue-rotate');
let sepia = document.getElementById('sepia');
let invert = document.getElementById('invert');
let bubble = document.querySelector('.bubble');
let allRanges = document.querySelectorAll('.range-wrap')

let resetBtn = document.getElementById('resetBtn')

let imageLoader = document.getElementById('imageLoader');

imageLoader.onchange = function (e) {
    img.onload = draw;
    img.src = URL.createObjectURL(this.files[0]);
}

function draw() {

    let wrh = img.width / img.height;
    let newWidth = canvas.width;
    let newHeight = canvas.height;
    if (newHeight > canvas.height) {
        newHeight = canvas.height;
        newWidth = newHeight * wrh;
    }

    let xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
    let yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

    ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);
}


// Change Orientation

$('#change-orientation').click(function () {

    $('#myCanvas').toggleClass('orientation')

})


/* Filters */
function drawCanvasFilters() {

    ctx.filter = 'grayscale(' + grayscale.value + '%) contrast(' + contrast.value + '%) hue-rotate(' + hueRotate.value + 'deg) sepia(' + sepia.value + '%) invert(' + invert.value + '%)';
    //ctx.drawImage(img, 0, 0, 400, 400);
    draw();

}

grayscale.addEventListener('change', drawCanvasFilters);
contrast.addEventListener('change', drawCanvasFilters);
hueRotate.addEventListener('change', drawCanvasFilters);
sepia.addEventListener('change', drawCanvasFilters);
invert.addEventListener('change', drawCanvasFilters);

// Show dynamically range values

allRanges.forEach(wrap => {
    let range = wrap.querySelector('.range');
    let bubble = wrap.querySelector('.bubble');

    range.addEventListener("input", () => {
        setBubble(range, bubble);
    });
    setBubble(range, bubble);
});

function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;
}

resetBtn.addEventListener('click', () => {
    ctx.filter = 'none';
    grayscale.value = 0;
    contrast.value = 100;
    hueRotate.value = 0;
    sepia.value = 0;
    invert.value = 0;
    //ctx.drawImage(img, 0, 0, 400, 400);
    draw();
})


/* ZOOM */

let mouseDown = false;
let mousePos = [0, 0];

//set delta for zoom and keep track of current zoom
let zoomDelta = 0.1;


// Defaults
let DEFAULT_ZOOM = 0.5;
let MAX_ZOOM = 3;

let DRAW_POS = [canvas.width / 2, canvas.height / 2];

let drawPos = DRAW_POS;
let scale = DEFAULT_ZOOM;


// Drag and drop
canvas.addEventListener("mousewheel", zoom, false);
canvas.addEventListener("mousedown", setMouseDown, false);
canvas.addEventListener("mouseup", setMouseUp, false);
canvas.addEventListener("mousemove", move, false);
canvas.addEventListener('mouseleave', mouseLeave, false);


// Buttons
let zoomInBtn = document.querySelector("#zoomIn");
zoomInBtn.addEventListener("click", zoomIn, false);
let zoomOutBtn = document.querySelector("#zoomOut");
zoomOutBtn.addEventListener("click", zoomOut, false);
let resetZoomBtn = document.querySelector("#resetZoom");
resetZoomBtn.addEventListener("click", resetZoom, false);

//let resetPosBtn = document.querySelector("#resetPos");
//resetPosBtn.addEventListener("click", resetPos, false);

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let currentScale = 1;
let currentAngle = 0;

// Draw the canvas
function drawCanvas() {

    clear();
    ctx.save();
    ctx.scale(currentScale, currentScale);
    ctx.rotate(currentAngle * Math.PI / 180);
    //ctx.drawImage(img, -img.width / 2, -img.width / 2);
    draw();
    ctx.restore();
}


// Draw drag and drop image
function dragAndDropImage() {
    let w = img.width * scale;
    let h = img.height * scale;
    let x = drawPos[0] - (w / 2);
    let y = drawPos[1] - (h / 2);
    ctx.drawImage(img, x, y, w, h);
}

// Set the zoom with the mouse wheel
function zoom(e) {
    e.preventDefault()
    if (e.wheelDelta > 0) {
        zoomIn();
    } else {
        zoomOut();
    }
}

function zoomIn() {

    if (scale < MAX_ZOOM) {
        currentScale += zoomDelta;
        drawCanvas();
    }
}

// Reset the zoom
function resetZoom() {
    currentScale = 1
    drawCanvas();
}

// Zoom out
function zoomOut(e) {
    if (currentScale > 1) {
        currentScale -= zoomDelta;
        drawCanvas()

    } else {
        return
    }
}


/* Reset the position
function resetPos() {

    drawPos = DRAW_POS;
    drawCanvas();
} */


// Toggle mouse status

function setMouseDown(e) {

    e.preventDefault()
    mouseDown = true;
    mousePos = [e.x, e.y];
    // drawCanvas();
    dragAndDropImage();
}

function setMouseUp(e) {

    e.preventDefault();
    mouseDown = false;
    // drawCanvas()
    //drawImages()
    dragAndDropImage()
}

// Move
function move(e) {

    e.preventDefault();
    if (mouseDown) {
        let dX = 0,
            dY = 0;
        let x, y;
        let delta = [e.x - mousePos[0], e.y - mousePos[1]];
        drawPos = [drawPos[0] + delta[0], drawPos[1] + delta[1]];
        mousePos = [e.x, e.y];
        //  drawCanvas();
        // drawImages()
        dragAndDropImage();
    }
}

function mouseLeave() {
    drawPos = DRAW_POS;
    drawCanvas();
}

// Disable drag and drop
//canvas.removeEventListener("mousewheel", zoom, false);
//canvas.removeEventListener("mousedown", setMouseDown, false);
//canvas.removeEventListener("mouseup", setMouseUp, false);
//canvas.removeEventListener("mousemove", move, false);
//canvas.removeEventListener('mouseleave', mouseLeave, false);

/* Set up touch events for mobile, etc */

let drawing = false;
let lastPos = mousePos;

canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
    let mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);


canvas.addEventListener("touchmove", function (e) {
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);


canvas.addEventListener("touchmove", function (e) {
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);


canvas.addEventListener('gesturechange', (e) => {

    e.preventDefault();
    e.target.style.webkitTransform =
        'scale(' + e.scale + currentScale + ')';
})


// Prevent scrolling when touching the canvas

document.body.addEventListener("touchstart", function (e) {
    if (e.target === img) {
        e.preventDefault();
    }
}, false);
document.body.addEventListener("touchend", function (e) {
    // if (e.target === img) {
    //    e.preventDefault();
    // }
    drawPos = DRAW_POS;
    drawCanvas();
}, false);
document.body.addEventListener("touchmove", function (e) {
    if (e.target === img) {
        e.preventDefault();
    }
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    let rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Image wrap

let imgWrap = document.getElementById('image-wrap');

imgWrap.addEventListener('click', () => {

    ctx.drawImage(img, 0, 0, 800, 400);

})

let whiteWrap = document.getElementById('wrap-white');
whiteWrap.addEventListener('click', () => {

    drawCanvas();
})

// Save image as JSON

// Save Button
const reader = new FileReader();

// event handler for the save button
let saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', () => {
    // retrieve the canvas data

    // get sizes
    let newSize = sessionStorage.getItem('newSize');
    console.log('SessionStorage Size: ', newSize)
    let newPrice = sessionStorage.getItem('priceVariation');
    console.log('SessionStorage Price: ', newPrice)

    let canvasContents = canvas.toDataURL(); // a data URL of the current canvas image
    let data = {image: canvasContents, date: Date.now(), size: newSize, nPrice: newPrice, sepia: sepia.value};
    let string = JSON.stringify(data);


    // create a blob object representing the data as a JSON string
    let file = new Blob([string], {
        type: 'application/json'
    });

    // trigger a click event on an <a> tag to open the file explorer
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// UPLOAD JSON BUTTON function
document.getElementById('load').addEventListener('change', function () {
    if (this.files[0]) {
        // read the contents of the first file in the <input type="file">
        reader.readAsText(this.files[0]);
    }
});

// this function executes when the contents of the file have been fetched
reader.onload = function () {
    let data = JSON.parse(reader.result);
    console.log(data.size);
    let jsonSize = document.getElementById('sized');
    jsonSize.innerHTML = "Size: " + data.size;

    let jsonPrice = document.getElementById('priced');
    jsonPrice.innerHTML = "Price: " + data.nPrice;

    // getting sepia value
    let sepiaJsonVal = document.querySelector('#exampleModal > div > div > div.modal-body > div > p:nth-child(4) > output');
    sepiaJsonVal.innerHTML = data.sepia
    console.log(data.sepia)

    console.log(data.nPrice)
    let image = new Image();
    image.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0); // draw the new image to the screen
    }
    image.src = data.image; // data.image contains the data URL
};

let completeImg = document.getElementById('complete');
completeImg.addEventListener('click', () => {

console.log('clicked')
})
