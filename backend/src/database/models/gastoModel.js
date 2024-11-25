import { DataTypes} from "sequelize";

export default (sequelize)=>{
    const Gastos= sequelize.define('Gastos',{
        gastoId:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,

        },
        descripcion:{
            type:DataTypes.STRING,

        },
        subtotal:{
            type:DataTypes.DECIMAL(10,2),

        },
        fecha: {
            type:DataTypes.DATE,

        },
        proyectoId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Proyectos', // Nombre de la tabla relacionada
                key: 'projectId',   // Campo de referencia en Project
            },
            onDelete: 'CASCADE',
        }
    },{
        tableName:'Gastos',
    });

    Gastos.associate=(models)=>{
        Gastos.belongsTo(models.Project,{
            foreignKey: 'proyectoId',
            onDelete: 'CASCADE'
        })
    }
  
    return Gastos;
}


