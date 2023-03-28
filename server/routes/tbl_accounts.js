const express = require('express');
const router = express.Router();
const {sign , verify} = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { tbl_accounts , sequelize } = require( "../models");
const bcrypt = require('bcrypt');


// Retrieve 1 Account Information
router.get("/", validateToken, async (req, res) => {
    const account_id = req.query.id;
    const data = await tbl_accounts.findByPk(account_id);
    res.json(data);
});

// Retrieve All Accounts Information
router.get("/all", async (req, res) => {
    const data = await tbl_accounts.findAll();
    res.json(data);
});


// Create New Account or Register
router.post("/register", async (req, res) => {
    try{
        const username = req.body.username;

        bcrypt.hash(req.body.password, 10, async function(err, hashPassword) {
            const [data, created] = await tbl_accounts.findOrCreate({
                where: { username: username },
                defaults: {
                  email: req.body.email,
                  fullname: req.body.fullname,
                  password: hashPassword
                }
            });

            
            if (!created) 
                return res.json({error : "Username already exist!"})
    
            return res.json("Account has been successfully created!");
        });

    }catch(e){
        res.json({error : e.message });
    }
});


// Login
router.get("/login", async (req, res) => {
    try{
        const username = req.query.username;
        const rawPassword = req.query.password;

        const data = await tbl_accounts.findOne({ where : { username : username}}); //Check if username exist
        if(!data) return res.json( {error :  "No username exist!"}) 
        

        const match = await bcrypt.compare(rawPassword, data.password); //Check if password is equal
        if(match){
            const accessToken = sign( { username: data.username }, "importantsecret" );
            return res.json({success : "Login Success!", accessToken : accessToken});
        }

        return res.json({error : "Wrong password or email!"} );

    }catch(e){
        res.json({error : e.message});
    }
});

module.exports = router 