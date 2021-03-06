import { answerButton } from './button-component.mjs';
import { fitText } from "./fitText.mjs";

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
    if (state.ready) {
        waitScreen.classList.add('hidden');
        answerGroup.classList.remove('hidden');
        state.buttons.forEach((button, index) => {
            const labelText = button.label || index;
            answerGroup.innerHTML += answerButton(labelText, index);
        });
        const htmlBtns = document.getElementsByClassName('answer-button');
        for (const btn of htmlBtns) {
            fitText(btn);
        }        
    } else {
        waitScreen.classList.remove('hidden');
        answerGroup.classList.add('hidden');
        answerGroup.innerHTML = '';
    }
}

const handleGroupClick = e => {
    const label = e.target.innerText;
    const index = e.target.getAttribute('data-index');
    socket.emit("answer", index);
    window.navigator.vibrate && window.navigator.vibrate([300]);
    state = { ready: false, buttons: [] };
    update();
};

answerGroup.addEventListener("click", handleGroupClick);

socket.on('ready', newState => {
    state = { ...newState };
    DEBUG_MODE && setDefState();
    update();
});
