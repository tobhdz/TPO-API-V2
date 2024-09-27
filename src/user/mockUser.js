const mockUser = { 
    user: "admin",
    password: "admin",
    email: "admin@gmail.com",
    name: "Juan Pérez",
    balance: 5000,
    gastos: [
      { name: "hola", descripcion: "hola", monto: "1000", fechaInicio: "", fechaVencimiento: "24/07/2024", participantes: [{ email: "", porcentaje: 0 }] },
      { name: "chau", descripcion: "chau", monto: "5000", fechaInicio: "", fechaVencimiento: "24/08/2024", participantes: [{ email: "", porcentaje: 0 }] },
      { name: "hello", descripcion: "hello", monto: "1000", fechaInicio: "", fechaVencimiento: "22/07/2024", participantes: [{ email: "", porcentaje: 0 }] },
      { name: "melu", descripcion: "melu", monto: "2000", fechaInicio: "", fechaVencimiento: "27/09/2024", participantes: [{ email: "", porcentaje: 0 }] },
      { name: "tobi", descripcion: "tobi", monto: "7000", fechaInicio: "", fechaVencimiento: "27/09/2024", participantes: [{ email: "", porcentaje: 0 }] }
    ],
    metodosPago:[{}]
};

export default mockUser;
