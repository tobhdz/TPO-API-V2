import { DataTypes } from 'sequelize';

export default (sequelize)=>{
    const User= sequelize.define('User', {
        userId:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail:true,
            }
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        passwd:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        }
    },{
        tableName:'Usuarios'
    });

    return User;
}