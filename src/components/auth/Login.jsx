import React from 'react';
import { useDispatch } from 'react-redux';
import { setSocketIO } from '../../actions/socketIO';
import useForm from '../../hooks/useForm';

export const Login = () => {

    const dispatch = useDispatch();
    const [formValues, handleChange] = useForm({
        password: '',
        user: ''
    });
    const {password, user} = formValues;

    const handleLogin = () => {
        dispatch(setSocketIO(user));
    }

    return (
        <div className="loginScreen">
            <p>Iniciar sesión</p>
            <input 
                type="text"
                name="user"
                value={user}
                onChange={handleChange}
                placeholder="Nombre de usuario"
            />
            <input 
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Contraseña"
            />
            <button onClick={handleLogin}>
                Iniciar
            </button>
        </div>
    )
}
