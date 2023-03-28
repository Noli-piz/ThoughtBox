module.exports  = (sequelize, DataTypes) => {
    const tbl_feedbacks = sequelize.define("tbl_feedbacks", {
        
        feedback:{
            type: DataTypes.STRING,
            allowNull: false,
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


    return tbl_feedbacks;
};