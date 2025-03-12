import { FormField } from './FormField';
import type { FormFields } from './types';
import { Fragment } from 'react';
import { FormSection } from './FormSection';
import { Banner } from '@/components/ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';
import { handleFilterProgram } from './helpers';
import type { FormTab } from './tabs';
import { useFormikContext } from 'formik';
import type { IntakeFormValues } from './fields';

export const FormPage = ({
  getOptions,
  tab,
}: {
  getOptions: (
    props: any,
    program?: string,
  ) => { label: string; value: string; disabled?: boolean; name?: string }[];
  tab: FormTab;
}) => {
  const { title, label, description, sections, fields } = tab;
  const { values } = useFormikContext<IntakeFormValues>();
  const program = values.program;

  return (
    <div className="min-h-[calc(100vh-300px)] flex flex-col xl:pr-24 w-[900px]">
      <h3>{title ?? label}</h3>
      <div className="text-sm py-6">{description}</div>
      <div className="flex flex-col space-y-8  w-full">
        {sections
          ?.filter((itm) =>
            itm.program && program ? handleFilterProgram(itm, program) : true,
          )
          ?.map((section) => (
            <FormSection
              key={section.name}
              section={section}
              program={program}
              getOptions={getOptions}
            />
          ))}
      </div>

      {fields &&
        fields
          ?.filter((itm) =>
            itm.program ? handleFilterProgram(itm, program ?? null) : true,
          )
          .map((fieldItm: FormFields) => (
            <Fragment key={fieldItm.name}>
              {fieldItm.type === 'infoBox' ? (
                <div className="col-span-2">
                  <Banner content={fieldItm.label} type={BannerType.INFO} />
                </div>
              ) : (
                <FormField
                  key={fieldItm.name}
                  formField={fieldItm}
                  getOptions={getOptions}
                />
              )}
            </Fragment>
          ))}
    </div>
  );
};
