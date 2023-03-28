const express = require('express');
const { where, Op } = require('sequelize');
const router = express.Router();
const { tbl_bookmarks, tbl_posts, tbl_accounts, OP } = require( "../models");


// Retrieve All Bookmarks from specific Users (Accounts) 
router.get("/", async (req, res) => {
    try{
        const username = req.query.username;
        const data = await tbl_accounts.findAll( 
            {
                where : { username : username},
                attributes: { 
                    exclude: ['updatedAt', 'password']
                }, 
                include : [
                    { model: tbl_bookmarks, 
                    attributes : { 
                        exclude : ['createdAt','updatedAt', 'id_account'] 
                    },
                    include : [
                        { model: tbl_posts, 
                        attributes : { 
                            exclude : ['createdAt','updatedAt', 'id_account'] 
                        }
                    }]
                }]
            });
        
            res.json(data);
    }catch(e){
        res.json({error : e.message });
    }

});


// Insert Bookmarks
router.post("/", async (req, res) => {
    try{
        console.log(req.body)
        const { username, postId } = req.body;
        const accountId = await tbl_accounts.findOne({ where : { 'username' : username }, attributes : ['id']  });
        await tbl_bookmarks.create({ 'id_account' : accountId.id, 'id_post' : postId });
        res.json("Success")
    }catch(e){
        res.json({error : e.message });
    }
});

// Delete Bookmarks
router.get("/delete", async (req, res) => {
    try{
        const {bookmarkedId } = req.query;
        await tbl_bookmarks.destroy({ where : { 'id' : bookmarkedId}});
        res.json("Success")
    }catch(e){
        res.json({error : e.message });
    }
});

module.exports = router 