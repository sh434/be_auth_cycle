const { check } = require('express-validator');
const { signupModel } = require('../models/signup.model');

exports.signup_validator = () => {
  return [
    check('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number'),

    check('email').isEmail().withMessage('Invalid Email'),
    // .custom(email => {
      // return signupModel.findOne({ email }).then(user => {
      //   if (user) {
      //     return Promise.reject('E-mail already in use');
      //   }
      // });
    // }),
    check('name').isLength({ max: 5 }).withMessage("Name Length must be less then 5")
  ]
}

exports.signin_validator = () => {
  return [
    check('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number'),

    check('email').custom(async (email, { req }) => {
      const user = req.body
   
      const result = await signupModel.findOne({ email }, { __v: false, _id: false,  });
      
      if (!result) {
        throw new Error("user not exist")
      } else {
        req.body.userInfo = result;
        return true
      }

    }),
  ]
}