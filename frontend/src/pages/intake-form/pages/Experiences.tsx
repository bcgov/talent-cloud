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

  return (
    <div className="pb-24">
      {sections.map(
        (itm, index) =>
          itm.fields && (
            <FormSection section={itm} key={itm.name} defaultOpen={index === 0}>
              <>
                {itm.fields
                  .map((itm: any) => {
                    if (itm.options && itm.options.length === 0) {
                      itm.options = getOptions(itm.name);
                    }
                    return itm;
                  })
                  .map((fieldItm) => (
                    <Fragment key={fieldItm.name}>
                      {fieldItm.type === 'infoBox' ? (
                        <div className="col-span-2">
                          <Banner content={fieldItm.label} type={BannerType.INFO} />
                        </div>
                      ) : (
                        <div
                          className={
                            fieldItm.colspan
                              ? `col-span-${fieldItm.colspan}`
                              : 'col-span-1'
                          }
                        >
                          <FormField key={fieldItm.name} {...fieldItm} />
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
