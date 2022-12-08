const Message = require('../models/message');
const User = require('../models/user');

const connectUser = async ( uuid = '') => {
    const user = await User.findById(uuid);
    user.online = true;
    await user.save();
    return user;
}

const disconnectUser = async ( uuid = '') => {
    const user = await User.findById(uuid);
    user.online = false;
    await user.save();
    return user;
}

const saveMessage = async (payload) => {
    try {
        const message = Message(payload);
        await message.save();
        return true;
    }catch(exception) {
        return false;
    }
}


module.exports = {
    connectUser,
    disconnectUser,
    saveMessage
}