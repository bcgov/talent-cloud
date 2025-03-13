import { Fragment, useEffect, useState } from 'react';
import { FormField } from '../../fields/FormField';
import type { FormFields, IntakeFormValues } from '../../constants/types';
import { useFormikContext } from 'formik';

import { useIntakeForm } from '@/hooks/useIntakeForm';
import { renderIntakeFormComponent } from '../../utils/helpers';
import { fields } from './fields';
import { components } from './components';

export const ProgramPage = () => {
  const {
    values: { program },
  } = useFormikContext<IntakeFormValues>();

  const [dynamicFields, setFields] = useState<FormFields[]>([fields[0]]);
  const { getOptions } = useIntakeForm();

  useEffect(() => {
    if (program) {
      const options = getOptions(fields[1].name, program) as {
        label: string;
        value: string;
      }[];
      setFields([fields[0], { ...fields[1], options }]);
    }
  }, [program]);

  return (
    <>
      <div>
        {components.map((component) => (
          <Fragment key={component.name}>
            <div className="col-span-2">{renderIntakeFormComponent(component)}</div>
          </Fragment>
        ))}
      </div>
      <div>
        <div className="pb-16">
          <div className="col-span-2 py-4">
            <div className="flex flex-col gap-2  pb-2">
              <p className="text-xl font-bold">
                CORE Team Program (Stream) Selection
              </p>
              <p className="subtext">
                Please select your program choice and acknowledge the statements that
                will appear below.
                <span className="text-red-400">*</span> (Required)
              </p>
            </div>
            <FormField key={dynamicFields[0].name} {...dynamicFields[0]} />
          </div>
          <div className="col-span-2 py-4">
            {/* Add custom components and styling as needed here - this page is not like the others :)  */}
            {dynamicFields[1] && (
              <FormField key={dynamicFields[1].name} {...dynamicFields[1]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
