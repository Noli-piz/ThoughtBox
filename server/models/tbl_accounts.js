module.exports  = (sequelize, DataTypes) => {
    const tbl_accounts = sequelize.define("tbl_accounts", {
        
        username:{
            type: DataTypes.STRING,
            unique : true,
            allowNull: false,
        },
        
        fullname:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        password:{
            type: DataTypes.STRING(999),
            allowNull:false,
        }
    });


    tbl_accounts.associate = (models) => {
        tbl_accounts.hasMany(models.tbl_posts , 
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

        tbl_accounts.hasMany(models.tbl_likes , 
        {
            foreignKey: {
                name : "id_account",
                allowNull : false
            }
        },
        {
            onDelete: "cascade",
        });

        tbl_accounts.hasMany(models.tbl_bookmarks , 
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

    return tbl_accounts;
};