const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect( process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Online');
    }catch(exception) {
        console.log(exception);
        throw new Error('Error in database. Talk yo your supervisor');
    }
}

module.exports = {
    dbConnection
}