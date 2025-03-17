import { Fragment, useEffect } from 'react';
import { FormSection } from '../components/FormSection';
import type {
  FormSection as FormSectionType,
  IntakeFormValues,
} from '../constants/types';
import { useFormikContext } from 'formik';

import { useIntakeForm } from '@/hooks/useIntakeForm';
import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { FormField } from '../fields/FormField';
import { MultiSelectGroup } from '../components/MultiSelectFieldGroup';
import {
  handleFilterProgram,
  intakeFormComponents,
  renderIntakeFormComponent,
} from '../utils/helpers';

export const Experiences = ({ sections }: { sections: FormSectionType[] }) => {
  const {
    setFieldValue,
    values: { firstChoiceFunction, functions },
  } = useFormikContext<IntakeFormValues>();

  useEffect(() => {
    if (functions.length === 0 && firstChoiceFunction) {
      setFieldValue('functions', [firstChoiceFunction]);
    } else {
      setFieldValue('functions', [...functions, firstChoiceFunction]);
    }
  }, [firstChoiceFunction]);

  const { getOptions } = useIntakeForm();
  const { values } = useFormikContext<IntakeFormValues>();

  // set description based on program
  let description;
  if (values.program === 'all') {
    description =
      'The EMCR and BCWS CORE Team program streams operate very differently with distinct sections and/or roles. For this step, please carefully review their requirements in the blue banners as you proceed. Your responses will help us match your expertise and skillset to suitable roles.';
  } else if (values.program === 'bcws') {
    description =
      'The BCWS CORE Team program stream operates with distinct sections and roles. For this step, please carefully review their requirements in the blue banners as you proceed. Your responses will help us match your expertise and skillset to suitable roles.';
  } else if (values.program === 'emcr') {
    description =
      'The EMCR CORE Team program stream operates with distinct sections. For this step, please carefully review their requirements in the blue banners as you proceed. Your responses will help us match your expertise and skillset to suitable roles.';
  } else {
    description = '';
  }
  return (
    <div>
      <div className="text-sm py-6">{description}</div>

      <div className="pb-24">
        {sections
          .filter(
            (section) =>
              values.program &&
              section.program &&
              handleFilterProgram(section, values.program.toString()),
          )
          .map(
            (section, index) =>
              section.fields && (
                <FormSection
                  section={section}
                  key={section.name}
                  defaultOpen={index === 0}
                  header={section.header}
                >
                  <>
                    {section.fields.map((fieldItm) => (
                      <Fragment key={fieldItm.name}>
                        {intakeFormComponents.includes(fieldItm.type) ? (
                          <div className="col-span-2">
                            {renderIntakeFormComponent(fieldItm)}
                          </div>
                        ) : fieldItm.type === 'multiselect-group' ? (
                          <MultiSelectGroup field={fieldItm} />
                        ) : (
                          <div
                            className={
                              fieldItm.colspan
                                ? `col-span-${fieldItm.colspan}`
                                : 'col-span-1'
                            }
                          >
                            <FormField
                              key={fieldItm.name}
                              {...fieldItm}
                              options={
                                fieldItm.options?.length === 0
                                  ? getOptions(fieldItm.name)
                                  : fieldItm.options
                              }
                            />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </>
                </FormSection>
              ),
          )}
      </div>
    </div>
  );
};
