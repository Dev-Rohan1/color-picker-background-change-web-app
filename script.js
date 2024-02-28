var div = null;
let cuastomColor = document.getElementById("custom-card");
console.log(cuastomColor);
window.onload = () => {
  main();
};
let customColorArray = new Array(12);

let main = () => {
  let copySound = new Audio("../copy-sound.wav");
  console.log(copySound);
  let randomColorBtn = document.querySelector(".random-color-btn");
  let hexInput = document.querySelector(".hex-input");
  let rgbInput = document.querySelector(".rgb-input");
  let copyColor = document.querySelector(".copy-color-btn");
  let background = document.querySelector(".background");
  let inputFile = document.querySelector(".input-file");
  let uploadBtn = document.querySelector(".upload-btn");
  let removeBtn = document.querySelector(".remove-btn");
  let presetColor = document.querySelector(".preset-card");
  let saveColorBtn = document.querySelector(".save-color-btn");
  let radioBtns = document.getElementsByName("color-mode");
  colorSliderRed = document.querySelector(".color-slider-red");
  colorSliderGreen = document.querySelector(".color-slider-green");
  colorSliderBlue = document.querySelector(".color-slider-blue");

  document
    .getElementById("bg-size")
    .addEventListener("change", changeBackgroundPreferences);
  document
    .getElementById("bg-repeat")
    .addEventListener("change", changeBackgroundPreferences);
  document
    .getElementById("bg-position")
    .addEventListener("change", changeBackgroundPreferences);
  document
    .getElementById("bg-attachment")
    .addEventListener("change", changeBackgroundPreferences);

  removeBtn.addEventListener("click", function () {
    this.style.display = "none";
    document.body.style.background = "#DDDEEE";
    background.style.background = "#DDDEEE";
    inputFile.value = null;
  });

  uploadBtn.addEventListener("click", function () {
    inputFile.click();
  });

  inputFile.addEventListener("change", function (event) {
    let file = event.target.files[0];
    let imageUrl = URL.createObjectURL(file);
    background.style.background = `url(${imageUrl})`;
    document.body.style.background = `url(${imageUrl})`;
    removeBtn.style.display = "inline";
  });

  saveColorBtn.addEventListener("click", function () {
    let color = `#${hexInput.value}`;
    if (customColorArray.includes(color)) {
      alert("this color is already save");
      return;
    }
    if (customColorArray.length > 11) {
      customColorArray = customColorArray.slice(0, 11);
    }
    customColorArray.unshift(color);
    removeChild(cuastomColor);
    displayColorBoxes(cuastomColor, customColorArray);
    savedate();
  });

  cuastomColor.addEventListener("click", function (e) {
    let event = e.target;
    if (event.className === "preset-box") {
      if (div !== null) {
        div.remove();
        div = null;
      }

      navigator.clipboard.writeText(event.getAttribute("date-color"));
      generateToastMsg(event.getAttribute("date-color"));
      copySound.play();
    }
  });

  presetColor.addEventListener("click", (e) => {
    let event = e.target;
    if (event.className === "preset-box") {
      if (div !== null) {
        div.remove();
        div = null;
      }

      navigator.clipboard.writeText(event.getAttribute("date-color"));
      generateToastMsg(event.getAttribute("date-color"));
      copySound.play();
    }
  });

  copyColor.addEventListener("click", function () {
    let mode = checkRadioBtn(radioBtns);

    if (div !== null) {
      div.remove();
      div = null;
    }

    if (mode === "hex") {
      if (isValidHex(hexInput.value)) {
        generateToastMsg(`#${hexInput.value}`);
        navigator.clipboard.writeText(`#${hexInput.value}`);
      } else {
        alert("invalid color code");
      }
    }
    if (mode === "rgb") {
      if (isValidHex(hexInput.value)) {
        generateToastMsg(`#${rgbInput.value}`);
        navigator.clipboard.writeText(`#${rgbInput.value}`);
      } else {
        alert("invalid color code");
      }
    }
  });

  randomColorBtn.addEventListener("click", function () {
    let color = generateDecimalColor();
    updateColorToDom(color);
  });

  colorSliderRed.addEventListener("change", function () {
    let color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };
    updateColorToDom(color);
  });

  colorSliderGreen.addEventListener("change", function () {
    let color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };
    updateColorToDom(color);
  });

  colorSliderBlue.addEventListener("change", function () {
    let color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };
    updateColorToDom(color);
  });

  hexInput.addEventListener("keyup", function (e) {
    let hexColor = e.target.value;
    if (hexColor) {
      hexInput.value = hexColor.toUpperCase();
      if (isValidHex(hexColor)) {
        let color = hexToDecmalColor(hexColor);
        updateColorToDom(color);
      }
    }
  });

  displayColorBoxes(presetColor, defaultPresetColor);
};

