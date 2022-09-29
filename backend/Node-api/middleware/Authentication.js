// Newly
const { auth, requiresAuth } = require("express-openid-connect");
const app = require("express").Router();
const { expressjwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");


module.exports = class Authentication {
  constructor() {}

  static async authenticate(req, res, next) {
  
    const token = req.headers.authorization;
    const decodedToken = jwt_decode(token);
   
    let str = decodedToken?.iss + ".well-known/openid-configuration";
    const allConfig = await axios.get(str, {
      headers: { authorization: ` ${token}` },
    });
   
    //Verifying the Access Token received from the headers from frontend with the Auth0 Website.
    const finalUserInfo = await axios.get(allConfig.data.userinfo_endpoint, {
      headers: { authorization: `Bearer ${token}` },
    });

    if (finalUserInfo.data.email_verified) {
      next();
    } else {
      console.log("Authentication failed");
    }
  }
};


