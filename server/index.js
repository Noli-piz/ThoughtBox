const express = require('express');
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));

const db = require('./models');

// Routes
// Routes for the Login 
const authRouter = require('./routes/auth')
app.use("/auth", authRouter);

//
const adminsRouter = require('./routes/tbl_admins')
app.use("/admins", adminsRouter);

const feedbackRouter = require('./routes/tbl_feedbacks')
app.use("/feedbacks", feedbackRouter);

const reportsRouter = require('./routes/tbl_reports')
app.use("/reports", reportsRouter);

const accountsRouter = require('./routes/tbl_accounts')
app.use("/accounts", accountsRouter);

const postsRouter = require('./routes/tbl_posts')
app.use("/posts", postsRouter);

const accountsLikes = require('./routes/tbl_likes')
app.use("/likes", accountsLikes);

const accountsBookmarks = require('./routes/tbl_bookmarks')
app.use("/bookmarks", accountsBookmarks);


db.sequelize.sync().then(() =>{
    app.listen(3002, () =>{
        console.log("Server running in port 3002");
    });
});

