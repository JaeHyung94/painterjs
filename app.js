const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700;
canvas.height = 700;

context.strokeStyle = "#2c2c2c";
context.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
    context.stroke();
  }
}

function startPainting() {
  painting = true;
}

function handleColorClick(event) {
  const bgColor = event.target.style.backgroundColor;
  context.strokeStyle = bgColor;
  context.fillStyle = bgColor;
}

function handleBrushSize(event) {
  const brushSize = event.target.value;
  context.lineWidth = brushSize;
}

function handleModeChange(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(color).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

range.addEventListener("change", handleBrushSize);
mode.addEventListener("click", handleModeChange);
