import * as yup from 'yup';

export const LoginValidate = yup.object().shape({
  username: yup.string().trim().required('El usuario es requerido'),
  password: yup
    .string()
    .trim()
    .required('La contraseña es requerida')
    .min(8, 'El minimo debe ser 8 caracteres')
    .max(20, 'El maximo debe ser 20 caracteres'),
});
