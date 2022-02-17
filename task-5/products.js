let products = [];

// Utils
function roundToDecimalPlaces(num) {
  return num.toFixed(2);
}

function isEmpty(val) {
  return val !== "" && val !== undefined && val.length > 0 && val !== null;
}

// Get All Products

async function getAllProducts() {
  const result = await fetch("./products.json");
  return await result.json();
}

async function loadProductsToTable(productsParam) {
  const tbody = document.querySelector("tbody");

  if (!productsParam || productsParam.length < 1) {
    products = await getAllProducts();
  } else {
    products = productsParam;
  }

  let rows = "";

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  for (product of products) {
    rows += ` <tr>
    <td>${product.rowNumber}</td>
      <td>${product.category}</td> 
      <td>${product.productName}</td> 
      <td>${product.price}</td>
      <td>${product.manufacturer}</td>
      <td>${product.productionDate}</td>
    </tr>`;
  }

  tbody.insertAdjacentHTML("beforeend", rows);
}

// Total Quantity
async function getTotalQuantity() {
  let products = await getAllProducts();

  return products.length;
}

async function displayQuantity() {
  const totalQuantity = document.querySelector(".total_quantity");
  totalQuantity.innerText = await getTotalQuantity();
}

// Total Cost

async function getTotalCost() {
  let products = await getAllProducts();

  const totalCost = products.reduce((a, b) => ({
    price: parseFloat(a.price) + parseFloat(b.price),
  }));

  return totalCost;
}

async function displayTotalCost() {
  const totalCostWrapper = document.querySelector(".total_cost_wrapper");
  let totalCost = await getTotalCost();

  let spanElement = document.createElement("span");
  spanElement.innerText = roundToDecimalPlaces(totalCost.price);
  totalCostWrapper.appendChild(spanElement);
}

// AveragePrice

async function getAveragePrice() {
  let totalCost = await getTotalCost();
  let totalQuantity = await getTotalQuantity();
  let averagePrice = totalCost.price / totalQuantity;

  return averagePrice;
}

async function displayAveragePRice() {
  const average_price = document.querySelector(".average_price");

  let spanElement = document.createElement("span");
  spanElement.innerText = roundToDecimalPlaces(await getAveragePrice());
  average_price.appendChild(spanElement);
}

// Max Price

async function getMaxPrice() {
  let products = await getAllProducts();

  let result = products.reduce(function (a, b) {
    return a.price > b.price ? a : b;
  }, {});

  return result;
}

async function displayMaxPrice() {
  const maxPrice = document.querySelector(".max_price");

  const product = await getMaxPrice();

  let priceElement = document.createElement("span");
  priceElement.innerText = roundToDecimalPlaces(parseFloat(product.price));
  maxPrice.appendChild(priceElement);

  let productNameElement = document.createElement("span");
  productNameElement.innerText = product.productName;
  maxPrice.appendChild(productNameElement);
}

// Max Price

async function getMinPrice() {
  let products = await getAllProducts();

  let result = products.reduce(function (a, b) {
    return a.price < b.price ? a : b;
  }, {});

  return result;
}

async function displayMinPrice() {
  const minPrice = document.querySelector(".min_price");

  const product = await getMinPrice();

  let priceElement = document.createElement("span");
  priceElement.innerText = roundToDecimalPlaces(parseFloat(product.price));
  minPrice.appendChild(priceElement);

  let productNameElement = document.createElement("span");
  productNameElement.innerText = product.productName;
  minPrice.appendChild(productNameElement);
}

// Categories

async function getAllCategories() {
  let products = await getAllProducts();

  let productsCategories = products.map(function (a) {
    return a.category;
  }, {});

  var uniqueCategories = [...new Set(productsCategories)];

  return uniqueCategories;
}

async function displayAllCategories() {
  const categoryBoxes = document.querySelector(".category_boxes");

  const categories = await getAllCategories();

  let categoriesHtml = "";

  categories.forEach((category) => {
    categoriesHtml += `<div>
          <input type="checkbox" id="${category}" name="${category}" value="${category}">
          <label for="${category}">${category}</label>
        </div>`;
  });

  categoryBoxes.insertAdjacentHTML("beforeend", categoriesHtml);
}

// Categories

async function getAllManufacturers() {
  let products = await getAllProducts();

  let productsManaufacturers = products.map(function (a) {
    return a.manufacturer;
  }, {});

  var uniqueManufacturers = [...new Set(productsManaufacturers)];

  return uniqueManufacturers;
}

