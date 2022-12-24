document.body.addEventListener("keyup", (e) => {
  const { key } = e;
  if (key === "Tab") {
    const el = document.querySelector(":focus");
    console.log(el);
  }
});

const SelectActions = {
  Close: 0,
  CloseSelect: 1,
  Next: 4,
  Open: 5,
  Previous: 8,
  Select: 9,
};

function getActionFromKey(event, menuOpen) {
  const { key } = event;
  if (!menuOpen && ["Enter", "ArrowDown", "ArrowUp", " "].includes(key)) {
    return SelectActions.Open;
  }

  if (menuOpen) {
    if (key === "ArrowDown") {
      return SelectActions.Next;
    } else if (key === "ArrowUp") {
      return SelectActions.Previous;
    } else if (key === "Escape") {
      return SelectActions.Close;
    } else if (key === "Enter") {
      return SelectActions.CloseSelect;
    }
  }
}

function getUpdatedIndex(currentIndex, maxIndex, action) {
  switch (action) {
    case SelectActions.Previous:
      return Math.max(0, currentIndex - 1);
    case SelectActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
    default:
      return currentIndex;
  }
}

function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

function maintainScrollVisibility(activeElement, scrollParent) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}

const Select = function (el) {
  this.el = el;
  this.comboEl = el.querySelector("[role=combobox]");
  this.listboxEl = el.querySelector("[role=listbox]");

  this.idBase = this.comboEl.id || "combo";
  this.options = [...el.querySelectorAll("[role=option")].map(
    (o) => o.textContent
  );

  this.activeIndex = 0;
  this.open = false;

  if (el && this.comboEl && this.listboxEl) {
    this.init();
  }
};

Select.prototype.init = function () {
  this.comboEl.innerHTML = this.options[0];

  this.comboEl.addEventListener("click", this.onComboClick.bind(this));
  this.comboEl.addEventListener("keydown", this.onComboKeyDown.bind(this));

  this.el.querySelectorAll("[role=option]").forEach((option, index) => {
    option.addEventListener("click", () => this.onOptionClick(index));
  });
};

Select.prototype.onComboClick = function () {
  this.updateMenuState(!this.open, false);
};

Select.prototype.onComboKeyDown = function (event) {
  const { key } = event;
  const max = this.options.length - 1;
  console.log(key);

  const action = getActionFromKey(event, this.open);

  switch (action) {
    case SelectActions.Next:
    case SelectActions.Previous:
      event.preventDefault();
      return this.onOptionChange(
        getUpdatedIndex(this.activeIndex, max, action)
      );
    case SelectActions.CloseSelect:
      event.preventDefault();
      this.selectOption(this.activeIndex);
    case SelectActions.Close:
      event.preventDefault();
      return this.updateMenuState(false);
    case SelectActions.Open:
      event.preventDefault();
      return this.updateMenuState(true);
  }
};

Select.prototype.onOptionClick = function (index) {
  this.onOptionChange(index);
  this.selectOption(index);
  this.updateMenuState(false);
};

Select.prototype.onOptionChange = function (index) {
  const prevActiveId = `${this.idBase}-${this.activeIndex}`;
  const currActiveId = `${this.idBase}-${index}`;
  this.activeIndex = index;
  this.comboEl.setAttribute("aria-activedescendant", currActiveId);
  document.getElementById(prevActiveId).classList.remove("option-current");
  const activeOption = document.getElementById(currActiveId);
  activeOption.classList.add("option-current");

  if (isScrollable(this.listboxEl)) {
    console.log(activeOption);
    maintainScrollVisibility(activeOption, this.listboxEl);
  }
};

Select.prototype.selectOption = function (index) {
  this.activeIndex = index;
  this.comboEl.innerHTML = this.options[index];
  const options = this.el.querySelectorAll("[role=option]");
  options.forEach((option) => option.setAttribute("aria-selected", false));
  options[index].setAttribute("aria-selected", true);
};

Select.prototype.updateMenuState = function (open, callFocus = true) {
  this.open = open;

  this.comboEl.setAttribute("aria-expanded", open);
  this.el.classList.toggle("open");

  const activeID = open ? `${this.idBase}-${this.activeIndex}` : "";
  this.comboEl.setAttribute("aria-activedescendant", activeID);
  callFocus && this.comboEl.focus();
};

window.addEventListener("load", function () {
  const selectEls = document.querySelectorAll(".js-select");

  selectEls.forEach((el) => {
    new Select(el);
  });
});
