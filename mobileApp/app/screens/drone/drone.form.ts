import * as yup from 'yup';

export const batteriesForm = yup.object().shape({
    batteries: yup.number().required("Need number of all batteries"),
    chargedBatteries: yup.number().required("Need number of all charged batteries"),
})

