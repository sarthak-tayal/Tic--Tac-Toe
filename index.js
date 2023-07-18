let player = document.getElementById('Player');
let restartbtn = document.getElementById('restartbtn');
let divs = Array.from(document.getElementsByClassName("box"));

let currplayer = "X";
let temp_divs = Array(9).fill(null);

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const winningcombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],[0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8], [2, 4, 6] 
]

const Start = () => {
    divs.forEach(div => div.addEventListener('click', boxChosen))
}

function boxChosen(x){
    const i = x.target.id 

    if(!temp_divs[i]){
        temp_divs[i] = currplayer
        x.target.innerText = currplayer

        if(checkWinning()!==false){
            player.innerHTML = `${currplayer} is the WINNER!!`
            let winning_box = checkWinning()

            winning_box.map(j => divs[j].style.backgroundColor=winnerIndicator)
            return
        }
        else if (checkDraw()) {
            player.innerHTML = "It's a draw!"
            return
        }
        currplayer = currplayer=="X"?"O":"X"
    }
}

function checkDraw() {
    return !temp_divs.includes(null);
}  

function checkWinning(){
    for(let i=0;i<winningcombinations.length;i++){
        const [a,b,c] = winningcombinations[i];
        if(temp_divs[a] &&(temp_divs[a]===temp_divs[b] && temp_divs[a]===temp_divs[c])){
            return [a,b,c];
        }
    }
    return false;
}

restartbtn.addEventListener("click",ResetGame)

function ResetGame() {
    temp_divs.fill(null)
    currplayer = "X"
    divs.forEach( div => {
        div.innerText = ''
        div.style.backgroundColor=''
    })
    player.innerHTML = 'Tic Tac Toe'
}

Start()