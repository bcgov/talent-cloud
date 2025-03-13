import { FormSection } from '../components/FormSection';
import type { FormSection as FormSectionType } from '../constants/types';
import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { FormField } from '../fields/FormField';
import { useIntakeForm } from '@/hooks/useIntakeForm';
import { Fragment } from 'react';

export const PersonalDetails = ({ sections }: { sections: FormSectionType[] }) => {
  const { getOptions } = useIntakeForm();

  return (
    <>
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
                      {fieldItm.type === 'infoBox' ? (
                        <div className={'col-span-2'}>
                          <Banner content={fieldItm.label} type={BannerType.INFO} />
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
    </>
  );
};
