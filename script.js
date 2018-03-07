// map data
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

// " " - floor
// "W" - Wall
// "O" - Dot
// "S" - Player
// "B" - Box
// "X" - Box on Dot
// "Y" - Player on Dot

// mutate map into a nested array
let mapA = [];
for (let i = 0; i < map.length; i++) {
    mapA.push([]);
    mapA[i].push(...map[i].split(""));
}

// function that draws the divs in the HTML
function createDiv(type) {
    const newDiv = document.createElement("div");
    newDiv.className = "cell " + type;
    document.getElementById("container").appendChild(newDiv);
}

// function that draws the board
function drawBoard() {
    document.getElementById("container").innerHTML = "";
    for (let i = 0; i < mapA.length; i++) {
        for (let y = 0; y < map[i].length; y++) {
            if (mapA[i][y] === " ") {
                createDiv("floor");
            }
            if (mapA[i][y] === "W") {
                createDiv("wall");
            }
            if (mapA[i][y] === "O") {
                createDiv("dot");
            }
            if (mapA[i][y] === "B") {
                createDiv("box");
            }
            if (mapA[i][y] === "X") {
                createDiv("box-in-place");
            }
            if (mapA[i][y] === "S") {
                createDiv("player");
            }
            if (mapA[i][y] === "Y") {
                createDiv("player");
            }
        }
    }
}
drawBoard();

// function that changes all the cells
function move(right, down, oneOver, twoOver) {
    // if needed, change the cell two spots over
    if (twoOver !== "none") {
        mapA[playerRow + (2 * down)][playerCol + (2 * right)] = twoOver;
    }
    // change the cell one spot over
    mapA[playerRow + down][playerCol + right] = oneOver;
    // change the current cell (depending on whether you were in a dot or not)
    if (mapA[playerRow][playerCol] === "S") {
        mapA[playerRow][playerCol] = " ";
    } else {
        mapA[playerRow][playerCol] = "O";
    }
    // change player x,y based on the direction moved
    if (right === 1) {playerCol++;};
    if (right === -1) {playerCol--;};
    if (down === 1) {playerRow++;};
    if (down === -1) {playerRow--;};
    // redraw board
    drawBoard();
}

// function that checks if you've won
function checkWin() {
    let boxes = false;
    for (let i = 0; i < mapA.length; i++) {
        if (mapA[i].indexOf("B") > -1) {
            boxes = true;
        }
    }
    return boxes;
}

// player position variables
let playerRow = 2;
let playerCol = 2;

// key handler, main game mechanics
document.addEventListener("keydown", event => {
    const key = event.key;
    console.log(key);
    
    // RIGHT
    if (key === "ArrowRight") {
        // move box
        if (mapA[playerRow][playerCol + 1] === "B") {
            // to floor
            if (mapA[playerRow][playerCol + 2] === " ") {
                move(1, 0, "S", "B");
            // to dot
            } else if (mapA[playerRow][playerCol + 2] === "O") {
                move(1, 0, "S", "X");
            }
        // move pink box
        } else if (mapA[playerRow][playerCol + 1] === "X") {
            // to floor
            if (mapA[playerRow][playerCol + 2] === " ") {
                move(1, 0, "Y", "B");
            // to dot
            } else if (mapA[playerRow][playerCol + 2] === "O") {
                move(1, 0, "Y", "X");
            }
        // move -> floor
        } else if (mapA[playerRow][playerCol + 1] === " ") {
            move(1, 0, "S", "none");
        // move -> dot
        } else if (mapA[playerRow][playerCol + 1] === "O") {
            move(1, 0, "Y", "none");
        }
    }

    // LEFT
    if (key === "ArrowLeft") {
        // move box
        if (mapA[playerRow][playerCol - 1] === "B") {
            // to floor
            if (mapA[playerRow][playerCol - 2] === " ") {
                move(-1, 0, "S", "B");
            // to dot
            } else if (mapA[playerRow][playerCol - 2] === "O") {
                move(-1, 0, "S", "X");
            }
        // move pink box
        } else if (mapA[playerRow][playerCol - 1] === "X") {
            // to floor
            if (mapA[playerRow][playerCol - 2] === " ") {
                move(-1, 0, "Y", "B");
            // to dot
            } else if (mapA[playerRow][playerCol - 2] === "O") {
                move(-1, 0, "Y", "X");
            }
        // move -> floor
        } else if (mapA[playerRow][playerCol - 1] === " ") {
            move(-1, 0, "S", "none");
        // move -> dot
        } else if (mapA[playerRow][playerCol - 1] === "O") {
            move(-1, 0, "Y", "none");
        }
    }

    // DOWN
    if (key === "ArrowDown") {
        // move box
        if (mapA[playerRow + 1][playerCol] === "B") {
            // to floor
            if (mapA[playerRow + 2][playerCol] === " ") {
                move(0, 1, "S", "B");
            // to dot
            } else if (mapA[playerRow + 2][playerCol] === "O") {
                move(0, 1, "S", "X");
            }
        // move pink box
        } else if (mapA[playerRow + 1][playerCol] === "X") {
            // to floor
            if (mapA[playerRow + 2][playerCol] === " ") {
                move(0, 1, "Y", "B");
            // to dot
            } else if (mapA[playerRow + 2][playerCol] === "O") {
                move(0, 1, "Y", "X");
            }
        // move -> floor
        } else if (mapA[playerRow + 1][playerCol] === " ") {
            move(0, 1, "S", "none");
        // move -> dot
        } else if (mapA[playerRow + 1][playerCol] === "O") {
            move(0, 1, "Y", "none");
        }
    }

    // UP
    if (key === "ArrowUp") {
        // move box
        if (mapA[playerRow - 1][playerCol] === "B") {
            // to floor
            if (mapA[playerRow - 2][playerCol] === " ") {
                move(0, -1, "S", "B");
            // to dot
            } else if (mapA[playerRow - 2][playerCol] === "O") {
                move(0, -1, "S", "X");
            }
        // move pink box
        } else if (mapA[playerRow - 1][playerCol] === "X") {
            // to floor
            if (mapA[playerRow - 2][playerCol] === " ") {
                move(0, -1, "Y", "B");
            // to dot
            } else if (mapA[playerRow - 2][playerCol] === "O") {
                move(0, -1, "Y", "X");
            }
        // move -> floor
        } else if (mapA[playerRow - 1][playerCol] === " ") {
            move(0, -1, "S", "none");
        // move -> dot
        } else if (mapA[playerRow - 1][playerCol] === "O") {
            move(0, -1, "Y", "none");
        }
    }

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