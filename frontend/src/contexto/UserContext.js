import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Contexto (para compartir información entre componentes)
export const UserContext = createContext();

// Proveedor
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => Cookies.get('user') || null);
    const [name, setName] = useState(() => Cookies.get('name') || '');
    const [email, setEmail] = useState(() => Cookies.get('email') || '');
    const [balance, setBalance] = useState(() => Number(Cookies.get('balance')) || 0);
    const [gastos, setGastos] = useState(() => {
        try {
            return JSON.parse(Cookies.get('gastos')) || [];
        } catch {
            return [];
        }
    });
    const [password, setPassword] = useState(() => Cookies.get('password') || '');
    const [profileImage, setProfileImage] = useState(() => {
        const savedImage = Cookies.get('profileImage');
        if (!savedImage) return '/img/defaultuser.png';
        return savedImage.startsWith('http') ? 
               savedImage : 
               `http://localhost:4000/uploads/pfp/${savedImage}`;
    });
    const [metodosPago, setMetodosPago]=useState([]);
    const [userId, setUserId] = useState(() => Cookies.get('userId') || null);

    // Función para actualizar el estado del usuario y la contraseña
    const login = (userData) => {
        setUser(userData.user);
        setName(userData.name);
        setEmail(userData.email);
        setBalance(userData.balance);
        setGastos(userData.gastos);
        setPassword(userData.password);
        setUserId(userData.id);
        setProfileImage(userData.profileImage);

        // Guardar en cookies
        Cookies.set('user', userData.user, { expires: 7 });
        Cookies.set('name', userData.name, { expires: 7 });
        Cookies.set('email', userData.email, { expires: 7 });
        Cookies.set('balance', userData.balance, { expires: 7 });
        Cookies.set('gastos', JSON.stringify(userData.gastos), { expires: 7 });
        Cookies.set('password', userData.password, { expires: 7 });
        Cookies.set('userId', userData.id, { expires: 7 });
        Cookies.set('profileImage', userData.profileImage, { expires: 7 });
    };

    const logout = () => {
        setUser(null);
        setName('');
        setEmail('');
        setBalance(0);
        setGastos([]);
        setPassword(''); // Limpiar la contraseña al cerrar sesión
        setUserId(null);

        // Eliminar cookies
        Cookies.remove('user');
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('balance');
        Cookies.remove('gastos');
        Cookies.remove('password');
        Cookies.remove('profileImage');
        Cookies.remove('userId');
    };

    const updatePassword = (newPassword) => {
        setPassword(newPassword); // Actualiza la contraseña
    };

    const updateProfileImage = (imageUrl) => {
        // Guardamos solo el nombre del archivo en la cookie
        const fileName = imageUrl.split('/').pop();
        Cookies.set('profileImage', fileName, { expires: 7 });
        // Pero usamos la URL completa en el estado
        setProfileImage(`http://localhost:4000/uploads/pfp/${fileName}`);
    };

    const updateUser = ({ newUser, newName, newEmail, newBalance }) => {
        if (newUser) setUser(newUser);
        if (newName) setName(newName);
        if (newEmail) setEmail(newEmail);
        if (newBalance !== undefined) {
            setBalance(newBalance);
            Cookies.set('balance', newBalance, { expires: 7 });
        }
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
        <UserContext.Provider value={{ user, name, email, balance, gastos, password, profileImage,metodosPago, userId, login, logout, updateProfileImage, updateUser, updatePassword,addGasto, addPayMethod, updateBalance, removeGasto, getGastosVencidos, getGastosPorVencer}}>
            {children}
        </UserContext.Provider>
    );
};