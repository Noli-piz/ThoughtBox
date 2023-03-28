module.exports  = (sequelize, DataTypes) => {
    const tbl_posts = sequelize.define("tbl_posts", {
        
        post:{
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        
        hide_username:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull:false,
        }
    });

    tbl_posts.associate = (models) => {
        tbl_posts.belongsTo(models.tbl_accounts , 
        {
            foreignKey: 
            {
                name : "id_account",
                allowNull : false
            }
        },
        {
            onDelete: "cascade",
        });


        tbl_posts.hasMany(models.tbl_likes , 
        {
            foreignKey: {
                name : "id_account",
                allowNull : false
            }
        },
        {
            onDelete: "cascade",
        });
    }


    return tbl_posts;
};