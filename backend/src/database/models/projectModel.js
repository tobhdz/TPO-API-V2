import { DataTypes } from "sequelize";

export default(sequelize)=>{
    const Project= sequelize.define('Project',{
        projectId:{
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey:true,
        },
        projectName:{
            type:DataTypes.STRING,
            allowNull: false,

        },
        total:{
            type:DataTypes.DECIMAL(10,2),

        },
        usuarioId:{
            type:DataTypes.INTEGER,
            references:{
                model:'Usuarios',
                key:'userId',
            },
            onDelete: 'CASCADE'
        },
        fechaInicio:{
            type:DataTypes.DATE,

        }
    },{
        tableName:'Proyectos'
    });

    Project.associate = (models) => {
        Project.belongsTo(models.User, { 
            foreignKey: 'usuarioId', 
            onDelete: 'CASCADE', 
        });
    };
    
    return Project;
}