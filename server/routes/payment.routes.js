const paymentsController = require ("../controllers/payment.controller");


module.exports =function (app){


    app.post("/api/checkout",paymentsController.checkout);
    app.post("/api/paymentVerification",paymentsController.paymentVerification);

}