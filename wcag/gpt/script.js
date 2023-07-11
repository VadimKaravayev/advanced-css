const comboboxInput = document.querySelector("#combobox-input");
const comboboxButton = document.querySelector("#combobox-button");
const comboboxOptions = document.querySelector("#combobox-options");
let selectedOption = comboboxOptions.firstElementChild;

comboboxButton.addEventListener("click", function () {
  const isExpanded = comboboxInput.getAttribute("aria-expanded") === "true";
  comboboxInput.setAttribute("aria-expanded", !isExpanded);
  comboboxOptions.setAttribute("aria-hidden", isExpanded);
});

comboboxOptions.addEventListener("click", function (event) {
  comboboxInput.value = event.target.textContent;
  comboboxInput.setAttribute("aria-expanded", false);
  comboboxOptions.setAttribute("aria-hidden", true);
  selectedOption.classList.remove("selected");
  selectedOption = event.target;
  selectedOption.classList.add("selected");
});

comboboxInput.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      comboboxInput.setAttribute("aria-expanded", true);
      comboboxOptions.setAttribute("aria-hidden", false);
      if (selectedOption.nextElementSibling) {
        selectedOption.classList.remove("selected");
        selectedOption = selectedOption.nextElementSibling;
        selectedOption.classList.add("selected");
      }
      break;
    case "ArrowUp":
      event.preventDefault();
      comboboxInput.setAttribute("aria-expanded", true);
      comboboxOptions.setAttribute("aria-hidden", false);
      if (selectedOption.previousElementSibling) {
        selectedOption.classList.remove("selected");
        selectedOption = selectedOption.previousElementSibling;
        selectedOption.classList.add("selected");
      }
      break;
    case "Enter":
      comboboxInput.value = selectedOption.textContent;
      comboboxInput.setAttribute("aria-expanded", false);
      comboboxOptions.setAttribute("aria-hidden", true);
      break;
    case "Escape":
      comboboxInput.setAttribute("aria-expanded", false);
      comboboxOptions.setAttribute("aria-hidden", true);
      break;
  }
});

comboboxOptions.firstElementChild.classList.add("selected");
