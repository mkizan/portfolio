const technologiesSelect = document.querySelector('#calculator-form-technologies');

const technologiesMultiSelect = new Choices(technologiesSelect, {
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ",",
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: "auto",
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: "No available options",
  itemSelectText: "Click to select",
  classNames: {
    containerInner: "choices__inner tech-input-container",
    input: "choices__input",
  },
});

calculateSum();

const calculatorForm = document.querySelector('.calculator-form');

calculatorForm.addEventListener('submit', function(event) {
  // при нажатии кнопки "Find out the cost" нас не перекидывает наверх сайта
  event.preventDefault();
  // Selects (находим выбранные значения типов сайта)
  const websiteTypeSelect = document.querySelector('#calculator-form-website-type');
  const websiteCart = document.querySelector('#calculator-form-input-cart input:checked');
  const websiteReception = document.querySelector('#calculator-form-input-reception input:checked');

  // console.log(websiteCart.value);
  // console.log(websiteReception.value);

  // Values (вытягиваем значение с типов сайтов)
  const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);
  const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue());
  const websiteCartValue = convertCartOptionToPrice(websiteCart.value);
  const websiteCartReception = convertReceptionOptionToPrice(websiteReception.value);

  console.log(websiteTypeValue);
  console.log(technologiesValue);
  console.log(websiteCartValue);
  console.log(websiteCartReception);

  const totalSum = websiteTypeValue + technologiesValue + websiteCartValue + websiteCartReception;

  renderSum(totalSum);
  
});

// чтобы сумма цены отображалась при входе нужно перезалить функцию события
function calculateSum() {

  // Selects (находим выбранные значения типов сайта)
  const websiteTypeSelect = document.querySelector('#calculator-form-website-type');
  const websiteCart = document.querySelector('#calculator-form-input-cart input:checked');
  const websiteReception = document.querySelector('#calculator-form-input-reception input:checked');

  // console.log(websiteCart.value);
  // console.log(websiteReception.value);

  // Values (вытягиваем значение с типов сайтов)
  const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);
  const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue());
  const websiteCartValue = convertCartOptionToPrice(websiteCart.value);
  const websiteCartReception = convertReceptionOptionToPrice(websiteReception.value);

  const totalSum = websiteTypeValue + technologiesValue + websiteCartValue + websiteCartReception;

  renderSum(totalSum);

}

function renderSum(sum) {
  
  const costElement = document.querySelector('.calculator-form-total-cost');

  // при рассчете суммы будет выдавать вот такое
  costElement.textContent = 'Calculating...'

  // и делаем искуственную задержку, которая через определенное время будет делать то что нам нужно 
  setTimeout(function() {
    costElement.textContent = sum + '$';
  }, 2000);
}

function convertCartOptionToPrice(option) {
  if (option == 'yes') {
    return 300;
  }

  return 0;
}

function convertReceptionOptionToPrice(option) {
  if (option == 'yes') {
    return 500;
  }

  return 0;
}

function getTechnologiesSum(technologiesArr) {

  let totalSum = 0;

  technologiesArr.forEach(function(tech) {
    totalSum = totalSum + extractPriceFromValue(tech.value);
  })

  return totalSum;

}

function extractPriceFromValue(str) {
  const price = str.match(/:\d+/);

  if (price) {
    return Number(price[0].slice(1)) || 0;
  }

  return 0;

}
