export default class Select {
  constructor(element) {
    this.element = element;
    this.options = getFormattedOptions(element.querySelectorAll("option"));

    this.customElement = create("div");
    this.labelElement = create("span");
    this.optionsCustomElement = create("ul");
    setupCustomElement(this);
    element.style.display = "none";
    element.after(this.customElement);
  }

  get selectedOption() {
    return this.options.find((option) => option.selected);
  }

  get selectedOptionIndex() {
    return this.options.indexOf(this.selectedOption);
  }

  selectValue(value) {
    const newSelectedOption = this.options.find(
      (option) => option.value === value
    );
    const prevSelectedOption = this.selectedOption;
    prevSelectedOption.selected = false;
    prevSelectedOption.element.selected = false;
    newSelectedOption.selected = true;
    newSelectedOption.element.select = true;
    this.labelElement.innerText = newSelectedOption.label;

    this.optionsCustomElement
      .querySelector(`[data-value="${prevSelectedOption.value}"]`)
      .classList.remove("selected");

    const newCustomElement = this.optionsCustomElement.querySelector(
      `[data-value="${newSelectedOption.value}"]`
    );
    newCustomElement.classList.add("selected");
    newCustomElement.scrollIntoView({ block: "nearest" });
  }
}

const create = (a) => document.createElement(a);
const addClass = (a) => (b) => a.classList.add(b);

function setupCustomElement(select) {
  const {
    customElement,
    labelElement,
    optionsCustomElement,
    options,
    selectValue,
  } = select;

  const toggleClass = (a) => (b) => a.classList.toggle(b);
  const removeClass = (a) => (b) => a.classList.remove(b);
  const node = (el, clazz) => ({ el, clazz });

  customElement.tabIndex = 0;

  [
    node(customElement, "custom-select-container"),
    node(labelElement, "custom-select-value"),
    node(optionsCustomElement, "custom-select-options"),
  ].forEach(({ el, clazz }) => addClass(el)(clazz));

  [labelElement, optionsCustomElement].forEach((a) => customElement.append(a));

  labelElement.innerText = select.selectedOption.label;
  options.forEach(({ selected, label, value }) => {
    const optionElement = create("li");
    addClass(optionElement)("custom-select-option");
    optionElement.classList.toggle("selected", selected);
    optionElement.innerText = label;
    optionElement.dataset.value = value;
    optionElement.addEventListener("click", (e) => {
      selectValue.call(select, value);
      removeClass(optionsCustomElement)("show");
    });
    optionsCustomElement.append(optionElement);
  });

  labelElement.addEventListener("click", (e) => {
    toggleClass(optionsCustomElement)("show");
  });

  customElement.addEventListener("blur", () => {
    removeClass(optionsCustomElement)("show");
  });

  let debounceTimeout;
  let searchTerm = "";

  customElement.addEventListener("keydown", ({ code, key }) => {
    switch (code) {
      case "Space":
        toggleClass(optionsCustomElement)("show");
        break;
      case "ArrowUp":
        const prevOption = select.options[select.selectedOptionIndex - 1];
        prevOption && select.selectValue(prevOption.value);
        break;

      case "ArrowDown": {
        const nextOption = select.options[select.selectedOptionIndex + 1];
        nextOption && select.selectValue(nextOption.value);
        break;
      }
      case "Enter":
      case "Escape":
        removeClass(optionsCustomElement)("show");
        break;

      default:
        clearTimeout(debounceTimeout);
        searchTerm += key;
        debounceTimeout = setTimeout(() => {
          searchTerm = "";
        }, 500);

        console.log(searchTerm);
        const searchedOption = select.options.find((option) => {
          return option.label.toLowerCase().startsWith(searchTerm);
        });
        if (searchedOption) {
          select.selectValue(searchedOption.value);
        }
    }
  });

  console.log(select);
}

function getFormattedOptions(optionElements) {
  return [...optionElements].map(({ value, label, selected }, n, arr) => ({
    value,
    label,
    selected,
    element: arr[n],
  }));
}
