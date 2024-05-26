const jwt = require("jsonwebtoken");
const {SECRET} = require("../utils.js");

const auth = (req, res, next) => {
    if(!req.headers.authorization){
        res.setHeader("Content-Type","application/json");
        return res.status(401).json({error:"No existen usuarios autenticados"});
    } 
    let token = req.headers.authorization.split(" ")[1];
    
    try {
        let usuario = jwt.verify(token, SECRET);
        req.user = usuario;
    }
    catch(error){
        res.setHeader("Content-Type","application/json");
        return res.status(401).json({error: error});
    }
    next();
}

module.exports = auth;