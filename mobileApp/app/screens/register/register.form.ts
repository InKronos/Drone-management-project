import * as yup from 'yup';

export const registerForm = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Not a valid email"),
    password: yup.string().required("Password is required"),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    phone_number: yup.string().required("Phone nubmer is required"),
})

