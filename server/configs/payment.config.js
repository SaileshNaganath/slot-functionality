if (process.env.NODE_ENV !== 'production'){
    require ('dotenv').config()
}

module.exports={
    RAZORPAY_KEY_ID:process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET:process.env.RAZORPAY_SECRET

}