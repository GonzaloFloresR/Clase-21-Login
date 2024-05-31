const { Router } = require("express");
const router = Router();
const UsuarioManager = require("../dao/UsersManager.js");
const { generaHash, validaPassword, SECRET } = require("../utils.js");
const CartsManager = require("../dao/CartsManager.js");
const usuarioManager = new UsuarioManager();
const cartsManagar =new CartsManager();
const auth = require("../middleware/auth.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/error",(req, res) => {
    res.setHeader("Content-Type","application/json");
    return res.status(500).json({error:"Fallos al autenticar"});
});

router.get("/github", passport.authenticate("github",{}),(req, res) => {

});

router.get("/callbackGithub", passport.authenticate("github",{failureRedirect:"/api/sessions/error"}),(req, res) => {
    req.session.usuario = req.user;
    return res.status(200).redirect("/products");
});

router.post("/registro", passport.authenticate("registro",{failureRedirect:"/api/sessions/error"}), async (req, res) => {
    res.setHeader("Content-Type","application/json");
    return res.status(200).redirect("/login");
});

router.post("/login", async(req, res) => {
    let {email , password} = req.body;
    if(!email || !password){
        res.setHeader("Content-Type","application/json");
        return res.status(400).json({error:"Ingrese mail y contraseña"});
    }
    let usuario = await usuarioManager.getUsuarioBy({email});
    if(!usuario){
        res.setHeader("Content-Type","application/json");
        return res.status(400).json({error:"No existe usuario"});
    }
    if(!validaPassword(password , usuario.password)){
        res.setHeader("Content-Type","application/json");
        return res.status(400).json({error:"Error de credenciales"});
    }
    usuario = {...usuario};
    let token = jwt.sign(usuario, SECRET, {expiresIn:"1h"})
    res.cookie("authorization", token, {httpOnly:true});
    delete usuario.password;
    delete usuario.createdAt;
    delete usuario.updatedAt;

    let user = jwt.verify(token, SECRET);
    res.user = user;

    res.setHeader("Content-Type","application/json");
    return res.status(200).json({usuarioLogueado: usuario, token});
});

router.get("/logout", auth, (req, res) => {
    res.clearCookie("authorization");
    return res.status(200).redirect("/login");
});


module.exports = router;
