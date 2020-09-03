const constants = require("../config/constants"),
  jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = req.headers['access-token'] || req.headers['authorization'] || ""; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  console.log(token)
  if (token) {
    jwt.verify(token, constants.JWT_SECERETE_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: 0,
          msg: 'Token is not valid',
          mobile_msg: 'Token is not valid',
          err: null
        });
      } else {
        req.user_id = decoded.user_id;
        next();
      }
    });
  } else {
    return res.status(403).json({
      status: 0,
      msg: 'Auth token is missing',
      mobile_msg: 'Auth token is missing',
      err: null
    });
  }
}