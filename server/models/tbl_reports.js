module.exports  = (sequelize, DataTypes) => {
    const tbl_reports = sequelize.define("tbl_reports", {
        
        problem:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        additional_info:{
            type: DataTypes.STRING(1000),
            allowNull: true,
        },

        mark_as_read:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        deleted:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });



    tbl_reports.associate = (models) => {
        tbl_reports.belongsTo(models.tbl_accounts , 
        {
            foreignKey: { 
                name : 'id_account', 
                allowNull : false
            }
        },
        {
            onDelete: "cascade",
        });

        tbl_reports.belongsTo(models.tbl_posts , 
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


    return tbl_reports;
};