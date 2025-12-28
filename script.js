let btn=document.querySelectorAll('.Btn');
let Turnx=true;
btn.forEach(element => {
    element.addEventListener('click',()=>{
        if(Turnx){
            element.innerText='X';
            Turnx=false;
            console.log('X turn');
        }else{
            element.innerText='O';
            Turnx=true;
            console.log('O turn');
        }
        
        element.disabled = true;

        let winingCombinations = [
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
        ];
        winingCombinations.forEach(combination => {
            let btn1 = btn[combination[0]];
            let btn2 = btn[combination[1]];
            let btn3 = btn[combination[2]];
            if (
                btn1.innerText !== '' &&
                btn1.innerText === btn2.innerText &&
                btn2.innerText === btn3.innerText
            ) {
                console.log(`${btn1.innerText} is the winner`);
                btn1.disabled = true;
                btn2.disabled = true;
                btn3.disabled = true;
                // Create a professional modal overlay for winner
                let winnerModal = document.getElementById('winner-modal');
                if (!winnerModal) {
                    winnerModal = document.createElement('div');
                    winnerModal.id = 'winner-modal';
                    winnerModal.className = 'winner-modal-overlay';
                    winnerModal.innerHTML = `
                        <div class="winner-modal-content winner-message-animate">
                            <span class="winner-crown">👑</span>
                            <div class="winner-text">${btn1.innerText} Wins!</div>
                            <button class="winner-close-btn">Close</button>
                        </div>
                    `;
                    document.body.appendChild(winnerModal);
                    // Add close button event
                    winnerModal.querySelector('.winner-close-btn').onclick = function() {
                        winnerModal.remove();
                    };
                } else {
                    winnerModal.querySelector('.winner-text').innerText = `${btn1.innerText} Wins!`;
                    winnerModal.style.display = 'flex';
                }
                // Add animation to winning buttons
                btn1.classList.add('winner-animate');
                btn2.classList.add('winner-animate');
                btn3.classList.add('winner-animate');
            }
        });
});
});
let resetBtn=document.querySelector('.container button');
resetBtn.addEventListener('click',()=>{
    btn.forEach(element => {
        element.innerText='';
        element.disabled=false;
        element.classList.remove('winner-animate');
    });
    // Remove winner modal if present
    let winnerModal = document.getElementById('winner-modal');
    if (winnerModal) {
        winnerModal.remove();
    }
});
