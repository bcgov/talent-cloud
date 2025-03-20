import { FormSection } from '../components/FormSection';
import type {
  FormSection as FormSectionType,
  IntakeFormValues,
} from '../constants/types';
import { useIntakeForm } from '@/hooks/useIntakeForm';

import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { Fragment } from 'react';
import { useFormikContext } from 'formik';
import { FormField } from '../fields/FormField';
import { FieldGroup } from '../components/FieldGroup';

export const Skills = ({ sections }: { sections: FormSectionType[] }) => {
  const { getOptions } = useIntakeForm();
  const { values } = useFormikContext<IntakeFormValues>();
  return (
    <div className="pb-24">
      {sections.map(
        (itm, index) =>
          itm.name && (
            <FormSection section={itm} key={itm.name} defaultOpen={index === 0}>
              <>
                {itm.fields
                  ?.map((itm: any) => {
                    if (itm.options && itm.options.length === 0) {
                      itm.options = getOptions(itm.name);
                    }
                    return itm;
                  })
                  ?.map((fieldItm) => (
                    <Fragment key={fieldItm.name}>
                      {fieldItm.type === 'infoBox' ? (
                        <div className="col-span-2">
                          <Banner content={fieldItm.label} type={BannerType.INFO} />
                        </div>
                      ) : fieldItm.type === 'multiselect' ? (
                        <div className="col-span-2">
                          <FormField
                            {...fieldItm}
                            key={fieldItm.name}
                            value={values[fieldItm.name as keyof IntakeFormValues]}
                          />
                        </div>
                      ) : (
                        <FieldGroup
                          key={fieldItm.name}
                          field={{
                            ...fieldItm,
                            fields: fieldItm.fields?.map((itm: any) => {
                              if (itm.options && itm.options.length === 0) {
                                itm.options = getOptions(itm.name);
                              }
                              return itm;
                            }),
                          }}
                        />
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
