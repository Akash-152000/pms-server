const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' })

console.log(process.env.DATABASE_URL);
const connectToMongo = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    .then(()=>console.log("Connected database"))
    .catch((err)=>{console.log(err)})
}

module.exports = connectToMongo;