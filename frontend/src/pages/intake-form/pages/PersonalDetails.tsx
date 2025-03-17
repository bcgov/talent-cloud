import { FormSection } from '../components/FormSection';
import type {
  FormSection as FormSectionType,
  IntakeFormValues,
} from '../constants/types';
import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { FormField } from '../fields/FormField';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { Fragment } from 'react';
import { handleFilterProgram } from '../utils/helpers';
import { useFormikContext } from 'formik';

export const PersonalDetails = ({ sections }: { sections: FormSectionType[] }) => {
  const { getOptions } = useIntakeForm();
  const { values } = useFormikContext<IntakeFormValues>();
  return (
    <div className="pb-24">
      {sections
        .filter((section) =>
          section.program && values.program
            ? handleFilterProgram(section, values.program)
            : true,
        )
        .map(
          (itm, index) =>
            itm.name && (
              <FormSection section={itm} key={itm.name} defaultOpen={index === 0}>
                <>
                  {itm.fields
                    ?.filter((field) =>
                      field.program && values.program
                        ? handleFilterProgram(field, values.program)
                        : true,
                    ) // filter out program field
                    ?.map((itm: any) => {
                      if (itm.options && itm.options.length === 0) {
                        itm.options = getOptions(itm.name);
                      }
                      return itm;
                    })
                    ?.map((fieldItm) => (
                      <Fragment key={fieldItm.name}>
                        {fieldItm.type === 'infoBox' ? (
                          <div className={'col-span-2'}>
                            <Banner
                              content={fieldItm.label}
                              type={BannerType.INFO}
                            />
                          </div>
                        ) : (
                          <div
                            key={fieldItm.name}
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
