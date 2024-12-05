import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { instance } from '../../api/base.api';
import { store } from './../store';

interface AuthState {
    isAuth: boolean;
    idUser: number | null;
    userName: string | null;
    fullName?: string;
    roleId: number | null; 
    roleName: string | null;
    token: string | null;
    expirationToken: string | null;
}

const initialState: AuthState = {
    isAuth: false,
    idUser: null,
    userName: null,
    fullName: '',
    roleId: null,
    roleName: null,
    token: null,
    expirationToken: null,
};

const loadStateFromCookie = (): AuthState => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
        const { userName, idUser, fullName, roleId, roleName, token, expirationToken  } = JSON.parse(userCookie);
        return {
            isAuth: true,
            idUser,
            userName,
            fullName,
            roleId,
            roleName,
            token,
            expirationToken
        };
    }
    return initialState;
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: loadStateFromCookie(),
    reducers: {
        login(state, action: PayloadAction<{ idUser: number; userName: string; fullName: string; roleId: number; roleName: string, token: string, expirationToken: string  }>) {
            const { idUser, userName, fullName, roleId, roleName, token, expirationToken } = action.payload;
            state.isAuth = true;
            state.idUser = idUser;
            state.userName = userName;
            state.fullName = fullName;
            state.roleId = roleId;
            state.roleName = roleName;
            state.token = token;
            state.expirationToken = expirationToken;
            
            const expirationDate = new Date(expirationToken);

            Cookies.set('user', JSON.stringify({ idUser, userName, fullName, roleId, roleName, token, expirationToken  }), { expires: expirationDate });
        },
        logout (state) {
                state.isAuth = false;
                state.idUser = null;
                state.userName = null;
                state.fullName = '';
                state.roleId = null;
                state.roleName = null;
                state.token = null;
                state.expirationToken = null;
                Cookies.remove('user');
        },
    },
});

export const { login, logout } = authSlice.actions;

export const cerrarSesion = () => {
    store.dispatch(logout());
};

export default authSlice.reducer;
