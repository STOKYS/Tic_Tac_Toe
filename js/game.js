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

  requestAnimationFrame(game.update)

});

canvas.addEventListener("click", function () {
  let gridXs = (gridX < 10) ? "0" + gridX : gridX
  let gridYs = (gridY < 10) ? "0" + gridY : gridY
  let pushed = gridXs + "" + gridYs
  if (checkValid(pushed) == true || tiles.length == 0) {
    tiles.push(pushed)
    requestAnimationFrame(game.newRound)
  } else {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let para = document.createElement("p");
    let node = document.createTextNode(`-- ${((h < 10) ? "0" + h : h) + ":" + ((m < 10) ? "0" + m : m) + ":" + ((s < 10) ? "0" + s : s)} That place is already occupied`);
    para.appendChild(node);
    let element = document.getElementById("console");
    element.appendChild(para);
  }
})

function checkValid(pushed) {
  let invalid = false
  tiles.forEach(function (item) {
    if (((item) == (pushed))) {
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
  player.num_factory = 0
  tiles.forEach(function (item) {
    ctx.drawImage(eval(item.slice(0, -4)), (item.substr(item.length - 4)).slice(0, -2) * 32, item.substr(item.length - 2) * 32, 32, 32)
    if (item.slice(0, -4) == "factory") {
      player.num_factory++
    }
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
  ctx.beginPath();
  ctx.rect(gridX * 32, gridY * 32, 32, 32);
  ctx.stroke();
  ctx.drawImage(cross, gridX * 32, gridY * 32, 32, 32)
}

function drawGrid() {
  for (let i = 0; i < 28; i++) {
    for (let j = 0; j < 28; j++) {
      ctx.beginPath();
      ctx.rect(i * 32, j * 32, 32, 32);
      ctx.stroke();
    }
  }
}

function drawHelp() {
  for (let i = 0; i < 28; i++) {
    for (let j = 0; j < 28; j++) {
      if (j == gridY) {
        ctx.drawImage(blue, i * 32, j * 32, 32, 32)
      }
      if (i == gridX) {
        ctx.drawImage(blue, i * 32, j * 32, 32, 32)
      }
      if ((gridX - i) == (gridY - j)) {
        ctx.drawImage(blue, i * 32, j * 32, 32, 32)
      }
      if ((gridX - i) == (j - gridY)) {
        ctx.drawImage(blue, i * 32, j * 32, 32, 32)
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

  },
  update: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid()
    //redrawTiles()
    writeCords()
    showSelection()
    if (true) {
      drawHelp()
    }
  }
}