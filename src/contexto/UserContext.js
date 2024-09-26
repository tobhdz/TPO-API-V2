import React, { createContext, useState } from 'react';

// Contexto (para compartir información entre componentes)
// De momento manejamos las variables de user (segun el login) y el saldo
export const UserContext = createContext();

// Proveedor
export const UserProvider = ({ children }) => {
    // Inicializo el estado del user y balance con useState.
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const [gastos, setGastos] = useState([]);

    // Funcion para actualizar el estado del usuario y el saldo en el login
    const login = (userData) => {
        setUser(userData.user);       // Actualiza el nombre del usuario
        setBalance(userData.balance); // Actualiza el saldo
        setGastos(userData.gastos);     //Actualiza lista de gastos
    };

    // Paso el usuario, el saldo, gastos y la función login a los componentes que envuelva el proovedor
    return (
        <UserContext.Provider value={{ user, balance,gastos, login }}>
            {children}
        </UserContext.Provider>
    );
};
