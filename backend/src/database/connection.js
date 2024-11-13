import sql from 'mssql';

const dbSettings = {
  user: "proyectoAPI",
  password: "ProyectoApi.",
  server: "localhost",
  database: "ProyectoAPI",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
  }
};
