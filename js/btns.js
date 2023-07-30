function onLineWidthInput(event) {
  const lineWidthValue = event.target.value;
  ctx.lineWidth = lineWidthValue;
  preCtx.lineWidth = lineWidthValue;
  tmpCtx.lineWidth = lineWidthValue;
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
  tmpCtx.strokeStyle = ctx.strokeStyle;
  tmpCtx.fillStyle = ctx.fillStyle;

  drawPreview();
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  preCtx.strokeStyle = colorValue;
  preCtx.fillStyle = colorValue;
  tmpCtx.strokeStyle = ctx.strokeStyle;
  tmpCtx.fillStyle = ctx.fillStyle;
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
  isShapeTool = false;
  isErasing = true;
  canvasTemp.style.zIndex = isShapeTool ? 10 : -1;

  Array.from(figureBtns.querySelectorAll("button")).forEach((figureBtn) =>
    figureBtn.classList.remove("chosen-btn")
  );
  Array.from(styleBtns.querySelectorAll("button")).forEach((figureBtn) =>
    figureBtn.classList.remove("chosen-btn")
  );
  Array.from(modeBtns.querySelectorAll("button")).forEach((figureBtn) =>
    figureBtn.classList.remove("chosen-btn")
  );
  drawPreview();
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

function onStyleClick() {
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
  isErasing = false;
  drawPreview();
}
function onModeClick() {
  modeBtns
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.toggle("chosen-btn"));

  isText = !isText;
  customText.classList.toggle("customText__act");
  isPainting = false;
  isShapeTool = false;
  canvasTemp.style.zIndex = isShapeTool ? 10 : -1;

  Array.from(figureBtns.querySelectorAll("button")).forEach((figureBtn) =>
    figureBtn.classList.remove("chosen-btn")
  );
  isErasing = false;
  drawPreview();
}

function onCircleClick() {
  isText = false;
  isErasing = false;

  modeBtns.querySelector(".left-btn").classList.add("chosen-btn");
  modeBtns.querySelector(".right-btn").classList.remove("chosen-btn");
  customText.classList.remove("customText__act");

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
  isErasing = false;

  modeBtns.querySelector(".left-btn").classList.add("chosen-btn");
  modeBtns.querySelector(".right-btn").classList.remove("chosen-btn");
  customText.classList.remove("customText__act");

  isFigureCircle = false;
  isFigureSquare = !isFigureSquare;
  isShapeTool = isFigureCircle || isFigureSquare;
  canvasTemp.style.zIndex = isShapeTool ? 10 : -1;

  squareBtn.classList.toggle("chosen-btn");
  circleBtn.classList.remove("chosen-btn");

  drawPreview();
}

fileInput.addEventListener("change", onFileChange);
resetBtn.addEventListener("click", onResetClick);
eraserBtn.addEventListener("click", onEraserClick);
saveBtn.addEventListener("click", onSaveClick);

lineWidth.addEventListener("change", onLineWidthChange);
lineWidth.addEventListener("input", onLineWidthInput);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtns.addEventListener("click", onModeClick);
styleBtns.addEventListener("click", onStyleClick);

circleBtn.addEventListener("click", onCircleClick);
squareBtn.addEventListener("click", onSquareClick);
