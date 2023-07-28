const optionMenuFont = document.querySelector(".select-menu__font"),
  selectBtnFont = optionMenuFont.querySelector(".select-btn"),
  optionsFont = optionMenuFont.querySelectorAll(".option"),
  sBtn_textFont = optionMenuFont.querySelector(".sBtn-text");

selectBtnFont.addEventListener("click", () =>
  optionMenuFont.classList.toggle("active")
);

optionsFont.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_textFont.innerText = selectedOption;
    preTextFont = selectedOption;
    optionMenuFont.classList.remove("active");
    drawPreview();
  });
});

const optionMenuStyle = document.querySelector(".select-menu__style"),
  selectBtnStyle = optionMenuStyle.querySelector(".select-btn"),
  optionsStyle = optionMenuStyle.querySelectorAll(".option"),
  sBtn_textStyle = optionMenuStyle.querySelector(".sBtn-text");

selectBtnStyle.addEventListener("click", () =>
  optionMenuStyle.classList.toggle("active")
);

optionsStyle.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_textStyle.innerText = selectedOption;
    preTextStyle = selectedOption;
    optionMenuStyle.classList.remove("active");
    drawPreview();
  });
});
