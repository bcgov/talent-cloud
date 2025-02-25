import * as Yup from 'yup';

export const programSelectionSchema = Yup.object().shape({})

export const experienceRolesSchema = Yup.object().shape({}) 

export const skillsSchema = Yup.object().shape({})

export const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
})

export const reviewAndSubmitSchema = Yup.object().shape({})



