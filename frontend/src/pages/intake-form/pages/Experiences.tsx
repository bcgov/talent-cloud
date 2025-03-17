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
import { handleFilterProgram } from '../utils/helpers';

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
  return (
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
              >
                <>
                  {section.fields.map((fieldItm) => (
                    <Fragment key={fieldItm.name}>
                      {fieldItm.type === 'infoBox' ? (
                        <div className="col-span-2">
                          <Banner content={fieldItm.label} type={BannerType.INFO} />
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
  );
};
