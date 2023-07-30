class Stack {
  constructor() {
    this.arr = [];
    this.index = -1;
  }
  push(item) {
    this.index++;
    this.arr[this.index] = item;
  }
  pop() {
    if (this.index <= 0) return null;
    this.index--;
    const result = this.arr[this.index];
    return result;
  }
}
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
const undoBtn = document.getElementById("undo-btn");

const preview = document.getElementById("preview");
const previewLine = preview.querySelector("#preview__line");
const previewText = preview.querySelector("#preview__text");

const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color"),
  lineWidth = document.getElementById("line-width"),
  canvas = document.querySelector("canvas"),
  canvasTemp = document.getElementById("canvas-tmp"),
  ctx = canvas.getContext("2d"),
  preCtx = preview.getContext("2d"),
  tmpCtx = canvasTemp.getContext("2d");

const customText = document.querySelector(".customText");

const optionMenuFont = document.querySelector(".select-menu__font"),
  selectBtnFont = optionMenuFont.querySelector(".select-btn"),
  optionsFont = optionMenuFont.querySelectorAll(".option"),
  sBtn_textFont = optionMenuFont.querySelector(".sBtn-text");

const optionMenuStyle = document.querySelector(".select-menu__style"),
  selectBtnStyle = optionMenuStyle.querySelector(".select-btn"),
  optionsStyle = optionMenuStyle.querySelectorAll(".option"),
  sBtn_textStyle = optionMenuStyle.querySelector(".sBtn-text");

const CANVAS_WIDTH = 700;
const CANVAS_HEIGTH = 700;
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
let isErasing = false;
let isMoved = true;

let preTextStyle = "normal";
let preTextSize = preCtx.lineWidth * 10;
let preTextFont = "serif";

let startX, startY, currX, currY;
let undoList = new Stack();
