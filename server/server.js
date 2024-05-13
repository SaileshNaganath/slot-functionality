const serverConfig = require ("./configs/server.config");
const dbConfig = require("./configs/db.config");


const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose");
const paymentConfig = require("./configs/payment.config");



//Initializing Express

const app = express();

//Using body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

/**
 * DB Connection Initialize
 */




const connectToMongo = async () => {
    await mongoose.connect(dbConfig.DB_URL);
    console.log("Connected to MongoDB");
  };
  
  connectToMongo();

mongoose.set('strictQuery', true);
   
/**
 * Importing the routes
 */


require('./routes/slot.routes')(app)
require('./routes/payment.routes')(app)

app.get("/api/getKey", (req, res) =>
  res.status(200).json({ key: paymentConfig.RAZORPAY_KEY_ID })
);

//App initializing
app.listen(serverConfig.PORT, () =>{
    console.log(`Application is running in ${serverConfig.PORT} PORT`)
})
