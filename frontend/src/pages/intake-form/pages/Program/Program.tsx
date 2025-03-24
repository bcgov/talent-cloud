// react
import { Fragment, useEffect, useState } from 'react';

// fields
import { FormField } from '../../fields/FormField';
import { fields } from './fields';

// enums, types, components
import type { FormFields, IntakeFormValues } from '../../constants/types';
import { BannerType } from '@/common/enums/banner-enum';
import { components } from './components';

// context
import { useFormikContext } from 'formik';

// util
import { renderIntakeFormComponent } from '../../utils/helpers';

// ui
import { Banner } from '@/components/ui/Banner';
import { Program } from '@/common';
import {
  expectationsBcws,
  expectationsBoth,
  expectationsEmcr,
} from '../../constants/enums';
import { CheckboxGroupField } from '../../fields/CheckBoxGroupField';

export const ProgramPage = () => {
  const { values, setValues } = useFormikContext<IntakeFormValues>();

  const [dynamicFields, setFields] = useState<FormFields[]>([
    { ...fields[0], disabled: values.disabledProgram ? true : false },
  ]);

  useEffect(() => {
    if (values.program) {
      if (values.program === Program.BCWS) {
        if (values.acknowledgement === undefined) {
          setValues({ ...values, acknowledgement: [] });
        }
        setFields([fields[0], { ...fields[1], options: expectationsBcws }]);
      } else if (values.program === Program.EMCR) {
        setFields([fields[0], { ...fields[1], options: expectationsEmcr }]);
        if (values.acknowledgement === undefined) {
          setValues({ ...values, acknowledgement: [] });
        }
      } else {
        setFields([fields[0], { ...fields[1], options: expectationsBoth }]);
        if (values.acknowledgement === undefined) {
          setValues({ ...values, acknowledgement: [] });
        }
      }
    }
  }, [values.program]);
  return (
    <>
      <div className="flex flex-col gap-10">
        {components.map((component) => (
          <Fragment key={component.name}>
            <div className="col-span-2">{renderIntakeFormComponent(component)}</div>
          </Fragment>
        ))}
      </div>
      <div>
        <div className="pb-16 flex flex-col gap-4">
          <div className="col-span-2 py-2">
            <div className="flex flex-col gap-2 pb-2">
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
          <div className="col-span-2">
            {/* Add custom components and styling as needed here - this page is not like the others :)  */}
            {dynamicFields[1]?.options && (
              <div className="bg-dark-200 border-[#1A5A96] border-l-[10px] px-4 py-4">
                <CheckboxGroupField
                  field={dynamicFields[1]}
                  options={dynamicFields[1].options}
                />
              </div>
            )}
          </div>
          {dynamicFields[1] && (
            <div className="col-span-2 py-2">
              <Banner
                content="Failure to complete certain requirements listed above may cause delays in your application process, further impacting your ability to participate in either stream."
                type={BannerType.WARNING}
              />
            </div>
          )}
          <div className="col-span-2">
            <Banner
              title={'Collection Notice'}
              content={
                <span className='text-sm'>
                  Your personal information is collected under s. 26(c) of the
                  Freedom of Information and Protection of Privacy Act (FOIPPA) for
                  the purpose of managing the CORE Team program. Please direct any
                  questions or concerns about the collection of your personal
                  information to the CORE Team Coordinator,{' '}
                  <a
                    href="mailto:EMCR.CORETeam@gov.bc.ca"

                    className="text-[#0066CC] underline text-sm"

                  >
                    EMCR.CORETeam@gov.bc.ca
                  </a>
                  .
                </span>
              }
              type={BannerType.INFO}
              hideIcon={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};
