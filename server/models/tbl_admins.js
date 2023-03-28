module.exports  = (sequelize, DataTypes) => {
    const tbl_admins = sequelize.define("tbl_admins", {
        
        username:{
            type: DataTypes.STRING,
            unique : true,
            allowNull: false,
        },
        
        fullname:{
            type: DataTypes.STRING,
            allowNull: true,
        },

        disabled:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        password:{
            type: DataTypes.STRING(999),
            allowNull:false,
        }
    });


    return tbl_admins;
};