const mongoose = require('mongoose');
const mongourl="YOUR MONGODB URL"

const connectDb = async() => {
    try{
        await mongoose.connect(mongourl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("base de datos conectada");
    }
    catch(e)
    {
        console.log(e);
        process.exit(1);
    }

};
module.exports = connectDb; 