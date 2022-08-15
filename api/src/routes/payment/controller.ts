import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import config from '../../config'

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const createCheckout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { userId, product: { name, value, category }, price } = req.body;

        // create product
        const product = await stripe.products.create({
            name,
            default_price_data:{
                currency: 'USD',
                unit_amount: price * 100
            }
        });

        // create checkout session
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['CA', 'US'],
            },
            phone_number_collection: {
                enabled: true,
            },
            line_items: [
                {
                    price: product.default_price,
                    quantity: 1
                },
            ],
            mode: 'payment',
            success_url: `${config.clientUrl}/game?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.clientUrl}/game`,
            metadata: {
                value,
                userId,
                category
            }
        });
        
        res.status(200).json(session);
    }
    catch (err) {
        next(err);
    }
};

const getSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { sessionId } = req.query;

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (!session) throw new Error('Session not found');

        res.status(200).json(session);
    }
    catch (err) {
        next(err);
    }
};

export { 
    createCheckout, 
    getSession 
}