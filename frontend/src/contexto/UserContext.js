import React, { createContext, useState } from 'react';

// Contexto (para compartir información entre componentes)
export const UserContext = createContext();

// Proveedor
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [balance, setBalance] = useState(0);
    const [gastos, setGastos] = useState([]);
    const [password, setPassword] = useState('admin'); // Establece una contraseña por defecto
    const [profileImage, setProfileImage] = useState('/img/defaultuser.png');
    const [metodosPago, setMetodosPago]=useState([]);

    // Función para actualizar el estado del usuario y la contraseña
    const login = (userData) => {
        setUser(userData.user);
        setName(userData.name);
        setEmail(userData.email);
        setBalance(userData.balance);
        setGastos(userData.gastos);
        setPassword(userData.password); // Almacena la contraseña
    };

    const logout = () => {
        setUser(null);
        setName('');
        setEmail('');
        setBalance(0);
        setGastos([]);
        setPassword(''); // Limpiar la contraseña al cerrar sesión
    };

    const updatePassword = (newPassword) => {
        setPassword(newPassword); // Actualiza la contraseña
    };

    const updateProfileImage = (imageUrl) => {
        setProfileImage(imageUrl);
    };

    const updateUser = ({ newUser, newName, newEmail }) => {
        if (newUser) setUser(newUser);
        if (newName) setName(newName);
        if (newEmail) setEmail(newEmail);
    };

    const addGasto=(gasto)=>{
        setGastos(gastos.push(gasto))
    }

    const addPayMethod=(newPayMethod)=>{
        setMetodosPago(newPayMethod);
    }

    const updateBalance=(monto)=>{
        setBalance(balance-monto);
    }

    const removeGasto=(gastoName)=>{
        setGastos(gastos.filter((gasto) => gasto.name !== gastoName));
    }
    const getGastosVencidos = () => {
        const today = new Date();
        return gastos.filter(gasto => gasto.fechaVencimiento < today);
    };
    
    const getGastosPorVencer = (dias) => {
        const today = new Date();
        const limite = new Date();
        limite.setDate(today.getDate() + dias);
        
        return gastos.filter(gasto => {
            //const fechaVencimiento = new Date(gasto.fechaVencimiento);
            return gasto.fechaVencimiento >= today && gasto.fechaVencimiento <= limite;
        });
    };
    
    return (
        <UserContext.Provider value={{ user, name, email, balance, gastos, password, profileImage,metodosPago, login, logout, updateProfileImage, updateUser, updatePassword,addGasto, addPayMethod, updateBalance, removeGasto, getGastosVencidos, getGastosPorVencer}}>
            {children}
        </UserContext.Provider>
    );
};