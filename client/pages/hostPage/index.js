const socket = io();


const actionButton = document.getElementsByClassName("action-button")[0];
const stopButton = document.getElementsByClassName("stop-button")[0];


const defaultState = {
    ready: true,
    buttons: [
        {
            label: 'Очень длинный лейбл!',
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

actionButton.addEventListener('click', e => {
    socket.emit("ready", defaultState);
});
stopButton.addEventListener('click', e => {
    socket.emit("ready", {ready: false, buttons: []});
});


socket.on('results', results => {
    console.log(results);
});


