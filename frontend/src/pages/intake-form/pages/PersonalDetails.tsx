// formik
import { useFormikContext } from 'formik';

// react
import { Fragment } from 'react';

// form components
import { Banner } from '@/components/ui/Banner';
import { FormComponent } from '../components/FormComponent';
import { FormField } from '../fields/FormField';
import { FormSection } from '../components/FormSection';

// types & enums
import type {
  FormSection as FormSectionType,
  IntakeFormValues,
} from '../constants/types';
import { BannerType } from '@/common/enums/banner-enum';

// util
import { intakeFormComponents } from '../utils/helpers';

// hooks
import { useIntakeForm } from '@/hooks/useIntakeForm';

export const PersonalDetails = ({ sections }: { sections: FormSectionType[] }) => {
  const { getOptions } = useIntakeForm();
  const { values } = useFormikContext<IntakeFormValues>();
  return (
    <>
      <Banner
        title={'Information Detected from your Government Profile'}
        content={
          'Some fields have been auto-populated based on existing information from your government profile. Please review them carefully for accuracy.'
        }
        type={BannerType.INFO}
        onClose={(e) => {
          e.currentTarget.parentNode.remove();
        }}
      />
      {sections.map(
        (itm) =>
          itm.name && (
            <FormSection section={itm} key={itm.name}>
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
                      {intakeFormComponents.includes(fieldItm.type) ? (
                        <FormComponent
                          fieldItm={fieldItm}
                          program={values.program}
                        />
                      ) : (
                        <FormField
                          key={fieldItm.name}
                          {...fieldItm}
                          selectedProgram={values.program}
                        />
                      )}
                    </Fragment>
                  ))}
              </>
            </FormSection>
          ),
      )}
    </>
  );
};
