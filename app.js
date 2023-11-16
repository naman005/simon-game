let userSeq = [];
let gameSeq = [];
let btns = ["green","red","blue","yellow"];
let started = false;
let score = 0;
let highscore = 0;
let allBtns = document.querySelectorAll(".btn");
for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener("click", btnPress); 
}


document.getElementById("powerbtn").addEventListener("click", function () {
    if(started == false) {
        started = true;
        document.getElementById("powerbtn").style.display = "none";
        document.getElementById("simonText").style.display = "block";
        levelUp();
    }
});

function start() {
    document.getElementById('overlay').style.display = 'none';
}

function btnFlash(btn, index) {
    let addClass = "flash";
    switch (index) {
        case 0 :
            addClass = "greenFlash";
            break;
        case 1 :
            addClass = "redFlash";
            break;
        case 2 :
            addClass = "blueFlash";
            break;
        case 3 :
            addClass = "yellowFlash";
            break;
        default :
            addClass = "flash";
    }
    btn.classList.add(addClass);
    setTimeout(function () {
        btn.classList.remove(addClass);
    }, 250);
}
function boxFlash() {
   let box = document.querySelector(".box");
   box.classList.add("boxFlash");
   setTimeout(function () {
    box.classList.remove("boxFlash");
   }, 250);
}
function levelUp() {
    userSeq = [];

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn, randIdx);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            score++;
            if(score >= highscore) {
                highscore = score;
            } 
            document.getElementById("newscore").innerText = score;
            document.getElementById("highscore").innerText = highscore;
            setTimeout(levelUp, 1000);
        }
    } else {
        boxFlash();
        reset();
    }
}

function btnPress() {
    if(started == true) {
        let btn = this;
        let color = btn.getAttribute("id");
        let idx = getIndex(color);
        btnFlash(btn,idx);
        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        checkAns(userSeq.length - 1);
    }    
}

function getIndex(color) {
    for(let i = 0; i < btns.length; i++) {
        if(color == btns[i]) {
            return i;
        }
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    score = 0;
    document.getElementById("newscore").innerText = score; 
    document.getElementById("simonText").style.display = "none";
    document.getElementById("powerbtn").style.display = "block";
}
function quit() {
    reset();
    document.getElementById('overlay').style.display = 'flex';
}