
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
        response;
        const dataResults = response.hits;
        console.log(dataResults);


        dataResults.forEach(function (recipeInstance) {
            let healthLabelsArray = [];
            recipeInstance.recipe.healthLabels.forEach(function (healthLabel) {
                healthLabelsArray.push(healthLabel);
            });

            DOMSelectors.dataBox.insertAdjacentHTML("afterbegin",
                `
                <div class="recipe">
                    <a  href="${recipeInstance.recipe.url}">
                        <div class="title">${recipeInstance.recipe.label}</div>
                        <div class="healthLabels">${healthLabelsArray}</div>  
                        <img src="${recipeInstance.recipe.image}" >
                        <div class="link hidden">${recipeInstance.recipe.url}</div>
                        <div class="imgSrc hidden" >${recipeInstance.recipe.image}</div>
                    </a>
                
                    <div class="saveForLaterBtn" >Save for Later</div>
                </div>

            `
            )

        }
        )
        console.log(userInput);
        console.log(query)

        const saveBtns = document.getElementsByClassName("saveForLaterBtn");
        const saveForLaterArray = Array.from(saveBtns);

        const recipe = document.getElementsByClassName("recipe");
        const recipeArray = Array.from(recipe);

        console.log(saveForLaterArray);
        console.log(recipeArray);

        const saved = function () {
            let savedArray = [];

            const displaySaved = function () {
                savedArray.forEach(function (savedRecipe) {
                    DOMSelectors.favoriteBox.insertAdjacentHTML("afterbegin",
                        `
                    <div class="recipe">
                        <a  href="${savedRecipe.imgSrc}">
                            <div class="title">${savedRecipe.title}</div>
                            <div class="healthLabels">${savedRecipe.labels}</div>  
                            <img src="${savedRecipe.imgSrc}" >
                        </a>
                    
                    </div>
    
                    `
                    )
                })
            };

            recipeArray.forEach(function (recipe) {
                recipe.children[1].addEventListener("click", function () {
                    recipe.children[1].classList.add("bold");
                    recipe.children[1].innerHTML = "Added to Favorites";

                    let savedRecipe = {
                        "title": recipe.children[0].children[0].textContent,
                        "labels": recipe.children[0].children[1].textContent,
                        "link": recipe.children[0].children[3].textContent,
                        "imgSrc": recipe.children[0].children[4].textContent,

                    }
                    // console.log(savedRecipe);

                    savedArray.push(savedRecipe);
                    console.log(savedArray);
                    displaySaved();

                })
            }
            );


        }
        saved();

        DOMSelectors.favoriteBtn.addEventListener("click", function () {
            DOMSelectors.dataBox.classList.toggle("noDisplay");
            DOMSelectors.favoriteBox.classList.toggle("display")
        }
        )


    };
    displayData();





    DOMSelectors.submitBtn.addEventListener("click", function () {
        userInput = DOMSelectors.userSearch.value;
        displayData();
    });

    DOMSelectors.userSearch.addEventListener("keyup", function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            DOMSelectors.submitBtn.click();
        }
    });

}



init();

