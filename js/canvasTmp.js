canvasTemp.onmouseup = () => {
  isDrawing = false;
  const canvasImg = canvasTemp.toDataURL();
  const img = new Image();
  img.src = canvasImg;

  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    if (isMoved) {
      console.log("push");
      saveState();
    }
    console.log(isMoved);
    isMoved = false;
    console.log(isMoved);
    tmpCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
  };
};

canvasTemp.onmousemove = (e) => {
  if (!isDrawing) return;
  isMoved = true;
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
