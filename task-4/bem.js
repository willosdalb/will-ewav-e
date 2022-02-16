class ClassBuilder {
  constructor() {
    this.combinedBem = "";
    this.block = "";
    this.element = "";
    this.modifier = "";
  }

  blockBem(blockAParam) {
    this.block = blockAParam;
    return this;
  }

  elementBem(elemParam) {
    this.element = !elemParam || elemParam === "" ? "" : elemParam;
    return this;
  }

  modifierBem(modifierParam) {
    this.modifier = !modifierParam || modifierParam == "" ? "" : modifierParam;
    return this;
  }

  buildBem() {
    let builtClassName = "";

    if (this.block === "") {
      this.modifier = "";
      this.element = "";
      throw new Error("No block");
    }

    if (this.block !== "" && this.modifier === "" && this.element === "") {
      builtClassName = `${this.block}`;
    } else if (this.modifier === "") {
      builtClassName = `${this.block}__${this.element}`;
    } else if (this.element === "") {
      builtClassName = `${this.block}--${this.modifier}`;
    } else {
      builtClassName = `${this.block}__${this.element}--${this.modifier}`;
    }

    return builtClassName.replace(/\s/g, "");
  }
}

let classBuilder = new ClassBuilder();

let txtBlock = document.getElementById("txt_block");
let txtElement = document.getElementById("txt_element");
let txtModifier = document.getElementById("txt_modifier");

const btnBuild = document.getElementById("btn_build");
btnBuild.addEventListener("click", (e) => {
  e.preventDefault();

  let result = document.getElementById("result");

  try {
    const builtClassName = classBuilder
      .blockBem(txtBlock.value)
      .elementBem(txtElement.value)
      .modifierBem(txtModifier.value)
      .buildBem();

    result.innerText = `<strong class = "${builtClassName}">Hello World</strong>`;
  } catch (error) {
    txtBlock.value = "";
    txtElement.value = "";
    txtModifier.value = "";
    alert(error);
  }
});
