const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

context.fillStyle = "white";
context.fillRect(0, 0, 700, 700);
// context.fillStyle = "#2c2c2c";
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

// function stopFill

function startingFill() {
  context.fillRect(0, 0, 700, 700);
}

function handleModeChange(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
    canvas.removeEventListener("click", startingFill);
  } else {
    filling = true;
    mode.innerText = "Paint";
    canvas.addEventListener("click", startingFill);
  }
}

handleContextMenu = event => {
  event.preventDefault();
};

handleSave = () => {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[Export]";
  link.click();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(color).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

range.addEventListener("change", handleBrushSize);
mode.addEventListener("click", handleModeChange);
save.addEventListener("click", handleSave);
