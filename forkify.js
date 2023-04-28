const addRecipe = document.querySelector(".nav-icon");
const model = document.querySelector(".model");
const xIcon = document.querySelector(".x-icon");
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".search-form");
const aside = document.querySelector("aside");
let nbrPages;
let currentPage = 1;

model.style.display = "none";
addRecipe.addEventListener("click", () => {
  model.style.display = "block";
});

xIcon.addEventListener("click", () => {
  model.style.display = "none";
});

const fetchResultPerPage = (recipes) => {
  aside.innerHTML = "";
  recipes.slice((currentPage - 1) * 5, currentPage * 5).forEach((recipe) => {
    aside.innerHTML += `
        <div class="aside-container">
            <img src="${recipe.image_url}" alt="" /> 
            <div>
                <p class="aside-title">${recipe.title}</p>
                <p class="aside-publisher">${recipe.publisher}</p>
            </div>
        </div>`;
  });
  if (currentPage > 1) {
    aside.innerHTML += `<button class="previous">${currentPage - 1}</button>`;
    document.querySelector(".previous").addEventListener("click", () => {
      currentPage--; // currentPage = currentPage - 1
      fetchResultPerPage(recipes);
    });
  }
  if (currentPage < nbrPages) {
    aside.innerHTML += `<button class="next">${currentPage + 1}</button>`;
    document.querySelector(".next").addEventListener("click", () => {
      currentPage++; // currentPage = currentPage + 1
      fetchResultPerPage(recipes);
    });
  }
};
// page 1, 0, 9 slice(0, 10) (1 - 1) - 10, 1 * 10,
// page 2, 10 - 19, slice(10, 20) (2 - 1) * 10,  2 * 10,
// Page 3, slice(20, 30)(3 - 1) * 10,  3 * 10

form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch("https://forkify-api.herokuapp.com/api/search?q=" + inputSearch.value)
    .then((response) => response.json())
    .then((result) => {
      nbrPages = Math.ceil(result.recipes.length / 5);
      fetchResultPerPage(result.recipes);
    });
});
