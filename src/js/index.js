import "regenerator-runtime/runtime";
import { DOMSelectors } from "./DOM";

const grabData = async function (query) {
  try {
    const response = await fetch(query);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  const apiID = "95cb0047";
  const apiKey = "40c625a257418ae88ce46895dbab8f15";
  let userInput;

  const displayData = async function () {
    let query = `https://api.edamam.com/search?q=${userInput}&app_id=${apiID}&app_key=${apiKey}`;
    const response = await grabData(query);
    const dataResults = response.hits;
    console.log(dataResults);

    //display data function
    dataResults.forEach(function (recipeInstance) {
      //compile health label array into one string
      let healthLabelsArray = [];
      recipeInstance.recipe.healthLabels.forEach(function (healthLabel) {
        healthLabelsArray.push(healthLabel);
      });

      DOMSelectors.dataBox.innerHTML = "";
      //create each recipe card
      DOMSelectors.dataBox.insertAdjacentHTML(
        "afterbegin",
        `
                <div class="recipe">
                    <a  href="${recipeInstance.recipe.url}">
                        <div class="title">${recipeInstance.recipe.label}</div>
                        <div class="healthLabels">${healthLabelsArray}</div>  
                        <img src="${recipeInstance.recipe.image}" >
                        <div class="link hidden">${recipeInstance.recipe.url}</div>
                        <div class="imgSrc hidden" >${recipeInstance.recipe.image}</div>
                    </a>
                    <div class="saveForLaterBtn" >Save for Later?</div>
                </div>
            `
      );
    });
    saveRecipe();
  };

  //display default data
  displayData();

  //array of favorited recipes
  let savedArray = [];

  const saveRecipe =  function () {
    //array of recipes present at current moment
    const recipeArray = Array.from(document.getElementsByClassName("recipe"));

    //for current recipes on screen, if the save for later btn is clicked, add selected recipe to new array for data to be saved
    recipeArray.forEach(function (recipe) {
      recipe.children[1].addEventListener("click", function () {
        recipe.children[1].classList.add("bold");
        recipe.children[1].innerHTML = "Added to Saved Recipes";

        //get info of favorited recipe
        let savedRecipe = {
          title: recipe.children[0].children[0].textContent,
          labels: recipe.children[0].children[1].textContent,
          link: recipe.children[0].children[3].textContent,
          imgSrc: recipe.children[0].children[4].textContent,
        };

        //push info to save info of favorited recipe
        savedArray.push(savedRecipe);
      });
    });
  };

  const displaySavedRecipes = function () {
    DOMSelectors.favoriteBox.innerHTML = "";
    savedArray.forEach(function (savedRecipe) {
      DOMSelectors.favoriteBox.insertAdjacentHTML(
        "afterbegin",
        `
              <div class="recipe">
                  <a  href="${savedRecipe.link}">
                      <div class="title">${savedRecipe.title}</div>
                      <div class="healthLabels">${savedRecipe.labels}</div>  
                      <img src="${savedRecipe.imgSrc}" >
                  </a>
              </div>
              `
      );
    });
  };

  const toggleRecipeData = function () {
    DOMSelectors.dataBox.classList.toggle("noDisplay");
    DOMSelectors.favoriteBox.classList.toggle("display");
    DOMSelectors.clearFavoriteBtn.classList.toggle("display");

    switch (DOMSelectors.favoriteBtn.innerHTML) {
        case "See Saved Recipes":
            DOMSelectors.favoriteBtn.innerHTML = "Return to Search"
            break;
        default:
            DOMSelectors.favoriteBtn.innerHTML = "See Saved Recipes";
    }
  }

  //switch from search results recipes to favorites recipes
  DOMSelectors.favoriteBtn.addEventListener("click", function () {
    toggleRecipeData();
    displaySavedRecipes();
  });

  //remove favorited(saved) recipes from array
  DOMSelectors.clearFavoriteBtn.addEventListener("click", function () {
    savedArray = [];
    //display newly emptied array
    displaySavedRecipes();
  });

  //submit = keyup enter key
  DOMSelectors.userSearch.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      DOMSelectors.submitBtn.click();
    }
  });

  //display data
  DOMSelectors.submitBtn.addEventListener("click", function () {

    userInput = DOMSelectors.userSearch.value;
    displayData();

  });
};

init();
