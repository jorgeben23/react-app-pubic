import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { CustomSweetAlert } from '../../../config/Theme.config'
import { loginApi } from '../../../api/login/login-api'
import { store } from './../../../redux/store';
import { logout } from './../../../redux/slices/auth.slice.ts';
import { useNavigate } from 'react-router'

const TokenExpirationHandler: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.authReducer.token);
    const expiracionToken = useSelector( (state :RootState) => state.authReducer.expirationToken );
    // const expiracionToken = "2024-10-17T22:15:17.000Z"; 

    const cerrarSesion = useCallback(async () => {

        const logoutSesion = await loginApi.logout();
        if (logoutSesion.status == 200) {
            store.dispatch(logout());
            navigate('/');
        }

    }, [token, dispatch]);

    const showAlert = useCallback(async (
        titulo: string,
        mensaje: string,
        tipo: "success" | "error" | "warning" | "info"
    ) => {
        CustomSweetAlert.fire({
            title: titulo,
            html: mensaje,
            icon: tipo,
            showConfirmButton: true,
            allowOutsideClick: false,
            confirmButtonText: "Volver a iniciar Sesión",
        }).then(async (resultado) => {
            if (resultado.isConfirmed) {
                await cerrarSesion();
            }
        });
    }, [cerrarSesion]);

    useEffect(() => {
        if (!expiracionToken) return;

        const now = new Date();
        const dayExpiration = new Date(expiracionToken);
        const tiempoRestante = dayExpiration.getTime() - now.getTime();

        if (tiempoRestante <= 0) {

            showAlert('¡Atención!', 'El token de sesión ha expirado. Vuelve a iniciar sesión para generar un token válido.', "warning");
            return;
        }

        const temporizador = setTimeout(() => {
            showAlert('¡Atención!', 'El token de sesión ha expirado. Vuelve a iniciar sesión para generar un token válido.', "warning");
        }, tiempoRestante);

        return () => clearTimeout(temporizador);

    }, [expiracionToken, showAlert]);

    return null;
}

export default TokenExpirationHandler;