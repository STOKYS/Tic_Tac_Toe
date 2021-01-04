canvas = document.getElementById("cvgame")
ctx = canvas.getContext("2d")

let canvasX = null
let canvasY = null
let gridX = null
let gridY = null
let tiles = []

const cross = new Image()
cross.src = "img/cross.png"
const circle = new Image()
circle.src = "img/circle.png"
const blue = new Image()
blue.src = "img/blue.png"
const red = new Image()
red.src = "img/red.png"

document.addEventListener('contextmenu', event => event.preventDefault());

canvas.addEventListener("mousemove", function (e) {
  let cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
  canvasX = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas 
  canvasY = Math.round(e.clientY - cRect.top); // from the X/Y positions to make  
  game.update()
});

canvas.addEventListener("click", function () {
  let gridXs = (gridX < 10) ? "0" + gridX : gridX
  let gridYs = (gridY < 10) ? "0" + gridY : gridY
  let pushed = game.player + "" + gridXs + "" + gridYs
  if (checkValid(pushed) == true || tiles.length == 0) {
    tiles.push(pushed)
    game.newRound()
  } else {
    message("Tile is already occupied")
  }
})

function checkValid(pushed) {
  let invalid = false
  tiles.forEach(function (item) {
    if (((item.slice(-4)) == (pushed.slice(-4)))) {
      invalid = true
    }
  })
  if (invalid == true) {
    return false
  } else {
    return true
  }
}

function redrawTiles() {
  tiles.forEach(function (item) {
    ctx.drawImage((item.charAt(0) == 1) ? eval("cross") : eval("circle"), (item.substr(item.length - 4)).slice(0, -2) * 32, item.substr(item.length - 2) * 32, 32, 32)
  })
}

function writeCords() {
  ctx.fillText("X: " + canvasX + ", Y: " + canvasY, 2, 10);
  writeGrid()
}

function writeGrid() {
  gridX = Math.floor(canvasX / 32)
  gridY = Math.floor(canvasY / 32)
  ctx.fillText("Grid: " + gridX + ", " + gridY, 2, 20)
}

function showSelection() {
  let sele = (game.player == 1) ? "cross" : "circle"
  ctx.beginPath();
  ctx.rect(gridX * 32, gridY * 32, 32, 32);
  ctx.stroke();
  ctx.drawImage(eval(sele), gridX * 32, gridY * 32, 32, 32)
}

function drawGrid() {
  ctx.strokeStyle = "#555555";
  for (let i = 0; i < 28; i++) {
    for (let j = 0; j < 28; j++) {
      ctx.beginPath();
      ctx.rect(i * 32, j * 32, 32, 32);
      ctx.stroke();
    }
  }
}

function drawHelp() {
  let sele = (game.player == 1) ? "blue" : "red"
  for (let i = 0; i < 28; i++) {
    for (let j = 0; j < 28; j++) {
      if (j == gridY) {
        ctx.drawImage(eval(sele), i * 32, j * 32, 32, 32)
      }
      if (i == gridX) {
        ctx.drawImage(eval(sele), i * 32, j * 32, 32, 32)
      }
      if ((gridX - i) == (gridY - j)) {
        ctx.drawImage(eval(sele), i * 32, j * 32, 32, 32)
      }
      if ((gridX - i) == (j - gridY)) {
        ctx.drawImage(eval(sele), i * 32, j * 32, 32, 32)
      }
    }
  }
}

window.addEventListener("load", function () {
  game.gameStart()
})

let game = {
  round: 1,
  player: 1,
  gameStart: function () {
    drawGrid()
  },
  newRound: function () {
    game.player = (game.player == 1) ? 2 : 1
    if (game.player == 1) {
      game.round++
      document.getElementById("round").innerText = `Round: ${game.round}`
    }
    checkWin()
  },
  update: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid()
    redrawTiles()
    writeCords()
    showSelection()
    if (opt_grid == true) {
      drawHelp()
    }
  }
}

