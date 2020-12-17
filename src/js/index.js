
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

        dataResults.forEach(function(recipeInstance) {
            let healthLabelsArray = [];
            recipeInstance.recipe.healthLabels.forEach(function (healthLabel) {
                healthLabelsArray.push(healthLabel);
            });

            DOMSelectors.dataBox.insertAdjacentHTML("afterbegin",
                `
            <a class="recipe" href="${recipeInstance.recipe.url}">
                <div class="title">${recipeInstance.recipe.label}</div>
                <div>${healthLabelsArray}</div>  
                <img src="${recipeInstance.recipe.image}" >
            </a>
            `
            )

        }
        )
        console.log(userInput);
        console.log(query)
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

