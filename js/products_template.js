var santiseCategoryName = (text) => {
  return text.replace("™", "");
};

var hideRows = (tableEl, filterClicked) => {
  tableEl.forEach((row) => {
    let rowCategory = santiseCategoryName(row.dataset.category);
    if (filterClicked != rowCategory) {
      row.parentElement.parentElement.style.display = "none";
    } else {
      row.parentElement.parentElement.style.display = "block";
    }
  });
};

var filterClick = (button) => {
  let container = button.parentElement.parentElement;
  let filterClicked = button.dataset.filter;
  let consumableTableRows = container.querySelectorAll(`.table-row .row-inner`);
  container.querySelectorAll(`.filter-button.active`).forEach((btn) => {
    btn.classList.remove("active");
  });
  button.classList.add("active");

  hideRows(consumableTableRows, filterClicked);
};

let tableSetup = (filters, container, firstButtonName) => {
  filters = filters.split(",");
  if (filters.length > 1) {
    let filterOutput = document.querySelector(container);
    filters.forEach((filter, i) => {
      filter = filter.trim().replace("™", "");
      if (i == 0 && firstButtonName == null) firstButtonName = filter;
      let button = `<button class="button filter-button ${
        i == 0 ? "active" : ""
      }" data-filter="${filter}" onclick="filterClick(this)">${
        i == 0 ? firstButtonName : filter
      }</button>`;
      filterOutput.innerHTML += button;
    });

    hideRows(
      filterOutput.parentElement.querySelectorAll(".table-row .row-inner"),
      santiseCategoryName(filters[0])
    );
  }
};
