const jwt = require("jsonwebtoken");
const {SECRET} = require("../utils.js");

const auth = (req, res, next) => { 
    if(!req.cookies["authorization"]){
        res.setHeader("Content-Type","application/json");
        return res.status(401).json({error:"No existen usuarios autenticados"});
    } 
    let token = req.cookies["authorization"];
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