function checkWin() {
  let checked = tiles[tiles.length - 1]
  let checkedP = checked.charAt(0)
  let checkedX = checked.slice(-4, -2)
  let checkedY = checked.slice(-2)
  let matches = 0
  let i = checkedX
  while (tiles.find(element => element == (String(checkedP) + i + checkedY)) == (String(checkedP) + i + checkedY)) {
    if (Number(i) < 9) {
      i = "0" + (Number(i) + 1)
    } else {
      i++
    }
    matches++
  }
  i = checkedX - 1
  while (tiles.find(element => element == (String(checkedP) + i + checkedY)) == (String(checkedP) + i + checkedY)) {
    if (Number(i) < 9) {
      i = "0" + (Number(i) - 1)
    } else {
      i--
    }
    matches++
  }
  message("Horizontal matches: " + matches)
  if (matches > 4) {
    win(checkedP)
  }
  matches = 0
  i = checkedY
  while (tiles.find(element => element == (String(checkedP) + checkedX + i)) == (String(checkedP) + checkedX + i)) {
    if (Number(i) < 10) {
      i = "0" + (Number(i) + 1)
    } else {
      i++
    }
    matches++
  }
  i = checkedY - 1
  while (tiles.find(element => element == (String(checkedP) + checkedX + i)) == (String(checkedP) + checkedX + i)) {
    if (Number(i) < 10) {
      i = "0" + (Number(i) - 1)
    } else {
      i--
    }
    matches++
  }
  message("Vertical matches: " + matches)
  if (matches > 4) {
    win(checkedP)
  }

  matches = 0
  i = checkedX
  let j = checkedY
  while (tiles.find(element => element == (String(checkedP) + i + j)) == (String(checkedP) + i + j)) {
    if (Number(i) < 9) {
      i = "0" + (Number(i) + 1)
    } else {
      i++
    }
    if (Number(j) < 9) {
      j = "0" + (Number(j) + 1)
    } else {
      j++
    }
    matches++
  }
  i = (checkedX < 11) ? "0" + (checkedX - 1) : checkedX - 1
  j = (checkedY < 11) ? "0" + (checkedY - 1) : checkedY - 1
  while (tiles.find(element => element == (String(checkedP) + i + j)) == (String(checkedP) + i + j)) {
    if (Number(i) < 10) {
      i = "0" + (Number(i) - 1)
    } else {
      i--
    }
    if (Number(j) < 10) {
      j = "0" + (Number(j) - 1)
    } else {
      j--
    }
    matches++
  }
  message("Diagonal matches: " + matches)
  if (matches > 4) {
    win(checkedP)
  }

  matches = 0
  i = checkedX
  j = checkedY
  while (tiles.find(element => element == (String(checkedP) + i + j)) == (String(checkedP) + i + j)) {
    console.log(String(checkedP) + i + j)
    if (Number(i) < 9) {
      i = "0" + (Number(i) + 1)
    } else {
      i++
    }
    if (Number(j) < 9) {
      j = "0" + (Number(j) - 1)
    } else {
      j--
    }
    matches++
  }
  i = (checkedX < 11) ? "0" + (checkedX - 1) : checkedX - 1
  console.log(i)
  j = (checkedY < 9) ? "0" + (Number(checkedY) + 1) : Number(checkedY) + 1
  console.log(j)
  while (tiles.find(element => element == (String(checkedP) + i + j)) == (String(checkedP) + i + j)) {
    if (Number(i) < 10) {
      i = "0" + (Number(i) - 1)
    } else {
      i--
    }
    if (Number(j) < 10) {
      j = "0" + (Number(j) + 1)
    } else {
      j++
    }
    matches++
  }
  message("180° Diagonal matches: " + matches)
  if (matches > 4) {
    win(checkedP)
  }

}

function win(winner) {
  document.getElementById("title").innerText = (winner == 1) ? "Crosses win" : "Circles win"
}

function message(text) {
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  let para = document.createElement("p");
  let node = document.createTextNode(`-- (${((h < 10) ? "0" + h : h) + ":" + ((m < 10) ? "0" + m : m) + ":" + ((s < 10) ? "0" + s : s)}) : [${text}]`);
  para.appendChild(node);
  let element = document.getElementById("console");
  element.appendChild(para);
  document.getElementById("console").scroll(0, 999999)
}