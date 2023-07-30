function onUndoClick() {
  let image = new Image();
  let imagePath = undoList.pop();
  if (imagePath === null) return;

  image.src = imagePath;
  image.onload = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
  };
}

undoBtn.addEventListener("click", onUndoClick);
