import * as yup from 'yup';

export const validateFormUpdatePassword = yup.object().shape({
    password: yup.string().trim().required('La contraseña es requerida'),
    confpassword: yup.string().trim().required('La confirmación de contraseña es requerida')
});