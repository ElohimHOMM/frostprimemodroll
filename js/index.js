const nameColumn = document.getElementById("name-container");
const winner = document.getElementById("winner-output");
const number = document.getElementById("number-output");
const prevs = document.getElementById("previous-winners");

const NO_WINNER = "No Winner";

const previousWinners = ["", "", "", ""];

let lastWinnerId = 0;

function init() {
    createInputFields();
    document.getElementById("roll-button").addEventListener("click", roll);
}

function roll() {
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;
    let result = Math.floor(
        Math.random() * (parseInt(max) - parseInt(min) + 1) + parseInt(min)
    );

    paint(result - 1);
    let lastWinner = getWinner(result - 1);
    printResults(result, lastWinner);
}

function paint(id) {
    // in the case that the max and min has switched after there's a winner...
    let lastWinner = document.getElementById("col-entry-" + lastWinnerId);
    if (lastWinner) lastWinner.style.background = "#00000000";

    let div = document.getElementById("col-entry-" + id);
    if (div) {
        div.style.background = "#019b09";
        lastWinnerId = id;
    }
}

function getWinner(id) {
    let val = document.getElementById("text-input-for-" + id);
    console.log(val);
    if (val != null && val.value) return val.value;
    else return NO_WINNER;
}

function printResults(id, lastWinner) {
    console.log(lastWinner);
    number.textContent = id;
    if (lastWinner != NO_WINNER) {
        addPrev(lastWinner);
    }
    winner.textContent = lastWinner;
}

function addPrev(won) {
    for (let i = previousWinners.length - 1; i >= 0; i--) {
        previousWinners[i + 1] = previousWinners[i];
    }
    previousWinners[0] = won;

    prevs.innerHTML = "";

    let headline = document.createElement("div");
    headline.className = "col-4";

    let headlineText = document.createElement("h2");
    headlineText.textContent = "Previous Winners:";

    headline.appendChild(headlineText);
    prevs.appendChild(headline);

    for (let i = 0; i < 4; i++) {
        let currentEntry = previousWinners[i];
        let newEntry = document.createElement("div");
        newEntry.className = "col-2";

        let newEntryText = document.createElement("h4");
        newEntryText.textContent = currentEntry;

        newEntry.appendChild(newEntryText);
        prevs.appendChild(newEntry);
    }
}

function createInputFields() {
    // Clears previous child to Allow for a dynamic amount of input fields
    let nameContainer = document.getElementById("name-container");
    let child = nameContainer.lastChild;
    if (nameContainer.hasChildNodes()) child.remove();

    let row = document.createElement("div");
    row.id = "garbage";
    let rowCounter = 4;
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;
    for (let i = min - 1; i < max; i++) {
        if (rowCounter == 4) {
            nameColumn.appendChild(row);
            row.id = "row-" + Math.floor(i / 4);
            row.className = "row";
            rowcounter = 0;
        }
        addContentToRow(i, row);
        rowcounter++;
    }
}

function addContentToRow(i, row) {
    let span = document.createElement("span");
    span.id = "text-for-" + i;
    span.textContent = i + 1;
    span.className = "px-1";

    let col = document.createElement("col");
    col.id = "col-entry-" + i;
    col.className = "col-3 py-1 d-flex flex-row justify-content-start";

    let input = document.createElement("input");
    input.type = "text";
    input.id = "text-input-for-" + i;

    col.appendChild(span);
    col.appendChild(input);
    row.appendChild(col);
}
