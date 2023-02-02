import * as yup from 'yup';

export const editForm = yup.object().shape({
    name: yup.string(),
    email: yup.string().email("Not a valid email"),
    password: yup.string(),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    phone_number: yup.string(),
})

