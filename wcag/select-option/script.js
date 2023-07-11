const selectorLabel = document.querySelector(".selector-label");
const log =
  (label) =>
  ({ target: { value } }) =>
    console.log(label, value);
selectorLabel.addEventListener("change", log("change"));

// prevent dropdown from showing.
// dropdown shows on mousedown
selectorLabel.addEventListener("mousedown", (e) => {
  e.preventDefault();
  const selector = e.currentTarget.querySelector(".selector");
  //creating dropdown
  const dropdown = document.createElement("ul");
  dropdown.className = "selector-options";
  [...selector.children].forEach((option) => {
    const dropdownOption = document.createElement("li");
    dropdownOption.textContent = option.textContent;

    dropdownOption.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      selector.value = option.value;
      selectorLabel.value = option.value;
      selector.dispatchEvent(new Event("change"));
      selectorLabel.dispatchEvent(new Event("change"));
      dropdown.remove();
    });

    dropdown.appendChild(dropdownOption);
  });
  selectorLabel.appendChild(dropdown);

  document.addEventListener("click", (e) => {
    if (!selectorLabel.contains(e.target)) {
      dropdown.remove();
    }
  });
});
