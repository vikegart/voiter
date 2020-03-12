const socket = io();

import { answerButton } from './button-component.mjs';

const answerGroup = document.getElementsByClassName("answer-group")[0];
const waitScreen = document.getElementsByClassName('wait-screen')[0];

let name = "";
let state = {
    ready: false,
    buttons: [],
};

const update = () => {
    if (state.ready) {
        waitScreen.classList.toggle('hidden');
        answerGroup.classList.toggle('hidden');
        state.buttons.forEach((button, index) => {
            answerGroup.appendChild(answerButton(index));
        });
    } else {
        waitScreen.classList.toggle('hidden');
        answerGroup.classList.toggle('hidden');
    }
}

const handleGroupClick = e => {
    console.log(e);
    // if (ready) {
    //     window.navigator.vibrate && window.navigator.vibrate(1000);
    //     ready && socket.emit("answer", name);
    // } else {
    //     window.navigator.vibrate && window.navigator.vibrate([300, 100, 300]);
    // }
};

answerGroup.addEventListener("click", handleGroupClick);

socket.on('ready', state => {
    state = { ...state };
    update();
});


