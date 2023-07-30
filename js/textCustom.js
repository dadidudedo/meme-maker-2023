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
