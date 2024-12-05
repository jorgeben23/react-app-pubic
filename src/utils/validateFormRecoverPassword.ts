import * as yup from 'yup'

export const validateFormRecoverPassword = yup.object().shape({
    userNick: yup.string().trim().required('El usuario es requerido')
});