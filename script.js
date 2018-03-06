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

// " "floor
// "W" Wall
// "O" Dot
// "S" Player
// "B" Box
// "X" Box on Dot
// "Y" Player on Dot

// player position variables
let pRow = 2;
let pCol = 2;

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

// key handler, main game mechanics
document.addEventListener("keydown", event => {
    const key = event.key;
    console.log(key);

    // RIGHT
    if (key === "ArrowRight") {
        // player on floor
        if (mapA[pRow][pCol] === "S") {
            // move box floor
            if (mapA[pRow][pCol + 1] === "B" && mapA[pRow][pCol + 2] === " ") {
                mapA[pRow][pCol + 2] = "B";
                mapA[pRow][pCol + 1] = "S";
                mapA[pRow][pCol] = " ";
                pCol++;
                drawBoard();
                // move box dot -> floor
            } else if (mapA[pRow][pCol + 1] === "X" && mapA[pRow][pCol + 2] === " ") {
                mapA[pRow][pCol + 2] = "B";
                mapA[pRow][pCol + 1] = "Y";
                mapA[pRow][pCol] = " ";
                pCol++;
                drawBoard();
            } else if (mapA[pRow][pCol + 1] === "B" && mapA[pRow][pCol + 2] === "O") {
                // move box dot
                mapA[pRow][pCol + 2] = "X";
                mapA[pRow][pCol + 1] = "S";
                mapA[pRow][pCol] = " ";
                pCol++;
                drawBoard();
            } else if (mapA[pRow][pCol + 1] === " ") {
                // move floor
                mapA[pRow][pCol + 1] = "S";
                mapA[pRow][pCol] = " ";
                pCol++;
                drawBoard();
            } else if (mapA[pRow][pCol + 1] === "O") {
                // move dot
                mapA[pRow][pCol + 1] = "Y";
                mapA[pRow][pCol] = " ";
                pCol++;
                drawBoard();
            }
            // player in dot
        } else {
            // move box floor
            if (mapA[pRow][pCol + 1] === "B" && mapA[pRow][pCol + 2] === " ") {
                mapA[pRow][pCol + 2] = "B";
                mapA[pRow][pCol + 1] = "S";
                mapA[pRow][pCol] = "O";
                pCol++;
                drawBoard();
            } else if (mapA[pRow][pCol + 1] === "B" && mapA[pRow][pCol + 2] === "O") {
                // move box dot
                mapA[pRow][pCol + 2] = "X";
                mapA[pRow][pCol + 1] = "S";
                mapA[pRow][pCol] = "O";
                pCol++;
                drawBoard();
            } else if (mapA[pRow][pCol + 1] === " ") {
                // move floor
                mapA[pRow][pCol + 1] = "S";
                mapA[pRow][pCol] = "O";
                pCol++;
                drawBoard();
            } else if (mapA[pRow][pCol + 1] === "O") {
                // move dot
                mapA[pRow][pCol + 1] = "Y";
                mapA[pRow][pCol] = "O";
                pCol++;
                drawBoard();
            }
        }
    }

    // LEFT
    if (key === "ArrowLeft") {
        // player on floor
        if (mapA[pRow][pCol] === "S") {
            // move box floor
            if (mapA[pRow][pCol - 1] === "B" && mapA[pRow][pCol - 2] === " ") {
                mapA[pRow][pCol - 2] = "B";
                mapA[pRow][pCol - 1] = "S";
                mapA[pRow][pCol] = " ";
                pCol--;
                drawBoard();
                // move box dot -> floor
            } else if (mapA[pRow][pCol - 1] === "X" && mapA[pRow][pCol - 2] === " ") {
                mapA[pRow][pCol - 2] = "B";
                mapA[pRow][pCol - 1] = "Y";
                mapA[pRow][pCol] = " ";
                pCol--;
                drawBoard();
            } else if (mapA[pRow][pCol - 1] === "B" && mapA[pRow][pCol - 2] === "O") {
                // move box dot
                mapA[pRow][pCol - 2] = "X";
                mapA[pRow][pCol - 1] = "S";
                mapA[pRow][pCol] = " ";
                pCol--;
                drawBoard();
            } else if (mapA[pRow][pCol - 1] === " ") {
                // move floor
                mapA[pRow][pCol - 1] = "S";
                mapA[pRow][pCol] = " ";
                pCol--;
                drawBoard();
            } else if (mapA[pRow][pCol - 1] === "O") {
                // move dot
                mapA[pRow][pCol - 1] = "Y";
                mapA[pRow][pCol] = " ";
                pCol--;
                drawBoard();
            }
            // player in dot
        } else {
            // move box floor
            if (mapA[pRow][pCol - 1] === "B" && mapA[pRow][pCol - 2] === " ") {
                mapA[pRow][pCol - 2] = "B";
                mapA[pRow][pCol - 1] = "S";
                mapA[pRow][pCol] = "O";
                pCol--;
                drawBoard();
            } else if (mapA[pRow][pCol - 1] === "B" && mapA[pRow][pCol - 2] === "O") {
                // move box dot
                mapA[pRow][pCol - 2] = "X";
                mapA[pRow][pCol - 1] = "S";
                mapA[pRow][pCol] = "O";
                pCol--;
                drawBoard();
            } else if (mapA[pRow][pCol - 1] === " ") {
                // move floor
                mapA[pRow][pCol - 1] = "S";
                mapA[pRow][pCol] = "O";
                pCol--;
                drawBoard();
            } else if (mapA[pRow][pCol - 1] === "O") {
                // move dot
                mapA[pRow][pCol - 1] = "Y";
                mapA[pRow][pCol] = "O";
                pCol--;
                drawBoard();
            }
        }
    }

    // DOWN
    if (key === "ArrowDown") {
        // player on floor
        if (mapA[pRow][pCol] === "S") {
            // move box floor
            if (mapA[pRow + 1][pCol] === "B" && mapA[pRow + 2][pCol] === " ") {
                mapA[pRow + 2][pCol] = "B";
                mapA[pRow + 1][pCol] = "S";
                mapA[pRow][pCol] = " ";
                pRow++;
                drawBoard();
                // move box dot -> floor
            } else if (mapA[pRow + 1][pCol] === "X" && mapA[pRow + 2][pCol] === " ") {
                mapA[pRow + 2][pCol] = "B";
                mapA[pRow + 1][pCol] = "Y";
                mapA[pRow][pCol] = " ";
                pRow++;
                drawBoard();
            } else if (mapA[pRow + 1][pCol] === "B" && mapA[pRow + 2][pCol] === "O") {
                // move box dot
                mapA[pRow + 2][pCol] = "X";
                mapA[pRow + 1][pCol] = "S";
                mapA[pRow][pCol] = " ";
                pRow++;
                drawBoard();
            } else if (mapA[pRow + 1][pCol] === " ") {
                // move floor
                mapA[pRow + 1][pCol] = "S";
                mapA[pRow][pCol] = " ";
                pRow++;
                drawBoard();
            } else if (mapA[pRow + 1][pCol] === "O") {
                // move dot
                mapA[pRow + 1][pCol] = "Y";
                mapA[pRow][pCol] = " ";
                pRow++;
                drawBoard();
            }
            // player in dot
        } else {
            // move box floor
            if (mapA[pRow + 1][pCol] === "B" && mapA[pRow + 2][pCol] === " ") {
                mapA[pRow + 2][pCol] = "B";
                mapA[pRow + 1][pCol] = "S";
                mapA[pRow][pCol] = "O";
                pRow++;
                drawBoard();
            } else if (mapA[pRow + 1][pCol] === "B" && mapA[pRow + 2][pCol] === "O") {
                // move box dot
                mapA[pRow + 2][pCol] = "X";
                mapA[pRow + 1][pCol] = "S";
                mapA[pRow][pCol] = "O";
                pRow++;
                drawBoard();
            } else if (mapA[pRow + 1][pCol] === " ") {
                // move floor
                mapA[pRow + 1][pCol] = "S";
                mapA[pRow][pCol] = "O";
                pRow++;
                drawBoard();
            } else if (mapA[pRow + 1][pCol] === "O") {
                // move dot
                mapA[pRow + 1][pCol] = "Y";
                mapA[pRow][pCol] = "O";
                pRow++;
                drawBoard();
            }
        }
    }

    // UP
    if (key === "ArrowUp") {
        // player on floor
        if (mapA[pRow][pCol] === "S") {
            // move box floor
            if (mapA[pRow - 1][pCol] === "B" && mapA[pRow - 2][pCol] === " ") {
                mapA[pRow - 2][pCol] = "B";
                mapA[pRow - 1][pCol] = "S";
                mapA[pRow][pCol] = " ";
                pRow--;
                drawBoard();
                // move box dot -> floor
            } else if (mapA[pRow - 1][pCol] === "X" && mapA[pRow - 2][pCol] === " ") {
                mapA[pRow - 2][pCol] = "B";
                mapA[pRow - 1][pCol] = "Y";
                mapA[pRow][pCol] = " ";
                pRow--;
                drawBoard();
            } else if (mapA[pRow - 1][pCol] === "B" && mapA[pRow - 2][pCol] === "O") {
                // move box dot
                mapA[pRow - 2][pCol] = "X";
                mapA[pRow - 1][pCol] = "S";
                mapA[pRow][pCol] = " ";
                pRow--;
                drawBoard();
            } else if (mapA[pRow - 1][pCol] === " ") {
                // move floor
                mapA[pRow - 1][pCol] = "S";
                mapA[pRow][pCol] = " ";
                pRow--;
                drawBoard();
            } else if (mapA[pRow - 1][pCol] === "O") {
                // move dot
                mapA[pRow - 1][pCol] = "Y";
                mapA[pRow][pCol] = " ";
                pRow--;
                drawBoard();
            }
            // player in dot
        } else {
            // move box -> floor
            if (mapA[pRow - 1][pCol] === "B" && mapA[pRow - 2][pCol] === " ") {
                mapA[pRow - 2][pCol] = "B";
                mapA[pRow - 1][pCol] = "S";
                mapA[pRow][pCol] = "O";
                pRow--;
                drawBoard();
            } else if (mapA[pRow - 1][pCol] === "B" && mapA[pRow - 2][pCol] === "O") {
                // move box -> dot
                mapA[pRow - 2][pCol] = "X";
                mapA[pRow - 1][pCol] = "S";
                mapA[pRow][pCol] = "O";
                pRow--;
                drawBoard();
            } else if (mapA[pRow - 1][pCol] === " ") {
                // move -> floor
                mapA[pRow - 1][pCol] = "S";
                mapA[pRow][pCol] = "O";
                pRow--;
                drawBoard();
            } else if (mapA[pRow - 1][pCol] === "O") {
                // move -> dot
                mapA[pRow - 1][pCol] = "Y";
                mapA[pRow][pCol] = "O";
                pRow--;
                drawBoard();
            }
        }
    }

    // check for win

    function checkWin() {
        let boxes = false;
        for (let i = 0; i < mapA.length; i++) {
            if (mapA[i].indexOf("B") > -1) {
                boxes = true;
            }
        }
        return boxes;
    }
    if (checkWin() === false) {
        setTimeout(function () {
            alert("you won!");
            mapA = [];
            for (let i = 0; i < map.length; i++) {
                mapA.push([]);
                mapA[i].push(...map[i].split(""));
            }
            pRow = 2;
            pCol = 2;
            drawBoard();
        }, 100);
    }

});