import { check } from 'express-validator'

export const LoginValidator = [

    // firebase_uid Validator
    check('firebase_uid', 'firebase_uid is empty')
    .notEmpty(),

    // email Validator
    check('email', 'email is empty')
    .notEmpty(),

    // name Validator
    check('name', 'name is empty')
    .notEmpty(),
    
];

export const GetByEmailValidator = [

    // email Validator
    check('email', 'email is empty')
    .notEmpty(),
    
];

export const CreateSessionValidator = [

    // userId Validator
    check('userId', 'userId is empty')
    .notEmpty(),

    // name Validator
    check('name', 'name is empty')
    .notEmpty(),
    
    // emoji Validator
    check('emoji', 'emoji is empty')
    .notEmpty(),

    // price Validator
    check('price', 'price is empty')
    .notEmpty(),
    
];

export const GetSessionValidator = [

    // sessionId Validator
    check('sessionId', 'sessionId is empty')
    .notEmpty(),
    
];

export const EmojiValidator = [

    // userId Validator
    check('userId', 'userId is empty')
    .notEmpty(),

    // emoji Validator
    check('emoji', 'emoji is empty')
    .notEmpty(),
    
];

export const DeleteValidator = [

    // userId Validator
    check('userId', 'userId is empty')
    .notEmpty(),
    
];

export const SetNameValidator = [

    // userId Validator
    check('userId', 'userId is empty')
    .notEmpty(),

    // name Validator
    check('name', 'name is empty')
    .notEmpty(),

]

export const SendEmailValidator = [

    // email Validator
    check('email', 'email is empty')
    .notEmpty(),

    // name Validator
    check('name', 'name is empty')
    .notEmpty(),

    // subject Validator
    check('subject', 'subject is empty')
    .notEmpty(),

    // html Validator
    check('html', 'html is empty')
    .notEmpty(),

]

export const SendSMSValidator = [

    // to Validator
    check('to', 'to is empty')
    .notEmpty(),

    // body Validator
    check('body', 'body is empty')
    .notEmpty(),
    
]