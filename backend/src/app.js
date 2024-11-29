import gastosRoutes from './routes/gastoroutes.js';

// Agregar esta línea donde están las demás rutas
app.use('/api/gastos', gastosRoutes); 