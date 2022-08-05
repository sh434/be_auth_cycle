
// const {signupModel} = require('../models/signup.model');
// const {sendMailTo } = require('../utilities/NodemailerEmail')
const {hashPassword,comparePassword} = require('../utilities/bcrypt');
// const {sendMailTo} = require('../utilities/NodemailerEmail');
const  {signupModel}  = require('../models/signup.model');
const { generate_token } = require('../utilities/jwt_token');
const sendMailTo = require('../utilities/NodemailerEmail');


exports.signupController = async (req, res) => {
    const user = signupModel(req.body)
    user.password = await hashPassword(user.password) 
    user.save( async (err, result) => {
      // console.log(result)
      const verifyAccount = generate_token(result._id, `${60*15}s`)
     const email_link = `http://localhost:1616/verify_account?token=${verifyAccount}`
    const email_status = await sendMailTo([req.body.email], email_link);
  
     res.status(200).send( {result, email_status})
    console.log("signup...............");
    if(err){
        console.log("error", err) 
    }
  })
    
}

exports.verifyAccountController = (req, res, next) =>{
  // const params = req.params; 
  // const data = token_parser(params)
  const {data=""} = req.body.token
  // mongo db user find
  // is_Varified = 
  console.log("data", data)
  signupModel.findOne({_id:data}, async (err, result)=>{
    if(err){
      next(err)
    }if(result){
      const updateAccount = await signupModel.findByIdAndUpdate(
        {_id: data}
     ,{is_Verified:1})
     console.log("data.....", data)
      res.send({status: "account Verified", updateAccount});
    }else{
      res.send({status: "Invalid Url"})
    }
  })
  
}


exports.signinController = async (req, res) => {
 const {userInfo} = req.body
const response = await comparePassword(req.body.password, userInfo.password);

if(response){
  const newResult = JSON.parse(JSON.stringify(req.body.userInfo))
  delete newResult.password;
const token = generate_token(req.body?.userInfo)
 res.status(200).send( {userInfo: newResult, token })
   }
else{
  res.status(400).send({msg:"invalid password"})
}

}