import { FormField } from './FormField';
import type { FormFields, FormSection as FormSectionType } from './types';
import { useFormikContext } from 'formik';
import type { ReactNode } from 'react';
import type { IntakeFormPersonnelData } from './fields';
import { FormSection } from './FormSection';
import { Program } from '@/common';
import { Banner } from '@/components/ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';

export const FormPage = ({
  label,
  description,
  title,
  sections,
  fields,
}: {
  label: string;
  description: string | ReactNode;
  title?: string | ReactNode;
  sections?: FormSectionType[];
  fields?: FormFields[];
}) => {
  const { values } = useFormikContext<IntakeFormPersonnelData>();
  console.log(values);
  return (
    <div className="min-h-[calc(100vh-300px)] flex flex-col xl:pr-24 w-[900px]">
      <h3>{title ?? label}</h3>
      <div className="text-sm py-6">{description}</div>
      <div className="flex flex-col space-y-8  w-full">
        {sections
          ?.filter((itm) => {
            if (values.program === Program.ALL || !itm.program) {
              return itm;
            } else if (itm.program && itm.program === values.program) {
              return itm;
            }
          })
          ?.map((section) => <FormSection key={section.name} section={section} />)}
      </div>

      {fields &&
        fields
          ?.filter((itm) => {
            if (values.program === Program.ALL || !itm.program) {
              return itm;
            } else if (itm.program && itm.program === values.program) {
              return itm;
            }
          })
          .map((fieldItm: FormFields) => (
            <>
              {fieldItm.type === 'infoBox' ? (
                <div className="col-span-2">
                  <Banner content={fieldItm.label} type={BannerType.INFO} />
                </div>
              ) : (
                <FormField key={fieldItm.name} field={fieldItm} />
              )}
            </>
          ))}
    </div>
  );
};
