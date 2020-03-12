import { answerButton } from './button-component.mjs';


const socket = io();
const DEBUG_MODE = false;
const defaultState = {
    ready: true,
    buttons: [
        {
            label: 'A',
        },
        {
            label: 'B',
        },
        {
            label: 'C',
        },
        {
            label: 'D',
        },
    ]
}
const setDefState = () => { state = defaultState };


const answerGroup = document.getElementsByClassName("answer-group")[0];
const waitScreen = document.getElementsByClassName('wait-screen')[0];

let state = {
    ready: false,
    buttons: [],
};

const update = () => {
    console.log(state);
    if (state.ready) {
        waitScreen.classList.add('hidden');
        answerGroup.classList.remove('hidden');
        state.buttons.forEach((button, index) => {
            answerGroup.innerHTML += answerButton(index);
        });
    } else {
        waitScreen.classList.remove('hidden');
        answerGroup.classList.add('hidden');
    }
}

const handleGroupClick = e => {
    const answer = e.target.innerText;
    socket.emit("answer", answer);
    window.navigator.vibrate && window.navigator.vibrate([300]);
    state = {ready: false, buttons: []};
    update();
};

answerGroup.addEventListener("click", handleGroupClick);

socket.on('ready', newState => {
    state = { ...newState };
    console.log(state);
    DEBUG_MODE && setDefState();
    update();
});


