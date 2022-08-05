
const { validationResult } = require('express-validator');
const req = require('express/lib/request');

const jwt = require('jsonwebtoken')

exports.result_validator = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    
    if(hasErrors){
        const errorList = result.array()?.map((obj)=> {
           return obj.msg;
        })
        next(JSON.stringify(errorList))
        console.log(">>>>>>>>>>",errorList)
    }else{
        next()
    };
}
