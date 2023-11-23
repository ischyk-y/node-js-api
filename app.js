const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const chatController = require('./controllers/chat.controller');
const messageController = require('./controllers/message.controller');
const mentionController = require('./controllers/mention.controller');
const growthController = require('./controllers/c_growth.controller');
const {Op} = require("sequelize");


app.use(cors());
app.use(bodyParser.json());

app.get('/growth', (req, res) => {
    growthController.getGrowth(req.query).then(data => res.json(data));
});

app.get('/chats', (req, res) => {
    chatController.getChats(req.query).then(data => res.json(data));
});

app.get('/chats/:peer', (req, res) => {
    chatController.getChat(req.params.peer).then(data => res.json(data));
})

app.get('/mentions', (req, res) => {
    mentionController.getMentions(req.query).then(data => res.json(data));
});

app.get('/mentions/aggregation', (req, res) => {
    mentionController.getMentionsAggregation(req.query).then(data => res.json(data));
});

app.post('/mentions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    mentionController.updateMentionValue(id, body).then(data => res.json(data));
});
app.get('/messages', (req, res) => {
    messageController.getMessages(req.query).then(data => res.json(data));
});

app.get('/messages/:id', (req, res) => {
    const message_id = req.params.id;
    const chat_id = req.query.chat_id;
    messageController.getMessage(message_id, chat_id).then(data => res.json(data));
});

module.exports = app;