initGame();

function initGame() {
    const gameOption = "";
    const namePlayer1 = document.getElementById('hint-forest1').value;
    const namePlayer2 = "";


    initPopupsHandlers()
    setOptions()
    startGame()
    // Your game can start here, but define separate functions, don't write everything in here :)

}


function initPopupsHandlers(){
//     popups in nav-bar: rules, highscore, authors
    const navPopups = document.getElementsByClassName('nav-popup');
    for (navPopup of navPopups){
        navPopup.addEventListener("click", onPopupClickHandler);
    };

    const closeButtons = document.getElementsByClassName('close-button');
    for (button of closeButtons){
        button.addEventListener("click", onCloseButtonClickHandler);
    };

}


function onPopupClickHandler(evt) {
    const navPopupId = evt.target.id;
    const PopupId = navPopupId.split('-')[1];

    setGameVisibilityAndHideAllPopups('hidden');
    document.getElementById(PopupId).style.display = "block";
}

function onCloseButtonClickHandler() {
    setGameVisibilityAndHideAllPopups('visible');
}

function setGameVisibilityAndHideAllPopups(value) {
    const game = document.getElementById('game');
    game.style.visibility = value;

    const allPopups = document.getElementsByClassName('popup');
    for (popup of allPopups){
        popup.style.display = "none";
    };
}





function setOptions() {
    let newGameNav = document.getElementById('play-options');;
    const options = newGameNav.querySelectorAll('a');
    const givenName = document.getElementById('form').querySelector('button');

    for (option of options) {
        option.addEventListener('click', OnOptionClickHandler);
    }
    givenName.addEventListener('click', OnNameSaveHandler);

}

function OnOptionClickHandler(evt) {
    if (evt.target.id == "single-player"){
        gameOption = "single-player";
        document.getElementById('second-player').style.display = "none";

    }else{
        gameOption = "multi-player";
        document.getElementById('second-player').style.display = "block";
    }

    setGameVisibilityAndHideAllPopups('hidden');
    document.getElementById('form').style.display = "block";

}

function OnNameSaveHandler(evt) {
    let player = "";
    if (gameOption == "single-player"){
        let givenName = document.getElementById('name-player1').value;
        namePlayer1 = givenName.charAt(0).toUpperCase() + givenName.slice(1);
        player = namePlayer1;
    }else{
        let givenName = document.getElementById('name-player1').value;
        namePlayer1 = givenName.charAt(0).toUpperCase() + givenName.slice(1);
        let secondGivenName = document.getElementById('name-player2').value;
        namePlayer2 = secondGivenName.charAt(0).toUpperCase() + secondGivenName.slice(1);
        player = namePlayer2;
    }
        document.getElementById('hint-forest1').innerHTML = player + ", try to remember where the items are located!";
        document.getElementById('hint-forest1').style.textTransform = "initial";

    // powyższa funkcja powinna być później przeniesiona do zdarzenia, które zasłania Forest 1s
        document.getElementById('hint-forest2').innerHTML = player + ", place items in the forest!";
        document.getElementById('hint-forest2').style.textTransform = "initial";

    setGameVisibilityAndHideAllPopups('visible');
}


function startGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)
    var btn = document.getElementById("newGame");



    btn.onclick = function() {

        const trees = document.querySelector(".forest-test2");
        const gameSlot = document.getElementById("forest1-slots");
        const gameSlotForPlayer = document.getElementById('forest2-slots');
        const animals = document.getElementById("mixed-cards");
        for (var i = 0; i < 21; i++){
            gameSlot.appendChild(trees.children[Math.random() * 3 | 0].cloneNode(true));
        }
        for (var i = 0; i < 4; i++){
            gameSlot.appendChild(animals.children[Math.random() * animals.children.length | 0].cloneNode(true));
        }
        for (var i = gameSlot.children.length; i >= 0; i--) {
            gameSlot.appendChild(gameSlot.children[Math.random() * i | 0]);
        }
        for (var i = 0; i < gameSlot.children.length; i++) {
            if (gameSlot.children[i].classList.contains("tree")){
              gameSlotForPlayer.appendChild(gameSlot.children[i].cloneNode(true));
            } else {
                var new_row = document.createElement("div");
                new_row.setAttribute("class", "slot");
                gameSlotForPlayer.appendChild(new_row)
            }

        }
        setGameVisibilityAndHideAllPopups("visible")
    }
}

