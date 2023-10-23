const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
   try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
} catch (error) {
    res.status(401).json({
        success: false,
        message: error
    }) 
}

})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
   try {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
   } catch (error) {
    res.status(401).json({
        success: false,
        message: error
    }) 

   }
    

})