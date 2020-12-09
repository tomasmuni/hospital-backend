const mongoose = require('mongoose');


    const dbconnection = async() => {
        try {
            mongoose.connect(process.env.DB_cnn,
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            console.log('Db online');
        } catch (error) {
            console.log(error);
            throw new Error('BBDD error')
        }
    };


module.exports = {
    dbconnection
}
