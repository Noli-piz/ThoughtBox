module.exports  = (sequelize, DataTypes) => {
    const tbl_likes = sequelize.define("tbl_likes", {
        
    });

    
    tbl_likes.associate = (models) => {
        tbl_likes.belongsTo(models.tbl_posts , 
        {
            foreignKey: {
                name : 'id_post',
                allowNull : false
            } 
        },
        {
            onDelete: "cascade",
        });
    }
    return tbl_likes;
};