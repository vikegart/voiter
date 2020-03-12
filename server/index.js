const express = require('express');
const app = express();
const http = require("http").Server(app);
const cors = require('cors');

const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

const SECURE_URL = '/chto';
const SHARED_URL = '/shared';

app.use(cors());


app.use('/', express.static('client/pages/playerPage'));
app.use(SECURE_URL, express.static('client/pages/hostPage'));
app.use(SHARED_URL, express.static('client/shared'));

const responseContainer = [];
const countAnswer = {};

io.on("connection", function (socket) {
  console.log("user is connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  socket.on("ready", function (state) {
    io.emit("ready", state);
  });

  socket.on("answer", function (answer) {
    responseContainer.push(answer);
    //пересчет статистики
    for (let i = 0; i < responseContainer.length; i++) {
      let currentAnswer = responseContainer[i];
      if (countAnswer[currentAnswer]) {
        countAnswer[currentAnswer] += 1;
      } else {
        countAnswer[currentAnswer] = 1;
      }
    }
    io.emit("results", countAnswer);
  });

});

http.listen(port, function () {
  console.log("listening to port:" + port);
});