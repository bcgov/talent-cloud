import { useFormikContext } from 'formik';
import type { IntakeFormValues } from '../constants/types';
import { handleFilterProgram } from '../utils/helpers';
import { FormSection } from '../components/FormSection';
import { formTabs } from '../utils/tab-fields';

export const Review = () => {
  const { values } = useFormikContext<IntakeFormValues>();

  const sections = formTabs
    .flatMap((itm) => itm.sections)
    .filter((section) => section !== undefined);

  // add missing sections
  const acks = values.acknowledgement?.map((ack) => {
    return (
      <div>
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
  console.log(sections);

  const sectionsWithValues = [...sections].map((section) => ({
    ...section,
    fields: section?.fields?.map((field) => ({
      ...field,
      value: values[field.name as keyof typeof values],
    })),
  }));

  // filter non-form related components
  const ignoreComponents = [
    'emergencyExperienceHeader',
    'emcCoreTeamSectionsHeader',
    'emcrDivider',
    'bcwsCoreTeamSectionsHeader',
    'bcwsDivider',
  ];
  const replaceValues = {
    true: 'Yes',
    false: 'No',
  };
  // filter program-specific sections & fields
  const programSpecificSections = sectionsWithValues
    .filter((section) => handleFilterProgram(section, values.program as string))
    .map((section) => {
      const filteredFields = section.fields?.filter(
        (field) =>
          !ignoreComponents.includes(field.name) &&
          handleFilterProgram(field, values.program as string),
      );
      // adjust fields

      return { ...section, fields: filteredFields };
    });

  console.log('PROGRAM SPECIFIC SECTIONS');
  console.log(programSpecificSections);

  return (
    <div>
      {programSpecificSections.map((section) => (
        <FormSection section={section}>
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
