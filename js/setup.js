const gridShow = document.getElementById("side_grid")
const voice = document.getElementById("side_voice")
const startBtn = document.getElementById("start")
const endBtn = document.getElementById("end")

let opt_grid = false
let opt_voice = false
let gamermode = false

gridShow.addEventListener("click", function(){
    opt_grid = !opt_grid
    gridShow.innerText = `Helping grid: ${(opt_grid == true) ? "on" : "off"}`
    message(`Grid was turned ${(opt_grid == true) ? "on" : "off"}`)
    if (opt_grid){
        let audio = new Audio('audio/gamer/grid.mp3');
        audio.play();
    }
})

voice.addEventListener("click", function(){
    if (gamermode != true){
        opt_voice = !opt_voice
        voice.innerText = `Voiceover: ${(opt_voice == true) ? "on" : "off"}`
        message(`Voiceover ${(opt_voice == true) ? "activated" : "deactivated"}`)
    } else {
        let audio = new Audio('audio/gamer/voiceover_0' + fnc_rand(1,2) +'.mp3');
        audio.play();
    }
})

function fnc_rand (min, max) {
    return Math.floor(Math.random() * max) + min
}

let game_started = false

startBtn.addEventListener("click", function(){
    startBtn.disabled = true
    endBtn.disabled = false
    game_started = true
    let audio = new Audio('audio/gamer/start.mp3');
    audio.play();
    message(`Game has started`)
})

endBtn.addEventListener("click", function(){
    startBtn.disabled = false
    endBtn.disabled = true
    game_started = false
    let audio = new Audio('audio/gamer/end.mp3');
    audio.play();
    message(`Game has ended`)
})

document.getElementById("gamer_mode").addEventListener("click", function(){
    gamermode = true
    document.getElementsByTagName("LINK")[1].setAttribute("href", "css/gamer.css")
    let audio = new Audio('audio/gamer/gamermode.mp3');
    audio.play();
    message(`GAMER MODE ACTIVATED`)
    opt_voice = true
    voice.innerText = `Voiceover: on`
    message(`Voiceover activated`)
})