const figureBtns = document.getElementById("figure-btns");
const circleBtn = figureBtns.querySelector(".left-btn");
const squareBtn = figureBtns.querySelector(".right-btn");
const modeBtns = document.getElementById("mode-btns");
const styleBtns = document.getElementById("style-btns");
const saveBtn = document.getElementById("save-btn");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const resetBtn = document.getElementById("reset-btn");

const preview = document.getElementById("preview");
const previewLine = preview.querySelector("#preview__line");
const previewText = preview.querySelector("#preview__text");

const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const canvasTemp = document.getElementById("canvas-tmp");
const ctx = canvas.getContext("2d");
const preCtx = preview.getContext("2d");
const tmpCtx = canvasTemp.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGTH = 800;
const PREVIEW_WIDTH = 300;
const PREVIEW_HEIGTH = 250;

const lenLineWidthInput = lineWidth.offsetWidth * 2;
const borderRadiusLineWidthInput = parseInt(
  window.getComputedStyle(lineWidth).borderRadius
);

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGTH;
canvasTemp.width = CANVAS_WIDTH;
canvasTemp.height = CANVAS_HEIGTH;
preview.width = PREVIEW_WIDTH;
preview.height = PREVIEW_HEIGTH;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
ctx.textAlign = "center";
preCtx.lineWidth = lineWidth.value;
preCtx.lineCap = "round";
preCtx.textAlign = "center";
tmpCtx.lineWidth = lineWidth.value;
tmpCtx.lineCap = "round";
tmpCtx.textAlign = "center";

let isShapeTool = false;
let isPainting = false;
let isFilling = false;
let isText = false;
let isFigureCircle = false;
let isFigureSquare = false;
let eraseColor = "white";
let isDrawing = false;

let preTextStyle = "normal";
let preTextSize = preCtx.lineWidth * 10;
let preTextFont = "serif";

let startX, startY, currX, currY;

drawPreview();
function drawPreview() {
  preCtx.clearRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGTH);

  if (isText) {
    preCtx.clearRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGTH);
    const text = "Abc";
    const textWidth = PREVIEW_WIDTH / 2;
    const textHeight = PREVIEW_HEIGTH / 2 + preCtx.lineWidth * 5;
    preTextSize = preCtx.lineWidth * 10 + 30;
    preCtx.font = `${preTextStyle} ${preTextSize}px ${preTextFont}`;
    preCtx.lineWidth /= 2;
    if (isFilling) {
      preCtx.fillText(text, textWidth, textHeight);
    } else {
      preCtx.strokeText(text, textWidth, textHeight);
    }
    preCtx.lineWidth *= 2;
  } else if (isShapeTool) {
    preCtx.clearRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGTH);
    if (isFigureSquare) {
      if (isFilling) {
        preCtx.fillRect(
          PREVIEW_WIDTH / 3,
          PREVIEW_HEIGTH / 3,
          PREVIEW_WIDTH / 3,
          PREVIEW_HEIGTH / 3
        );
      } else {
        preCtx.strokeRect(
          PREVIEW_WIDTH / 3,
          PREVIEW_HEIGTH / 3,
          PREVIEW_WIDTH / 3,
          PREVIEW_HEIGTH / 3
        );
      }
    } else {
      preCtx.arc(
        PREVIEW_WIDTH / 2,
        PREVIEW_HEIGTH / 2,
        PREVIEW_HEIGTH / 4,
        0,
        2 * Math.PI
      );
      if (isFilling) {
        preCtx.fill();
      } else {
        preCtx.stroke();
      }
    }
  } else if (isFilling) {
    preCtx.fillRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGTH);
  } else {
    console.log("else");
    preCtx.clearRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGTH);
    preCtx.moveTo(100, 150);
    preCtx.lineTo(120, 100);
    preCtx.lineTo(140, 150);
    preCtx.lineTo(160, 100);
    preCtx.lineTo(180, 150);
    preCtx.lineTo(200, 100);
    preCtx.stroke();
  }
}
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    if (isFilling) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onMouseDown(event) {
  if (isText) {
    const text = textInput.value;
    if (text !== "") {
      ctx.font = `${preTextStyle} ${preTextSize}px ${preTextFont}`;
      ctx.lineWidth /= 3;
      if (isFilling) {
        ctx.fillText(text, event.offsetX, event.offsetY);
      } else {
        ctx.strokeText(text, event.offsetX, event.offsetY);
      }
      ctx.lineWidth *= 3;
    }
    return;
  }
  isPainting = true;
}
function onMouseUp(event) {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthInput(event) {
  const lineWidthValue = event.target.value;
  preCtx.lineWidth = lineWidthValue;
  drawPreview();
  const subMaxMin =
    event.target.attributes.max.value - event.target.attributes.min.value;
  const gradient_value =
    (event.target.value - event.target.attributes.min.value) / subMaxMin;
  const boundaryLineWidthInput =
    (((lenLineWidthInput - 2 * borderRadiusLineWidthInput) * gradient_value +
      borderRadiusLineWidthInput) *
      100) /
    lenLineWidthInput;
  event.target.style.background = `linear-gradient(to right, skyblue 0%, \
        skyblue ${boundaryLineWidthInput}%, \
        rgb(236, 236, 236) ${boundaryLineWidthInput}%, \
        rgb(236, 236, 236) 100%)`;
}
function onLineWidthChange(event) {
  const lineWidthValue = event.target.value;
  ctx.lineWidth = lineWidthValue;
  preCtx.lineWidth = lineWidthValue;
  tmpCtx.lineWidth = lineWidthValue;
  drawPreview();
}
function onColorChange(event) {
  const colorValue = event.target.value;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  preCtx.strokeStyle = colorValue;
  preCtx.fillStyle = colorValue;
  tmpCtx.strokeStyle = colorValue;
  tmpCtx.fillStyle = colorValue;
  drawPreview();
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  preCtx.strokeStyle = colorValue;
  preCtx.fillStyle = colorValue;
  tmpCtx.strokeStyle = colorValue;
  tmpCtx.fillStyle = colorValue;
  color.value = colorValue;
  drawPreview();
}

function onResetClick() {
  const result = confirm("Are you sure you want to reset?");
  if (result === true) {
    ctx.fillStyle = "white";
    color.value = "black";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
  } else {
    alert("You clicked cancel.");
  }
}
function onEraserClick() {
  ctx.strokeStyle = eraseColor;
  isFilling = false;
  isText = false;
}
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    fileInput.value = null;
  };
}
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}
function onStyleClick(event) {
  styleBtns
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.toggle("chosen-btn"));

  if (isFilling) {
    isFilling = false;
    canvas.id = "pencil";
  } else {
    isFilling = true;
    canvas.id = "paint";
  }
  drawPreview();
}
function onModeClick(event) {
  modeBtns
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.toggle("chosen-btn"));

  isText = !isText;
  isPainting = false;
  drawPreview();
}
function onDoubleClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    eraseColor = ctx.fillStyle;
    return;
  }
}

