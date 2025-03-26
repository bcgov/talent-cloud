import { Formik } from 'formik';
import { useKeycloak } from '@react-keycloak/web';
import { stepValidation } from './constants/validation';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { type IntakeFormValues } from './constants/types';
import { formTabs } from './utils/tab-fields';
import { Program } from '@/common';
import { Navigate } from 'react-router';
import { Routes } from '@/routes';
import { useProgramFieldData } from '@/hooks';
import IntakeForm from './IntakeForm';
import { Loading } from '@/components';
import { BcwsRoleName, Section, SectionName } from '@/common/enums/sections.enum';
import { intakeFormInitialValues } from './constants/initial-values';
import { CertificationName } from '@/common/enums/tools.enum';

const FormWrapper = () => {
  const { keycloak } = useKeycloak();
  const { tokenParsed } = keycloak;
  const {
    formData,
    step,
    handleSubmit,
    saveUpdateForm,
    disabledSteps,
    handleSetStep,
    handleSetErrorSteps,
    handleSetCompletedSteps,
    errorSteps,
    completedSteps,
  } = useIntakeForm();

  const { functions, locations, tools, sections, certificates, bcwsRoles } =
    useProgramFieldData(Program.ALL);

  const getFieldOptions = (name: string, values: IntakeFormValues) => {
    switch (name) {
      case 'homeLocation':
        return locations.map((loc: any) => ({
          label: loc.locationName,
          value: { id: loc.id, name: loc.locationName },
        }));
      case 'tool':
        return tools.map((tool: any) => ({
          label: tool.fullName,
          value: { id: tool.id, name: tool.fullName },
        }));
      case 'certification':
        return certificates.map((cert: any) => ({
          label: cert.name,
          value: { id: cert.id, name: CertificationName[cert.name as keyof typeof CertificationName] },
        }));
      case 'firstChoiceSection':
        return Object.keys(sections).map((itm: any) => ({
          label: SectionName[itm as keyof typeof SectionName],
          value: { id: itm, name: SectionName[itm as keyof typeof SectionName] },
          disabled: [
            values.firstChoiceSection?.id,
            values.secondChoiceSection?.id,
            values.thirdChoiceSection?.id,
          ].includes(itm),
        }))
      case 'secondChoiceSection':
      case 'thirdChoiceSection':
        return [{label: 'None', value: {id: 'None', name: 'None'}, disabled: false}, ...Object.keys(sections).map((itm: any) => ({
          label: SectionName[itm as keyof typeof SectionName],
          value: { id: itm, name: SectionName[itm as keyof typeof SectionName] },
          disabled: [
            values.firstChoiceSection?.id,
            values.secondChoiceSection?.id,
            values.thirdChoiceSection?.id,
          ].includes(itm),
        }))];
      case 'firstChoiceFunction':
        return functions.map((itm: any) => ({
          label: itm.name,
          value: itm,
          disabled: [
            values.firstChoiceFunction,
            values.secondChoiceFunction,
            values.thirdChoiceFunction,
          ].includes(itm),
        })) as unknown as { label: string; value: any }[];
      case 'secondChoiceFunction':
      case 'thirdChoiceFunction':
        return [{label: 'None', disabled: false, value: {name: 'None', id: 'None'}}, ...functions.map((itm: any) => ({
          label: itm.name,
          value: itm,
          disabled: [
            values.firstChoiceFunction?.id,
            values.secondChoiceFunction?.id,
            values.thirdChoiceFunction?.id,
          ].includes(itm),
        })) as unknown as { label: string; value: any }[]];
      case Section.PLANNING:
        return bcwsRoles
          .filter((itm) => itm.section === Section.PLANNING)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.AVIATION:
        return bcwsRoles
          .filter((itm) => itm.section === Section.AVIATION)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.COMMAND:
        return bcwsRoles
          .filter((itm) => itm.section === Section.COMMAND)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.OPERATIONS:
        return bcwsRoles
          .filter((itm) => itm.section === Section.OPERATIONS)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.FINANCE_ADMIN:
        return bcwsRoles
          .filter((itm) => itm.section === Section.FINANCE_ADMIN)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));
      case Section.LOGISTICS:
        return bcwsRoles
          .filter((itm) => itm.section === Section.LOGISTICS)
          .map((itm) => ({
            label: BcwsRoleName[itm.name],
            value: itm,
          }));

      case 'functions':
        return functions.map((itm: any) => ({
          label: itm.name,
          value: itm,
        }));

      default:
        return [];
    }
  };

  const initialValues: IntakeFormValues = {
    ...intakeFormInitialValues,
    ...formData?.personnel,
    firstName: tokenParsed?.given_name,
    lastName: tokenParsed?.family_name
      ? tokenParsed?.family_name
      : tokenParsed?.given_name,
    email: tokenParsed?.email,
    program: formData?.personnel?.program,
  };

  if (!tokenParsed) {
    return;
  }

  if (formData?.currentProgram === Program.ALL) {
    return <Navigate to={Routes.MemberProfile} />;
  } else {
    return (
      <>
        {!formData?.personnel ? (
          <Loading />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={stepValidation[step]}
            onSubmit={handleSubmit}
          >
            {({ validateForm, values }) => (
              <IntakeForm
                validateForm={validateForm}
                values={values}
                step={step}
                handleSetErrorSteps={handleSetErrorSteps}
                handleSetCompletedSteps={handleSetCompletedSteps}
                errorSteps={errorSteps}
                completedSteps={completedSteps}
                handleSetStep={handleSetStep}
                saveUpdateForm={saveUpdateForm}
                tabs={formTabs.map((tab) => ({
                  ...tab,
                  sections: tab.sections?.map((section) => ({
                    ...section,
                    fields: section.fields?.map((field) => ({
                      ...field,
                      nestedFields: field.nestedFields?.map((nestedField) => ({
                        ...nestedField,
                        options:
                          nestedField.options?.length === 0
                            ? getFieldOptions(nestedField.name, values)
                            : nestedField.options,
                      })),
                      options:
                        field.options?.length === 0
                          ? getFieldOptions(field.name, values)
                          : field.options,
                    })),
                  })),
                }))}
                disabledSteps={disabledSteps}
              />
            )}
          </Formik>
        )}
      </>
    );
  }
};

export default FormWrapper;
