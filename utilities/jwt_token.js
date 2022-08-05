const jwt = require('jsonwebtoken');
const secret = "youth is ready";

exports.generate_token = (data, expiresIn="1d") => {
  return  jwt.sign({data} , 'youth is ready', { expiresIn });

}
exports.token_parser = async (req, res, next) =>{
    const {token} = req.query;
    console.log("token", token)
    try{
        const decoded =  await Promise.resolve(jwt.verify(token, secret));
        console.log("decoded", decoded)
        req.body.token = decoded;
        next();
    }catch(error){
        console.log(error)
    }
  
}