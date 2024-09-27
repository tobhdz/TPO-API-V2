const mockUser = {   
  user: "admin",  
  password: "admin",  
  email: "admin@gmail.com",  
  name: "Juan Pérez",  
  balance: 5000,  
  gastos: [  
    {   
      name: "Cena de grupo",   
      descripcion: "Cena celebrando el cumpleaños de Ana",   
      monto: "1200",   
      fechaInicio: "01/07/2024",   
      fechaVencimiento: "01/08/2024",   
      participantes: [  
        { email: "ana@gmail.com", porcentaje: 25 },  
        { email: "luis@gmail.com", porcentaje: 25 },  
        { email: "maria@gmail.com", porcentaje: 25 },  
        { email: "juan@gmail.com", porcentaje: 25 }  
      ]   
    },  
    {   
      name: "Viaje a la montaña",   
      descripcion: "Gastos del alquiler de la cabaña",   
      monto: "3000",   
      fechaInicio: "15/07/2024",   
      fechaVencimiento: "15/08/2024",   
      participantes: [  
        { email: "juan@gmail.com", porcentaje: 50 },  
        { email: "luis@gmail.com", porcentaje: 50 }  
      ]   
    },  
    {   
      name: "Fiesta de fin de año",   
      descripcion: "Gastos de la comida y bebida",   
      monto: "4000",   
      fechaInicio: "31/12/2024",   
      fechaVencimiento: "15/01/2025",   
      participantes: [  
        { email: "ana@gmail.com", porcentaje: 20 },  
        { email: "luis@gmail.com", porcentaje: 30 },  
        { email: "maria@gmail.com", porcentaje: 30 },  
        { email: "juan@gmail.com", porcentaje: 20 }  
      ]   
    },  
    {   
      name: "Compra de material de trabajo",   
      descripcion: "Materiales para el proyecto del equipo",   
      monto: "1500",   
      fechaInicio: "05/07/2024",   
      fechaVencimiento: "20/07/2024",   
      participantes: [  
        { email: "ana@gmail.com", porcentaje: 33.33 },  
        { email: "luis@gmail.com", porcentaje: 33.33 },  
        { email: "maria@gmail.com", porcentaje: 33.34 }  
      ]   
    },  
    {   
      name: "Salón para el evento",   
      descripcion: "Alquiler del salón para el evento",   
      monto: "8000",   
      fechaInicio: "20/08/2024",   
      fechaVencimiento: "20/09/2024",   
      participantes: [  
        { email: "juan@gmail.com", porcentaje: 40 },  
        { email: "maria@gmail.com", porcentaje: 30 },  
        { email: "luis@gmail.com", porcentaje: 30 }  
      ]   
    }  
  ],  
  metodosPago:[{}]  
};  

export default mockUser;