class MemoryGame{
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }
    startGame(){
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        

        setTimeout(() => {
            this.shuffleCards(this.cards);
            this.countDown = this.startCountDown();
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
        });
    }
    canFlipCard(card) {
        return !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

    
    checkForCardMatch(card){
        if(this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMismatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');
            if(this.cardToCheck !== null){
                this.checkForCardMatch(card);
            }else {
                this.cardToCheck = card;
            }
        }
    }

    getCardType(card){
        return card.getElementsByClassName('card-value')[0].src;
    }

    cardMatch(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        if(this.matchedCards.length === this.cardsArray.length){
            this.victory();
        }
    }

    cardMismatch(card1, card2){
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
        }, 1000)
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0){
                this.gameOver();
        }
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('game-over-text').classList.add('visible');
    }
     
    victory() {
        clearInterval(this.countDown);
        document.getElementById('victory-text').classList.add('visible');
    }
    shuffleCards(cardsArray) { 
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }
}



if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MemoryGame(100, cards);
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
