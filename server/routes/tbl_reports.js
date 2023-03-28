const express = require('express');
const { where, Op } = require('sequelize');
const router = express.Router();
const { tbl_reports, tbl_accounts,tbl_posts,Sequelize } = require( "../models");


// Retrieve All Reports
router.get("/", async (req, res) => {
    try{
        const data = await tbl_reports.findAll(
            { 
                raw:true,
                attributes : 
                [
                    'id', 
                    'problem', 
                    'additional_info', 
                    'mark_as_read',
                    'deleted', 
                    ['createdAt', 'report_date'], 
                    [Sequelize.literal('tbl_account.id') , 'id_reporter'],
                    [Sequelize.literal('tbl_account.username') , 'reporter'],
                    'tbl_post.tbl_account.username',
                    [Sequelize.literal('tbl_post.id') , 'id_post'],
                    [Sequelize.literal('tbl_post.deleted') , 'post_deleted'],
                    'tbl_post.post',
                    'tbl_post.createdAt',
                ],
                include : [
                    { model: tbl_posts,
                    attributes : [],
                    include : [
                        { model: tbl_accounts, 
                        attributes :  [] 
                    }]},
                    { model: tbl_accounts,
                        attributes :  []
                    }
                ],

                order: [['id', 'DESC']]
            }
        );

        res.json(data);
    }catch(e){
        res.json({error : e.message });
    }

});


// Insert Reports
router.post("/", async (req, res) => {
    try{
        const { problem, additionalInfo, username, postId  } = req.body;
        const accountId = await tbl_accounts.findOne( { where : {'username' : username }, attributes : ['id'] });
        await tbl_reports.create({ 'problem' : problem, 'additional_info' : additionalInfo, 'id_account' : accountId.id , 'id_post' : postId });
        res.json("Success")
    }catch(e){
        res.json({error : e.message });
    }
});


// Update Reports
router.put("/", async (req, res) => {
    try{
        const { reportId, markAsRead } = req.body;
        await tbl_reports.update({'mark_as_read': markAsRead }, {where : { 'id' : reportId}});
        res.json("Success")
    }catch(e){
        res.json({error : e.message });
    }
});

module.exports = router 