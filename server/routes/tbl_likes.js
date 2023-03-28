const express = require('express');
const router = express.Router();
const { tbl_likes, tbl_accounts } = require( "../models");


// Retrieve All
router.get("/", async (req, res) => {
    const data = await tbl_likes.findAll();
    res.json(data);
});

// Insert
router.post("/", async (req, res) => {
    try{
        const { username, postId } = req.body;
        const accountId = await tbl_accounts.findOne({ where : { 'username' : username }, attributes : ['id']  });
        await tbl_likes.create({ 'id_account' : accountId.id, 'id_post' : postId });
        res.json("Success");
    }catch(e){
        res.json({error : e.message });
    }
});

// Delete
router.get("/delete", async (req, res) => {
    try{
        const { likedId } = req.query;
        await tbl_likes.destroy({ where : { 'id' : likedId}});
        res.json("Success");
    }catch(e){
        res.json({error : e.message });
    }
});

module.exports = router 