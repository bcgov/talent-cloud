
import * as Yup from 'yup'

import { Program } from "@/common";
import { Section } from "@/common/enums/sections.enum";



export  const functionShape = {
  id: Yup.number().when('program', {
    is: (val: Program) => val === Program.EMCR || val === Program.ALL,
    then: () =>
      Yup.number().required('First choice is required.'),
    otherwise: () => Yup.number().notRequired(),
  }),
  name: Yup.string().when('program', {
    is: (val: Program) => val === Program.EMCR || val === Program.ALL,
    then: () =>
      Yup.string().required('First choice is required.'),
    otherwise: () => Yup.string().notRequired(),
  }),
};

const sectionShape = {
  id: Yup.string(),
  name: Yup.string(),
};



export const experiencesValidation = Yup.object().shape({
  emergencyExperience: Yup.string().when('program', {
    is: (val: Program) => val === Program.EMCR || val === Program.ALL,
    then: () => Yup.string().required('Emergency Experience is required.'),
    otherwise: () => Yup.string().notRequired(),
  }),
  preocExperience: Yup.string().when('program', {
    is: (val: Program) => val === Program.EMCR || val === Program.ALL,
    then: () => Yup.string().required('PREOC Experience is required.'),
    otherwise: () => Yup.string().notRequired(),
  }),
  peccExperience: Yup.string().when('program', {
    is: (val: Program) => val === Program.EMCR || val === Program.ALL,
    then: () => Yup.string().required('PECC Experience is required.'),
    otherwise: () => Yup.string().notRequired(),
  }),
  firstNationsExperience: Yup.string().when('program', {
    is: (val: Program) => val === Program.EMCR || val === Program.ALL,
    then: () => Yup.string().required('First Nations Experience is required.'),
    otherwise: () => Yup.string().notRequired(),
  }),

  firstChoiceSection: Yup.object().when('program', {
    is: (val: Program)=> val === Program.ALL || val === Program.BCWS,
    then: ()=> Yup.object().required('First choice is required'),
    otherwise: ()=> Yup.object().notRequired()
  }),
  secondChoiceSection: Yup.object().shape(sectionShape).optional().nullable(),
  thirdChoiceSection: Yup.object().shape(sectionShape).optional().nullable(),

  PLANNING: Yup.array().when('firstChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.PLANNING.toString(),
    then: () =>
      Yup.array().min(1, 'Please select at least one role from your first choice section')
        .required('Choose at least one role from your preferred section(s)'),
  }).when('secondChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.PLANNING.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your second choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('thirdChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.PLANNING.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your third choice section')
        .required('Choose at least one role from your preferred section(s)'),
  }),
  LOGISTICS: Yup.array()
  .when('firstChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.LOGISTICS.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your first choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('secondChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.LOGISTICS.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your second choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('thirdChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.LOGISTICS.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your third choice section')
        .required('Choose at least one role from your preferred section(s)'),
  }),
FINANCE_ADMIN: Yup.array()
  .when('firstChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.FINANCE_ADMIN.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your first choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('secondChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.FINANCE_ADMIN.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your second choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('thirdChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.FINANCE_ADMIN.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your third choice section')
        .required('Choose at least one role from your preferred section(s)'),
  }),
OPERATIONS: Yup.array()
  .when('firstChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.OPERATIONS.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your first choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('secondChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.OPERATIONS.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your second choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('thirdChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.OPERATIONS.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your third choice section')
        .required('Choose at least one role from your preferred section(s)'),
  }),
AVIATION: Yup.array()
  .when('firstChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.AVIATION.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your first choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('secondChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.AVIATION.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your second choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('thirdChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.AVIATION.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your third choice section')
        .required('Choose at least one role from your preferred section(s)'),
  }),
COMMAND: Yup.array()
  .when('firstChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.COMMAND.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your first choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('secondChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.COMMAND.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your second choice section')
        .required('Choose at least one role from your preferred section(s)'),
  })
  .when('thirdChoiceSection', {
    is: (val: { id: string; name: string }) =>
      val?.id === Section.COMMAND.toString(),
    then: () =>
      Yup.array()
  
        .min(1, 'Please select at least one role from your third choice section')
        .required('Choose at least one role from your preferred section(s)'),
  }),


  firstChoiceFunction: Yup.object().when('program', {
      is: (val: Program) => val === Program.EMCR || val === Program.ALL,
      then: () =>
        Yup.object().required('First choice is required.'),
      otherwise: () => Yup.object().notRequired(),
    }),

  secondChoiceFunction: Yup.object().shape(functionShape).optional().nullable(),
  thirdChoiceFunction: Yup.object().shape(functionShape).nullable(),
  functions: Yup.array().min(1, "First Choice Function Is Required").required('Functions').when('program', {
    is: (val: Program) => val === Program.EMCR || val === Program.ALL,
    then: () =>
      Yup.array().min(1, "First Choice Function Is Required").required('Functions'),
    otherwise: () => Yup.array().notRequired(),
  }),
})




