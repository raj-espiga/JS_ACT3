const loadDataButton = document.getElementById("loadDataButton");
const clearTableButton = document.getElementById("clearTableButton");
const dataDisplay = document.getElementById("dataDisplay");
const apiInfo = document.getElementById("apiInfo");

loadDataButton.addEventListener("click", async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/todos/";
    apiInfo.style.display = "block";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        displayData(fetchedData);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

clearTableButton.addEventListener("click", () => {
    dataDisplay.innerHTML = ""; 
    apiInfo.style.display = "none"; 
});

function displayData(data) {
    dataDisplay.innerHTML = ""; 

    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    const headers = ["UserID", "ID", "Title", "Completed"];
    const headerRow = document.createElement("tr");
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        th.style.border = "1px solid #dddddd";
        th.style.padding = "8px";
        th.style.textAlign = "left"; // Align header text to left
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    data.forEach(item => {
        const row = document.createElement("tr");
        for (const key in item) {
            const cell = document.createElement("td");
            cell.textContent = item[key];
            cell.style.border = "1px solid #dddddd";
            cell.style.padding = "8px";
            cell.style.textAlign = "left"; 
            
            if (item[key] === true || item[key] === "true") {
                cell.style.color = "green";
            } else if (item[key] === false || item[key] === "false") {  
                cell.style.color = "red";
            }

            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    dataDisplay.appendChild(table);
}