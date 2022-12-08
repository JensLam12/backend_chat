const { response } = require('express');
const Message = require('../models/message');

const obtainChat = async (req, res = response ) => {
    const uuid = req.uuid;
    const messagesFrom = req.params.from;

    const lastMessages = await Message.find({
        $or: [{from: uuid, to: messagesFrom }, { from: messagesFrom, to: uuid }]
    })
    .sort({ createdAt: 'desc'})
    .limit(30); 

    res.status(200).json({
        ok: true,
        messages: lastMessages
    });
}

module.exports = {
    obtainChat
}