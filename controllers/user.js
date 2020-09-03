const con = require("../../config/dbConnection"),
      userModel = require("../../models/user");
      form = require('express-form'),
      field = form.field,
      {getResponse,globalResponse,comparePassword,formErrors,hashPassword} = require("../../helpers"),
      constants = require("../../config/constant"),
      bcrypt = require('bcryptjs')
      saltRounds = 7
      jwt = require('jsonwebtoken');

module.exports = {

    postLogin : async(req, res, next) => {

        if (!req.form.isValid) {
                const errors = formErrors(req.form.getErrors());
                globalResponse(res, 200, 0, "Validation Errors \n" + errors.join(','), [], errors);
                return
          }

          let {password,email} = req.body;

        try {
            let userDetails =  await userModel.login(con,email,password);
            
            if(userDetails) {
                // Lets create a JWT token
                let token = jwt.sign({ "user_id": userDetails.id }, constants.JWT_SECERETE_KEY, { algorithm: 'HS256',expiresIn: '18000s' });
                userDetails['token'] = token;
                delete userDetails.password
                globalResponse(res,200,1,'User Found',userDetails);
                return;
               
            } else {
                globalResponse(res,200,0,'Invalid email address or password');

            }

        } catch (error) {
            globalResponse(res,500,0,constants.ERR_MSG,"",error.message ? error.message : '');
        }
    },
    generateBcrypt : async(req,res)=>{
            const {password} = req.body
            const result = await hashPassword(password)
            globalResponse(res,200,1,'Password',result);

    },

    getDashboard : async (req, res, next) => {

        response(1,"Dashboard","","")
        .then(r =>{
            res.status(200).send(r);
        });

    }
}


