import { useFormikContext } from 'formik';
import type { IntakeFormValues } from '../constants/types';
import { handleFilterProgram } from '../utils/helpers';
import { FormSection } from '../components/FormSection';
import { formTabs } from '../utils/tab-fields';
import { useProgramFieldData } from '@/hooks';
import { LanguageProficiencyName } from '@/common/enums/language.enum';
import { ToolsProficiencyName } from '@/common/enums/tools.enum';
import { Program } from '@/common';
import { SectionName } from '@/common/enums/sections.enum';

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
  const tabSections = formTabs
    .flatMap((itm) => itm.sections)
    .filter((itm) => itm !== undefined);

  const sections = tabSections
    .filter((section) =>
      values.program && section.program
        ? handleFilterProgram(section, values.program.toString())
        : true,
    )
    .map((section) => ({
      ...section,
      fields: section.fields
        ?.filter((field) => !ignoreComponents.includes(field.name))
        .filter((field) =>
          values.program && field.program
            ? handleFilterProgram(field, values.program?.toString())
            : true,
        ),
    }));

  // add missing sections
  const acks = values.acknowledgement?.map((ack, index) => {
    return (
      <div key={index}>
        <p>{ack}</p>
      </div>
    );
  });
  const programSectionAndAcknowledgementSection = {
    name: 'CORE Team Program (Stream) Selection',
    fields: [
      {
        name: '',
        label: '',
        type: 'componentBox',
        component: () => (
          <div className="col-span-2">
            <p className="subtext">Acknowledgement for selected program stream(s)</p>
          </div>
        ),
      },
      {
        name: '',
        label: '',
        type: 'componentBox',
        component: () => (
          <div className="col-span-2 flex flex-col gap-2">{acks}</div>
        ),
      },
    ],
  };
  sections.unshift(programSectionAndAcknowledgementSection);

  const sectionsWithValues = sections.map((section) => ({
    ...section,
    fields: section?.fields?.map((field) => {
      if (field.name === 'homeLocation') {
        return {
          ...field,
          value: locations.find((itm) => itm.id === values.homeLocation)
            ?.locationName,
        };
      }
      if (field.name === 'liaisonUnknown') {
        return {
          ...field,
          label: "I don't know who my liaison is",
          value: values.liaisonUnknown,
        };
      }
      if (field.name === 'functions') {
        return {
          ...field,
          label: 'Functions',
          value: values.functions
            ?.map((itm) => functions.find((fun) => fun.id.toString() === itm)?.name)
            .join('; '),
        };
      }
      if (
        ['firstChoiceSection', 'secondChoiceSection', 'thirdChoiceSection'].includes(
          field.name,
        )
      ) {
        return {
          ...field,
          value:
            SectionName[
              values[field.name as keyof typeof values] as keyof typeof SectionName
            ],
        };
      }
      if (
        [
          'firstChoiceFunction',
          'secondChoiceFunction',
          'thirdChoiceFunction',
        ].includes(field.name)
      ) {
        return {
          ...field,
          value: functions.find(
            (itm) => itm.id.toString() === values[field.name as keyof typeof values],
          )?.name,
        };
      }
      return {
        ...field,
        value: values[field.name as keyof typeof values],
      };
    }),
  }));

  // get values for the tools, languages and certifications
  const finalSections = sectionsWithValues.map((section) => {
    const filteredFields = section.fields;
    if (
      section.fields?.map((itm) =>
        ['tools', 'certificates', 'languages'].includes(itm.name),
      )
    ) {
      const adjustedFields = [];
      if (filteredFields) {
        for (const field of filteredFields) {
          // remove nesting for some sections
          if (Array.isArray(field.value)) {
            for (const value of field.value) {
              if (section.name === 'Languages') {
                const languageNameField = {
                  name: '',
                  label: 'Language',
                  colSpan: 1,
                  value: value['language' as keyof typeof value],
                  type: 'text',
                  component: () => <></>,
                };
                const languageProficiencyField = {
                  name: '',
                  label: 'Proficiency Level',
                  colSpan: 1,
                  value:
                    LanguageProficiencyName[
                      value['languageProficiency' as keyof typeof value]
                    ],
                  type: 'text',
                  component: () => <></>,
                };
                adjustedFields.push(languageNameField, languageProficiencyField);
              }

              if (section.name === 'Tools & Software') {
                const toolNameField = {
                  name: '',
                  label: 'Tool/Software',
                  colSpan: 1,
                  value: tools.find(
                    (itm) =>
                      itm.id.toString() === value['toolId' as keyof typeof value],
                  )?.name, // look up tool by id
                  type: 'text',
                  component: () => <></>,
                };
                const toolProficiencyField = {
                  name: '',
                  label: 'Proficiency Level',
                  colSpan: 1,
                  value:
                    ToolsProficiencyName[
                      value['toolProficiency' as keyof typeof value]
                    ],
                  type: 'text',
                  component: () => <></>,
                };
                adjustedFields.push(toolNameField, toolProficiencyField);
              }
              if (section.name === 'Certificates') {
                const certificateNameField = {
                  name: '',
                  label: 'Certification Name',
                  colSpan: 1,
                  value: certificates.find(
                    (itm) =>
                      itm?.id?.toString() ===
                      value['certificationId' as keyof typeof value],
                  )?.name, // look up certification by id
                  type: 'text',
                  component: () => <></>,
                };
                adjustedFields.push(certificateNameField);
              }
            }
          } else {
            adjustedFields.push(field);
          }
        }
      }
      return { ...section, fields: adjustedFields };
    } else {
      return section;
    }
  });
  return (
    <div>
      {finalSections.map((section) => (
        <FormSection section={section} key={section.name}>
          <>
            {section.fields?.map((field) => {
              return field.type === 'componentBox' && field.component ? (
                field.component('')
              ) : (
                <div key={field.name} className={`col-span-${field.colSpan || 1}`}>
                  <div className="subtext">{field.label}</div>
                  <div className="text-[#262729]">{field.value?.toString()}</div>
                </div>
              );
            })}
          </>
        </FormSection>
      ))}
    </div>
  );
};
