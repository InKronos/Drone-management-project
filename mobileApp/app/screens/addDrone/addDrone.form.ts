import * as yup from 'yup';

export const verificationForm = yup.object().shape({
    verifyCode: yup.number().required("Verification code is required").moreThan(99999, "Verification code must have 6 only digits"),
})

