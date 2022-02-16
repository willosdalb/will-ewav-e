(function () {
  function createColorManager(colorPicked) {
    let colors = ["#DDD026", "#36D42E", "#0059F8", "#FF56E7", "#CA3A51"];
    let boxes = document.getElementsByClassName("box");
    let currentColorIndex = 0;

    function changeColor(colorIndex) {
      for (const box of boxes) {
        box.style.border = "none";
        if (box.dataset.color === colors[colorIndex]) {
          box.style.border = ".5rem #23252E solid";
        }
      }
    }

    function setDefaultColor() {
      for (let index = 0; index < boxes.length; index++) {
        boxes[index].style.border = "none";
        if (boxes[index].dataset.color === colorPicked) {
          boxes[index].style.border = ".5rem #23252E solid";
        }

        if (boxes[index].dataset.color === colorPicked) {
          currentColorIndex = index;
        }
      }
    }

    return {
      get() {
        console.log(colors[currentColorIndex]);
        return colors[currentColorIndex];
      },
      next() {
        if (currentColorIndex < colors.length - 1) {
          currentColorIndex++;
          let result = changeColor(currentColorIndex);
          return result;
        }
      },
      prev() {
        if (currentColorIndex > 0) {
          currentColorIndex--;
          changeColor(currentColorIndex);
        }
      },
      reset() {
        setDefaultColor();
      },
    };
  }

  const wrapper_box = document.getElementById("wrapper_box");
  let colorManager;

  function setSelectedBoxColor() {
    const selected_color = document.querySelector(".selected_color");
    selected_color.style.backgroundColor = colorManager.get();
  }

  wrapper_box.addEventListener("click", (e) => {
    if (e.target.classList.contains("box")) {
      colorManager = createColorManager(e.target.dataset.color);
      colorManager.reset();
      setSelectedBoxColor();
    }
  });

  const nxt_color = document.getElementById("nxt_color");

  nxt_color.addEventListener("click", (e) => {
    e.preventDefault();
    colorManager.next();
    setSelectedBoxColor();
  });

  const prev_color = document.getElementById("prev_color");

  prev_color.addEventListener("click", (e) => {
    e.preventDefault();
    colorManager.prev();
    setSelectedBoxColor();
  });

  const reset_color = document.getElementById("reset_color");

  reset_color.addEventListener("click", (e) => {
    e.preventDefault();
    colorManager.reset();

    setSelectedBoxColor();
  });
})();
