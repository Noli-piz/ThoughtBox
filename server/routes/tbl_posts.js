const express = require('express');
const router = express.Router();
const { tbl_posts, tbl_accounts, tbl_likes, sequelize, Sequelize } = require( "../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { QueryTypes } = require('sequelize');


// Retrieve All Posts from All Users (Accounts) 
router.get("/", async (req, res) => {
    try{
        const username = req.query.username;
        const accountId = await tbl_accounts.findOne({ where : { 'username' : username }, attributes : ['id']  });
        const queryText = "SELECT p.id, p.id_account, a.username, p.post, p.hide_username, p.createdAt,  (SELECT COUNT(*) FROM tbl_likes WHERE id_post = p.id LIMIT 0,1 ) AS like_count, (SELECT id FROM tbl_likes WHERE id_post = p.id AND id_account = :queryAccountId LIMIT 0,1 ) AS id_like, (SELECT COUNT(id) FROM tbl_likes WHERE id_account = :queryAccountId AND id_post = p.id ) AS is_liked,  (SELECT id FROM tbl_bookmarks WHERE id_post = p.id AND id_account = :queryAccountId LIMIT 0,1 ) AS id_bookmark, (SELECT COUNT(id) FROM tbl_bookmarks WHERE id_account = :queryAccountId AND id_post = p.id LIMIT 0,1 ) AS is_bookmarked FROM tbl_posts AS p LEFT JOIN tbl_accounts AS a ON a.id = p.id_account WHERE p.deleted = false ORDER BY p.id DESC";
        const data = await sequelize.query(
            queryText,
            {
                replacements: { 
                    'queryAccountId': accountId.id
                },
                type : QueryTypes.SELECT
            }
        );
        
            res.json(data);
    }catch(e){
        res.json({error : e.message });
    }
});

// Retrieve All Posts from All Users usign Guests ACcount 
router.get("/guests", async (req, res) => {
    try{
        const data = await tbl_accounts.findAll( 
            {
                raw : true,
                attributes: 
                    [
                        'tbl_posts.id',
                        ['id', 'id_account'],
                        'username',
                        'tbl_posts.post',
                        [Sequelize.literal('(SELECT COUNT(*) FROM tbl_likes WHERE id_post = tbl_posts.id LIMIT 0,1 )'), 'like_count'],
                        'tbl_posts.hide_username',
                        'tbl_posts.createdAt'
                    ], 
                include : [{ model: tbl_posts, 
                    where : { 'deleted' : false},
                    attributes : []
                }],
                order : [['tbl_posts','id', 'DESC']],
            });
        
            res.json(data);
    }catch(e){
        res.json({error : e.message });
    }
});


// Retrieve All Posts from specific Users (Accounts) 
router.get("/myposts", async (req, res) => {
    try{
        const username = req.query.username;
        const data = await tbl_accounts.findAll( 
        { 
            where : { 'username' : username },
            raw : true,
            attributes: 
                [
                    'tbl_posts.id',
                    ['id', 'id_account'],
                    'username',
                    'tbl_posts.post',
                    'tbl_posts.hide_username',
                    'tbl_posts.createdAt',
                    [sequelize.literal('(SELECT COUNT(id) FROM tbl_likes AS l where l.id_post = tbl_posts.id LIMIT 0,1)'), 'like_count'],
                    [sequelize.literal('(SELECT id FROM tbl_likes WHERE id_post = tbl_posts.id AND id_account = tbl_accounts.id LIMIT 0,1)'), 'id_like'],
                    [sequelize.literal('(SELECT COUNT(id) FROM tbl_likes WHERE id_account = tbl_accounts.id AND id_post = tbl_posts.id )'), 'is_liked'],
                    [sequelize.literal('(SELECT id FROM tbl_bookmarks WHERE id_post = tbl_posts.id AND id_account = tbl_accounts.id LIMIT 0,1 )'), 'id_bookmark'],
                    [sequelize.literal('(SELECT COUNT(id) FROM tbl_bookmarks WHERE id_account = tbl_accounts.id AND id_post = tbl_posts.id LIMIT 0,1)'), 'is_bookmarked']
                ], 
            include : [{ model: tbl_posts, 
                where : { 'deleted' : false},
                attributes : []
            }],
            order : [['tbl_posts','id', 'DESC']],
        });
        
            res.json(data);
    }catch(e){
        res.json({error : e.message });
    }

});

// Insert Posts
router.post("/", validateToken, async (req, res) => {
    try{
        const { username, post, hide_username } = req.body;
        const accountId = await tbl_accounts.findOne({ where : { 'username' : username }, attributes : ['id']  });
        await tbl_posts.create({ 'id_account' : accountId.id, 'post' : post, 'hide_username' : hide_username });
        res.json("Success")
    }catch(e){
        res.json({error : e.message });
    }
});

// Update Posts
router.post("/update",  validateToken, async (req, res) => {
    try{
        const { post , id, hide_username } = req.body;
        await tbl_posts.update({ 'post' : post, 'hide_username' : hide_username }, { where : { 'id' : id } });
        res.json("Success");
    }catch(e){
        res.json({error : e.message });
    }
});


// Delete Posts
router.get("/delete", async (req, res) => {
    try{
        const { id } = req.query;
        await tbl_posts.update({ 'deleted' : true }, { where : { id : id } });
        res.json("Success");
    }catch(e){
        res.json({error : e.message });
    }
});

module.exports = router 