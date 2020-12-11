
import "regenerator-runtime/runtime";

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

const displayData = async function () {
    const apiID = "95cb0047";
    const apiKey = "40c625a257418ae88ce46895dbab8f15";
    let query;
    query = `https://api.edamam.com/search?q=breakfast&app_id=${apiID}&app_key=${apiKey}`;
    const response = await grabData(query);
    const dataResults = response.data;
    console.log (dataResults);

}

displayData();

