console.log(isMoved);
saveState();
console.log(isMoved);

drawPreview();
function drawPreview() {
  preCtx.clearRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGTH);
  if (isText) {
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
  } else if (!isErasing) {
    preCtx.moveTo(100, 150);
    preCtx.lineTo(120, 100);
    preCtx.lineTo(140, 150);
    preCtx.lineTo(160, 100);
    preCtx.lineTo(180, 150);
    preCtx.lineTo(200, 100);
    preCtx.stroke();
  }
  preCtx.beginPath();
}
function onMove(event) {
  if (isPainting) {
    isMoved = true;
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
      isMoved = true;
      ctx.font = `${preTextStyle} ${preTextSize}px ${preTextFont}`;
      ctx.lineWidth /= 2;
      if (isFilling) {
        ctx.fillText(text, event.offsetX, event.offsetY);
      } else {
        ctx.strokeText(text, event.offsetX, event.offsetY);
      }
      ctx.lineWidth *= 2;
    }
    return;
  }
  isPainting = true;
}
function onMouseUp() {
  isPainting = false;
  ctx.beginPath();
}
function onDoubleClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    eraseColor = ctx.fillStyle;
    return;
  }
}
function saveState() {
  if (isMoved) {
    console.log("push");
    undoList.push(canvas.toDataURL());
  }
  console.log(isMoved);
  isMoved = false;
  console.log(isMoved);
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseup", saveState);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("dblclick", onDoubleClick);