let isValidHex = (color) => {
  if (color.length !== 6) return false;

  return /^[0-9A-Fa-f]{6}$/i.test(color);
};

let generateDecimalColor = () => {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
};

let generateHexColor = ({ red, green, blue }) => {
  let twoCode = (value) => {
    let hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `${twoCode(red)}${twoCode(green)}${twoCode(blue)}`.toUpperCase();
};

let generateRgbColor = ({ red, green, blue }) => {
  return `rgb(${red}, ${green}, ${blue})`;
};

/**
 *
 * @param {string} hex
 */

let hexToDecmalColor = (hex) => {
  let red = parseInt(hex.slice(0, 2), 16);
  let green = parseInt(hex.slice(2, 4), 16);
  let blue = parseInt(hex.slice(4, 6), 16);

  return {
    red,
    green,
    blue,
  };
};

let generateToastMsg = (msg) => {
  div = document.createElement("div");
  div.innerText = msg;
  div.className = "toast-message toast-message-slide-in";

  div.addEventListener("click", function () {
    div.classList.add("toast-message-slide-out");
    div.classList.remove("toast-message-slide-in");

    div.addEventListener("animationend", function () {
      div.remove();
      div = null;
    });
  });

  document.body.appendChild(div);
};

let updateColorToDom = (color) => {
  let hexColor = generateHexColor(color);
  let rgbColor = generateRgbColor(color);

  document.querySelector(".color-display").style.background = `#${hexColor}`;
  document.querySelector(".hex-input").value = hexColor;
  document.querySelector(".rgb-input").value = rgbColor;
  document.querySelector(".red-color-value").innerText = color.red;
  document.querySelector(".green-color-value").innerText = color.green;
  document.querySelector(".blue-color-value").innerText = color.blue;
  document.querySelector(".color-slider-red").value = color.red;
  document.querySelector(".color-slider-green").value = color.green;
  document.querySelector(".color-slider-blue").value = color.blue;
};

let checkRadioBtn = (nodes) => {
  let checkValue = "";
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkValue = nodes[i].value;
      break;
    }
  }

  return checkValue;
};

let generateColorBoxes = (color) => {
  let div = document.createElement("div");
  div.className = "preset-box";
  div.style.backgroundColor = color;
  div.setAttribute("date-color", color);

  return div;
};

let displayColorBoxes = (parent, colors) => {
  colors.forEach((color) => {
    let colorBoxes = generateColorBoxes(color);
    parent.appendChild(colorBoxes);
  });
};

let removeChild = (parent) => {
  let child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
};

let changeBackgroundPreferences = () => {
  document.body.style.backgroundSize = document.getElementById("bg-size").value;
  document.body.style.backgroundRepeat =
    document.getElementById("bg-repeat").value;
  document.body.style.backgroundPosition =
    document.getElementById("bg-position").value;
  document.body.style.backgroundAttachment =
    document.getElementById("bg-attachment").value;
};

let savedate = () => {
  localStorage.setItem("date", cuastomColor.innerHTML);
};

let showDate = () => {
  cuastomColor.innerHTML = localStorage.getItem("date");
};
showDate();
