(function () {
  let prevA, prevB, prevC;
  function sum(a, b, c) {
    let btn_sum = document.getElementById("btn_sum");
    console.log("Here", a, b, c, prevA);

    if (a && b && c) {
      prevA = a;
      prevB = b;
      prevC = c;
      return a + b + c;
    }

    if (!a || !b || !c) {
      if (!a && b && c && prevA) {
        console.log("missing a");
        return parseInt(prevA) + parseInt(b) + parseInt(c);
      }

      if (!b && a && c && prevB) {
        return prevB + a + c;
      }

      if (!c && b && a && prevC) {
        return prevC + b + a;
      }

      if (!a && !b && c && prevA && prevB) {
        return prevA + prevB + c;
      }

      if (!a && !c && b && prevA && prevC) {
        return prevA + prevC + b;
      }

      if (!b && !c && a && prevB && prevC) {
        return prevB + prevC + a;
      }
    }
  }

  btn_sum.addEventListener("click", (e) => {
    e.preventDefault();
    let inputA = document.getElementById("a").value
      ? parseInt(document.getElementById("a").value)
      : null;
    let inputB = document.getElementById("b").value
      ? parseInt(document.getElementById("b").value)
      : null;
    let inputC = document.getElementById("c").value
      ? parseInt(document.getElementById("c").value)
      : null;

    document.getElementById("answer").value = sum(inputA, inputB, inputC);
  });
})();
