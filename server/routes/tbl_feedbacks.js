const express = require('express');
const { where, Op } = require('sequelize');
const router = express.Router();
const { tbl_feedbacks } = require( "../models");


// Retrieve All Feedbacks
router.get("/", async (req, res) => {
    try{
        const data = await tbl_feedbacks.findAll({order: [['id', 'DESC']]});
        res.json(data);
    }catch(e){
        res.json({error : e.message });
    }

});


// Insert Feedbacks
router.post("/", async (req, res) => {
    try{
        const { feedback } = req.body;
        console.log(req.body)
        await tbl_feedbacks.create({ 'feedback' : feedback });
        res.json("Success")
    }catch(e){
        res.json({error : e.message });
    }
});

// Update Feedbacks
router.put("/", async (req, res) => {
    try{
        const { feedbackId, markAsRead } = req.body;
        await tbl_feedbacks.update({'mark_as_read': markAsRead }, {where : { 'id' : feedbackId}});
        res.json("Success")
    }catch(e){
        res.json({error : e.message });
    }
});

module.exports = router 