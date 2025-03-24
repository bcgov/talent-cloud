// types & values
import type { FormComponent, FormFields, FormSection } from '../constants/types';

import { BannerType } from '@/common/enums/banner-enum';

// ui
import { Accordion } from '../components/Accordion';
import { Banner } from '@/components/ui/Banner';

export const intakeFormComponents = ['infoBox', 'componentBox', 'accordion'];

export const renderIntakeFormComponent = (fieldItm: FormComponent) => {
  switch (fieldItm.type) {
    case 'infoBox':
      return (
        <div className="col-span-2">
          <Banner
            title={fieldItm.label}
            content={fieldItm.content}
            type={BannerType.INFO}
          />
        </div>
      );
    case 'accordion':
      return (
        <div className="col-span-2">
          {fieldItm.component && (
            <Accordion title={fieldItm.label}>{fieldItm.component}</Accordion>
          )}
        </div>
      );
    case 'componentBox':
      return <div className="col-span-2">{fieldItm.component()}</div>;
    default:
      return <></>;
  }
};

export const handleFilterProgram = (
  itm: FormFields | FormSection,
  program: string | null,
) => {
  if (program === 'all') {
    return true;
  } else if (itm.program === program || itm.program === 'all' || !itm.program) {
    return true;
  } else {
    return false;
  }
};

export const dynamicFields: { [key: string]: any } = {
  tools: {
    tool: '',
    toolProficiency: '',
  },
  certifications: {
    certification: '',
    expiry: '',
  },
  languages: {
    language: '',
    languageProficiency: '',
  },
};
