const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];

// " " - Floor
// "W" - Wall
// "O" - Dot
// "S" - Player
// "B" - Box
// "X" - Box on Dot
// "Y" - Player on Dot

// translates map to a nested array
let mapA = [];
for (let i = 0; i < map.length; i++) {
    mapA.push([]);
    mapA[i].push(...map[i].split(""));
}

// adds all the divs to the HTML
function createDiv(type) {
    const newDiv = document.createElement("div");
    newDiv.className = "cell " + type;
    document.getElementById("container").appendChild(newDiv);
}

// calls createDiv based on cell types to build the board
function drawBoard() {
    document.getElementById("container").innerHTML = "";
    for (let i = 0; i < mapA.length; i++) {
        for (let y = 0; y < map[i].length; y++) {
            if (mapA[i][y] === " ") { createDiv("floor"); };
            if (mapA[i][y] === "W") { createDiv("wall"); };
            if (mapA[i][y] === "O") { createDiv("dot"); };
            if (mapA[i][y] === "B") { createDiv("box"); };
            if (mapA[i][y] === "X") { createDiv("box-in-place"); };
            if (mapA[i][y] === "S") { createDiv("player"); };
            if (mapA[i][y] === "Y") { createDiv("player"); };
        }
    }
}
drawBoard();

// player position variables
let playerRow = 2;
let playerCol = 2;

// changes the cells in mapA
function move(right, down, oneOver, twoOver) {

    // change the cell two spots over (if needed)
    if (twoOver !== "none") {
        mapA[playerRow + (2 * down)][playerCol + (2 * right)] = twoOver;
    }

    // change the cell one spot over
    mapA[playerRow + down][playerCol + right] = oneOver;

    // change the current cell
    if (mapA[playerRow][playerCol] === "S") {
        mapA[playerRow][playerCol] = " ";
    } else {
        mapA[playerRow][playerCol] = "O";
    }

    // change player position variables
    if (right === 1) {playerCol++;};
    if (right === -1) {playerCol--;};
    if (down === 1) {playerRow++;};
    if (down === -1) {playerRow--;};
    
    // redraw board
    drawBoard();
}

// calls move() based on different surrounding cell types
function initiateMove(right, down) {

    // move box...
    if (mapA[playerRow + down][playerCol + right] === "B") {

        // ...to floor
        if (mapA[playerRow + (2 * down)][playerCol + (2 * right)] === " ") {
            move(right, down, "S", "B");

        // ...to dot
        } else if (mapA[playerRow + (2 * down)][playerCol + (2 * right)] === "O") {
            move(right, down, "S", "X");           
        }

    // move pink box...
    } else if (mapA[playerRow + down][playerCol + right] === "X") {

        // ...to floor
        if (mapA[playerRow + (2 * down)][playerCol + (2 * right)] === " ") {
            move(right, down, "Y", "B");

        // ...to dot
        } else if (mapA[playerRow + (2 * down)][playerCol + (2 * right)] === "O") {
            move(right, down, "Y", "X");
        }

    // move to floor
    } else if (mapA[playerRow + down][playerCol + right] === " ") {
        move(right, down, "S", "none");

    // move to dot
    } else if (mapA[playerRow + down][playerCol + right] === "O") {
        move(right, down, "Y", "none");
    }
    
}

// checks if you've won
function checkWin() {
    let boxes = false;
    for (let i = 0; i < mapA.length; i++) {
        if (mapA[i].indexOf("B") > -1) {
            boxes = true;
        }
    }
    return boxes;
}

// key handler, main game mechanics
document.addEventListener("keydown", event => {

    // determine key pressed
    const key = event.key;
    console.log(key);
    
    // initiate moves
    if (key === "ArrowRight") { initiateMove(1, 0); };
    if (key === "ArrowLeft") { initiateMove(-1, 0); };
    if (key === "ArrowDown") { initiateMove(0, 1); };
    if (key === "ArrowUp") { initiateMove(0, -1); };

    // resets stuff if you win
    if (checkWin() === false) {
        setTimeout(function () {
            alert("You saved the box princess!");
            mapA = [];
            for (let i = 0; i < map.length; i++) {
                mapA.push([]);
                mapA[i].push(...map[i].split(""));
            }
            playerRow = 2;
            playerCol = 2;
            drawBoard();
        }, 100);
    }

});