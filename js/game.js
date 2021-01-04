
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
    if (opt_voice && game_started) {
      let audio = new Audio(`audio/${folder}/${(game.player == 1) ? "cross" : "circle"}_0${fnc_rand(1,3)}.mp3`);
      audio.play();
    }
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
    ctx.drawImage((item.charAt(0) == 1) ? eval("cross") : eval("circle"), (item.substr(item.length - 4)).slice(0, -2) * gridSize, item.substr(item.length - 2) * gridSize, gridSize, gridSize)
  })
}

function writeCords() {
  ctx.fillText("X: " + canvasX + ", Y: " + canvasY, 2, 10);
  writeGrid()
}

function writeGrid() {
  gridX = Math.floor(canvasX / gridSize)
  gridY = Math.floor(canvasY / gridSize)
  ctx.fillText("Grid: " + gridX + ", " + gridY, 2, 20)
}

function showSelection() {
  let sele = (game.player == 1) ? "cross" : "circle"
  ctx.beginPath();
  ctx.rect(gridX * gridSize, gridY * gridSize, gridSize, gridSize);
  ctx.stroke();
  ctx.drawImage(eval(sele), gridX * gridSize, gridY * gridSize, gridSize, gridSize)
}

function drawGrid() {
  ctx.strokeStyle = "#555555";
  for (let i = 0; i < gridNum; i++) {
    for (let j = 0; j < gridNum; j++) {
      ctx.beginPath();
      ctx.rect(i * gridSize, j * gridSize, gridSize, gridSize);
      ctx.stroke();
    }
  }
}

function fnc_rand(min, max) {
  return Math.floor(Math.random() * max) + min
}

function drawHelp() {
  let sele = (game.player == 1) ? "blue" : "red"
  for (let i = 0; i < gridNum; i++) {
    for (let j = 0; j < gridNum; j++) {
      if (j == gridY) {
        ctx.drawImage(eval(sele), i * gridSize, j * gridSize, gridSize, gridSize)
      }
      if (i == gridX) {
        ctx.drawImage(eval(sele), i * gridSize, j * gridSize, gridSize, gridSize)
      }
      if ((gridX - i) == (gridY - j)) {
        ctx.drawImage(eval(sele), i * gridSize, j * gridSize, gridSize, gridSize)
      }
      if ((gridX - i) == (j - gridY)) {
        ctx.drawImage(eval(sele), i * gridSize, j * gridSize, gridSize, gridSize)
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

function win(winner) {
  game_started = false
  document.getElementById("title").innerText = (winner == 1) ? "Crosses win" : "Circles win"
  message(`${(winner == 1) ? "Crosses win" : "Circles win"}`)
  if (opt_voice) {
    let audio = new Audio(`audio/${folder}/${(winner == 1) ? "cross" : "circle"}_win.mp3`);
    audio.play();
  }
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