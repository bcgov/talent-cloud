import { useFormikContext } from 'formik';
import type {
  FormFields,
  FormSection as FormSectionType,
  IntakeFormValues,
} from '../constants/types';
import { handleFilterProgram } from '../utils/helpers';
import { FormSection } from '../components/FormSection';
import { formTabs } from '../utils/tab-fields';
import { useProgramFieldData } from '@/hooks';
import { LanguageProficiencyName } from '@/common/enums/language.enum';
import { ToolsProficiencyName } from '@/common/enums/tools.enum';
import { Program } from '@/common';

export const Review = () => {
  const { values } = useFormikContext<IntakeFormValues>();
  const { certificates, tools, locations, functions } = useProgramFieldData(
    Program.ALL,
  );

  // filter non-form related components
  const ignoreComponents = [
    'emergencyExperienceHeader',
    'emcCoreTeamSectionsHeader',
    'emcrDivider',
    'bcwsCoreTeamSectionsHeader',
    'bcwsDivider',
  ];

  const ignoreFields = [
    'About supervisor',
    'Travel Preferences',
    'bcwsCoreTeamSectionsHeader',
  ];
  const tabSections = formTabs
    .flatMap((itm) => itm.sections)
    .filter((itm) => itm !== undefined);

  const sections = tabSections
    .filter((section) =>
      values.program && section.program
        ? handleFilterProgram(section, values.program.toString())
        : true,
    )
    .filter((itm) => itm !== undefined)
    .map((section) => ({
      ...section,
      fields: section.fields
        ?.filter((field) => !ignoreComponents.includes(field.name))
        .filter((itm) => itm !== undefined)
        .filter((itm) => !ignoreFields.includes(itm.name))
        .filter((field) =>
          values.program && field.program
            ? handleFilterProgram(field, values.program?.toString())
            : true,
        ),
    }));

  // add missing sections

  const getValue = (value: any, name: string) => {
    switch (name) {
      case 'homeLocation':
        return locations.find((itm) => itm.id?.toString())?.locationName;
      case 'functions':
        return (value as string[])
          ?.map(
            (itm: string) =>
              functions.find((func) => func.id.toString() === itm)?.name,
          )
          .join('; ');
      case 'certificationId':
        return certificates.find((itm) => itm?.id?.toString() === value)?.name;
      case 'expiry':
        return value;
      case 'toolProficiency':
        return ToolsProficiencyName[value as keyof typeof ToolsProficiencyName];

      case 'toolId':
        return tools.find((tool) => tool.id.toString() === value)?.fullName;

      case 'languageProficiency':
        return LanguageProficiencyName[
          value as keyof typeof LanguageProficiencyName
        ];
      case 'language':
        return value;
      default:
        return value && value !== '' ? value : '--';
    }
  };
  const getLabel = (label: any, name: string) => {
    switch (name) {
      case 'functions':
        return 'Functions';
      default:
        return label;
    }
  };
  return (
    <>
      <FormSection section={{ name: 'CORE Team Program (Stream) Selection' }}>
        <>
          <div className={`col-span-2`}>
            <div className="subtext">Program</div>
            <div className="text-[#262729]">{values.program}</div>
          </div>
          <div className={`col-span-2`}>
            <div className="subtext">Acknowledgement</div>
            <div className="flex flex-col">
              {values.acknowledgement.map((itm: string) => (
                <div className="text-[#262729]" key={itm}>
                  {itm}
                </div>
              ))}
            </div>
          </div>
        </>
      </FormSection>
      {sections?.map((section) => (
        <FormSection section={section as FormSectionType} key={section.name}>
          <>
            {section.fields?.map((field: any) => (
              <>
                {!field.fields ? (
                  <div key={field.name} className={`col-span-${field.colSpan || 1}`}>
                    {field.label && (
                      <div className="subtext">
                        {getLabel(field.label, field.name)}
                      </div>
                    )}
                    <div className="text-[#262729]">
                      {getValue(
                        values?.[field.name as keyof typeof values],
                        field.name,
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="col-span-2">
                    {(values?.[field.name as keyof typeof values] as {}[])?.map(
                      (itm, index) => (
                        <div className={`grid grid-cols-2 pb-8`} key={index}>
                          {itm &&
                            field.fields?.map((innerField: FormFields) => (
                              <div
                                className="col-span-1 flex flex-col"
                                key={innerField.name}
                              >
                                <div className="subtext">{innerField.label}</div>
                                <div className="text-[#262729]">
                                  {getValue(
                                    itm[innerField.name as keyof typeof itm] ?? '',
                                    innerField.name,
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </>
            ))}
          </>
        </FormSection>
      ))}
    </>
  );
};
