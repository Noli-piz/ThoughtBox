module.exports  = (sequelize, DataTypes) => {
    const tbl_bookmarks = sequelize.define("tbl_bookmarks", {

    });


    tbl_bookmarks.associate = (models) => {
        tbl_bookmarks.belongsTo(models.tbl_accounts , 
        {
            foreignKey: { 
                name : 'id_account', 
                allowNull : false
            }
        },
        {
            onDelete: "cascade",
        });

        tbl_bookmarks.belongsTo(models.tbl_posts , 
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

    return tbl_bookmarks;
};