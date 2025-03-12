// react
import { Fragment } from 'react';

// formik
import { useFormikContext } from 'formik';

// types
import type { FormFields } from './types';

// form
import type { FormTab } from './tabs';
import type { IntakeFormValues } from './fields';
import { FormField } from './FormField';
import { FormSection } from './FormSection';

// util
import {
  handleFilterProgram,
  intakeFormComponents,
  renderIntakeFormComponent,
} from './helpers';

export const FormPage = ({
  getOptions,
  tab,
}: {
  getOptions: (
    props: any,
    program?: string,
  ) => { label: string; value: string; disabled?: boolean; name?: string }[];
  tab: FormTab;
}) => {
  const { title, label, description, sections, fields } = tab;
  const { values } = useFormikContext<IntakeFormValues>();
  const program = values.program;

  return (
    <div className="min-h-[calc(100vh-300px)] flex flex-col xl:pr-24 w-[900px]">
      <h3>{title ?? label}</h3>
      <div className="text-sm py-6">{description}</div>
      <div className="flex flex-col space-y-8  w-full">
        {sections
          ?.filter((itm) =>
            itm.program && program ? handleFilterProgram(itm, program) : true,
          )
          ?.map((section) => (
            <FormSection
              key={section.name}
              section={section}
              program={program}
              getOptions={getOptions}
            />
          ))}
      </div>
      <div className="flex flex-col space-y-[36px] w-full">
        {fields &&
          fields
            ?.filter((itm) =>
              itm.program ? handleFilterProgram(itm, program ?? null) : true,
            )
            .map((fieldItm: FormFields) => (
              <Fragment key={fieldItm.name}>
                {intakeFormComponents.includes(fieldItm.type) ? (
                  renderIntakeFormComponent(fieldItm)
                ) : (
                  <FormField
                    key={fieldItm.name}
                    formField={fieldItm}
                    getOptions={getOptions}
                  />
                )}
              </Fragment>
            ))}
      </div>
    </div>
  );
};
