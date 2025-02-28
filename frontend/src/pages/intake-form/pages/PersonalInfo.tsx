import { Field, useFormikContext } from 'formik';
import type { IntakeFormInterface } from '../fields';

import type { FormSection } from '../types';

export const PersonalInfo = ({ sections }: { sections: FormSection[] }) => {
  const { values, handleChange } = useFormikContext<IntakeFormInterface>();
  console.log(values, handleChange);
  console.log(sections);
  console.log(Object.keys(sections));

  return (
    <>
      {sections.map((section) => {
        return (
          <div key={section.name}>
            <h2>{section.name}</h2>
            {section?.fields?.map((field) => {
              return (
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <Field
                    name={field.name}
                    type={field.type}
                    as={field.name}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      {/* Personal Details Section */}

      {/* Employment Details Section */}
      {/* Supervisor Liason Section */}
      {/* Emergency Contact Details */}
    </>
  );
};