async function displayAllManufacturers() {
  const manufacturerBoxes = document.querySelector(".manufacturer_boxes");

  const manufacturers = await getAllManufacturers();

  let manufacturersHtml = "";

  manufacturers.forEach((manufacturer) => {
    manufacturersHtml += `<div>
          <input type="checkbox" id="${manufacturer}" name="${manufacturer}" value="${manufacturer}">
          <label for="${manufacturer}">${manufacturer}</label>
        </div>`;
  });

  manufacturerBoxes.insertAdjacentHTML("beforeend", manufacturersHtml);
}

// Sort products

let sortDirection = "asc";

async function sortProducts(products, sortByPropertyName) {
  let sortedProducts = [];

  if (sortDirection === "asc") {
    if (sortByPropertyName === "price" || sortByPropertyName === "rowNumber") {
      sortedProducts = products.sort(
        (a, b) => a[sortByPropertyName] - b[sortByPropertyName]
      );
    } else if (sortByPropertyName === "productionDate") {
      sortedProducts = products.sort(
        (a, b) =>
          new Date(a[sortByPropertyName]) - new Date(b[sortByPropertyName])
      );
    } else {
      sortedProducts = products.sort((a, b) =>
        a[sortByPropertyName].localeCompare(b[sortByPropertyName])
      );
    }
    sortDirection = "desc";
  } else if (sortDirection === "desc") {
    if (sortByPropertyName === "price" || sortByPropertyName === "rowNumber") {
      sortedProducts = products.sort(
        (a, b) => b[sortByPropertyName] - a[sortByPropertyName]
      );
    } else if (sortByPropertyName === "productionDate") {
      sortedProducts = products.sort(
        (a, b) =>
          new Date(b[sortByPropertyName]) - new Date(a[sortByPropertyName])
      );
    } else {
      sortedProducts = products.sort((a, b) =>
        b[sortByPropertyName].localeCompare(a[sortByPropertyName])
      );
    }
    sortDirection = "asc";
  }

  loadProductsToTable(sortedProducts);
}

displayQuantity();
displayTotalCost();
displayAveragePRice();
displayMaxPrice();
displayMinPrice();

displayAllCategories();
displayAllManufacturers();

loadProductsToTable();

let table = document.querySelector("table");
table.addEventListener("click", async (e) => {
  if (e.target.classList.contains("header")) {
    sortProducts(products, e.target.dataset.header);
  }
});

function togglePanel() {
  const sidePanelOptions = document.getElementById("side_panel_options");
  sidePanelOptions.classList.toggle("side_panel_hide");
}

document.getElementById("btn_options").addEventListener("click", (e) => {
  togglePanel();
});

document.querySelector(".close_sidebar").addEventListener("click", (e) => {
  togglePanel();
});

document.getElementById("btn_apply").addEventListener("click", async (e) => {
  e.preventDefault();

  products = await getAllProducts();

  let categoriesChecked = Array.from(
    document.querySelectorAll(".category_boxes input[type='checkbox']:checked")
  ).map((elem) => elem.value);

  let manufacturersChecked = Array.from(
    document.querySelectorAll(
      ".manufacturer_boxes input[type='checkbox']:checked"
    )
  ).map((elem) => elem.value);

  let highestPrice = document.getElementById("txt_highest_price").value;
  let lowestPrice = document.getElementById("txt_lowest_price").value;

  if (!isEmpty(highestPrice) || !lowestPrice) {
    if (isEmpty(highestPrice) && isEmpty(lowestPrice)) {
      alert("Highest Price and Lowest Price must have a value");
      return;
    }
  }

  let searchedProducts = products.filter(
    (product) =>
      categoriesChecked.includes(product.category) ||
      manufacturersChecked.includes(product.manufacturer) ||
      (parseFloat(highestPrice) > parseFloat(product.price) &&
        parseFloat(lowestPrice) < parseFloat(product.price))
  );

  loadProductsToTable(searchedProducts);

  togglePanel();
});

let btnReset = document.getElementById("btn_reset");

btnReset.addEventListener("click", async (e) => {
  products = [];
  products = await getAllProducts();

  document
    .querySelectorAll("input[type=checkbox]")
    .forEach((el) => (el.checked = false));

  document
    .querySelectorAll("input[type=text]")
    .forEach((el) => (el.value = ""));

  loadProductsToTable(products);
  togglePanel();
});
