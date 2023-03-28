const express = require('express');
const router = express.Router();
const {sign , verify} = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { tbl_accounts, tbl_admins , sequelize } = require( "../models");
const bcrypt = require('bcrypt');


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

// Administrator Login
router.get("/admin/login", async (req, res) => {
    try{
        const username = req.query.username;
        const rawPassword = req.query.password;

        //Count the Admin if count is 0 then it create new user
        const count = await tbl_admins.count(); 
        if(count === 0){
            bcrypt.hash('Admin123', 10, async function(err, hashPassword) {
                await tbl_admins.create({ 'username' : 'Admin123', 'password' : hashPassword });
                const accessToken = sign( { username: 'Admin123' }, "importantsecret" );
                return res.json({success : "No registered admin yet! The default Username and Password is Admin123", accessToken :accessToken});
            });
        }

        const data = await tbl_admins.findOne({ where : { username : username}}); //Check if username exist
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