function onCircleClick() {
  isText = false;
  modeBtns.querySelector(".left-btn").classList.add("chosen-btn");
  modeBtns.querySelector(".right-btn").classList.remove("chosen-btn");

  isFigureCircle = !isFigureCircle;
  isFigureSquare = false;
  isShapeTool = isFigureCircle || isFigureSquare;
  canvasTemp.style.zIndex = isShapeTool ? 10 : -1;

  circleBtn.classList.toggle("chosen-btn");
  squareBtn.classList.remove("chosen-btn");

  drawPreview();
}
function onSquareClick() {
  isText = false;
  modeBtns.querySelector(".left-btn").classList.add("chosen-btn");
  modeBtns.querySelector(".right-btn").classList.remove("chosen-btn");

  isFigureCircle = false;
  isFigureSquare = !isFigureSquare;
  isShapeTool = isFigureCircle || isFigureSquare;
  canvasTemp.style.zIndex = isShapeTool ? 10 : -1;

  squareBtn.classList.toggle("chosen-btn");
  circleBtn.classList.remove("chosen-btn");

  drawPreview();
}

canvasTemp.onmouseup = () => {
  isDrawing = false;
  const canvasImg = canvasTemp.toDataURL();
  const img = new Image();
  img.src = canvasImg;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    tmpCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
  };
};

canvasTemp.onmousemove = (e) => {
  if (!isDrawing) return;
  tmpCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
  currX = e.offsetX;
  currY = e.offsetY;
  if (isFigureSquare) {
    if (isFilling) {
      tmpCtx.fillRect(startX, startY, currX - startX, currY - startY);
    } else {
      tmpCtx.strokeRect(startX, startY, currX - startX, currY - startY);
    }
  } else {
    tmpCtx.beginPath();
    const radius = Math.sqrt(
      Math.pow(startX - currX, 2) + Math.pow(startY - currY, 2)
    );
    tmpCtx.arc(startX, startY, radius, 0, 2 * Math.PI);
    if (isFilling) {
      tmpCtx.fill();
    } else {
      tmpCtx.stroke();
    }
  }
};

canvasTemp.onmousedown = (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
};

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
fileInput.addEventListener("change", onFileChange);

resetBtn.addEventListener("click", onResetClick);
eraserBtn.addEventListener("click", onEraserClick);
saveBtn.addEventListener("click", onSaveClick);
lineWidth.addEventListener("input", onLineWidthInput);
modeBtns.addEventListener("click", onModeClick);
styleBtns.addEventListener("click", onStyleClick);

circleBtn.addEventListener("click", onCircleClick);
squareBtn.addEventListener("click", onSquareClick);
