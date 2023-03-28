const express = require('express');
const router = express.Router();
const {sign , verify} = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { tbl_admins , sequelize } = require( "../models");
const bcrypt = require('bcrypt');


// Retrieve all Admins
router.get("/", async (req, res) => {
    try{
        const data = await tbl_admins.findAll();
        res.json(data);
    }catch(e){
        res.json({error : e.message});
    }
});

// Update Admins
router.post("/", async (req, res) => {
    try{
        const { adminId , status } = req.body;
        await tbl_admins.update( { 'disabled': status }, { where : { 'id' : adminId }});
        res.json("Success");
    }catch(e){
        res.json({error : e.message});
    }
});

// Update Admin Password 
router.put("/", validateToken, async (req, res) => {
    try{
        const { adminId , password } = req.body;
        await tbl_admins.update( { 'password': password }, { where : { 'id' : adminId }});
        res.json("Success");
    }catch(e){
        res.json({error : e.message});
    }
});

module.exports = router 