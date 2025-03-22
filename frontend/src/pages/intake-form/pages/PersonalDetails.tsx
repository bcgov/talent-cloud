import { FormSection } from '../components/FormSection';
import type { FormSection as FormSectionType } from '../constants/types';
import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { FormField } from '../fields/FormField';

import { Fragment } from 'react';
import { intakeFormComponents, renderIntakeFormComponent } from '../utils/helpers';

export const PersonalDetails = ({ sections }: { sections: FormSectionType[] }) => {
  return (
    <div className="pb-24">
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
                {itm.fields?.map((fieldItm) => (
                  <Fragment key={fieldItm.name}>
                    {intakeFormComponents.includes(fieldItm.type) ? (
                      <div className={'col-span-2'}>
                        {renderIntakeFormComponent(fieldItm)}
                      </div>
                    ) : (
                      <div
                        key={fieldItm.name}
                        className={
                          fieldItm.colSpan
                            ? `col-span-${fieldItm.colSpan}`
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
