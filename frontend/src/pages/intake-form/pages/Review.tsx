import { Field, useFormikContext } from 'formik';
import type {
  FormFields,
  FormSection as FormSectionType,
  IntakeFormValues,
} from '../constants/types';
import { handleFilterProgram } from '../utils/helpers';
import { FormSection } from '../components/FormSection';
import { LanguageProficiencyName } from '@/common/enums/language.enum';
import { format } from 'date-fns';
import clsx from 'clsx';
import { Fragment } from 'react';
import { DriverLicenseName, Program } from '@/common';
import { BcwsRoleName } from '@/common/enums/sections.enum';
import {
  expectationsBcws,
  expectationsBoth,
  expectationsEmcr,
} from '../constants/enums';
import { TravelPreferenceText } from '@/common/enums/travel-preference.enum';
import { ToolsProficiencyName } from '@/common/enums/tools.enum';
import { formatPhone } from '@/utils';

const ReviewFields = ({
  fields,
  sectionName,
}: {
  fields: FormFields[];
  sectionName: string;
}) => {
  const { values } = useFormikContext<IntakeFormValues>();

  const getValue = (value: any, name: string) => {
    if (value === 'true') return 'Yes';
    if (value === 'false') return 'No';
    if (!value || value === '' || value.length === 0) return '--';
    switch (name) {
      case 'primaryPhoneNumber':
      case 'secondaryPhoneNumber':
      case 'emergencyContactPhoneNumber':
      case 'supervisorPhoneNumber':
      case 'workPhoneNumber':
        return formatPhone(value);
      case 'homeLocation':
        return value?.name ?? '--';
      case 'functions':
        return (value as any[])
          .map((itm) => itm?.name)
          .filter(
            (itm) => (itm && itm?.name !== undefined) || (itm && itm?.name !== ''),
          )
          ?.join('; ');
      case 'certification':
        return value ? value?.name : '--';
      case 'expiry':
        return value && format(value, 'yyyy-MM-dd');
      case 'toolProficiency':
        return value
          ? ToolsProficiencyName[value as keyof typeof ToolsProficiencyName]
          : '--';
      case 'travelPreferenceEmcr':
      case 'travelPreferenceBcws':
        return (
          value && TravelPreferenceText[value as keyof typeof TravelPreferenceText]
        );
      case 'tool':
        return (value && value.name) || '--';
      case 'firstChoiceFunction':
      case 'secondChoiceFunction':
      case 'thirdChoiceFunction':
        return value ? value?.name : '--';
      case 'firstChoiceSection':
      case 'secondChoiceSection':
      case 'thirdChoiceSection':
        return value ? value?.name : '--';
      case 'PLANNING':
      case 'LOGISTICS':
      case 'FINANCE_ADMIN':
      case 'OPERATIONS':
      case 'COMMAND':
      case 'AVIATION':
        return (
          (value as any[])
            ?.map((itm) => BcwsRoleName[itm.name as keyof typeof BcwsRoleName])
            ?.join('; ') ?? '--'
        );
      case 'languageProficiency':
        return (
          (value &&
            LanguageProficiencyName[
              value as keyof typeof LanguageProficiencyName
            ]) ||
          '--'
        );
      case 'language':
        return value;
      case 'driverLicense':
        return (
          (value &&
            value.length > 0 &&
            (value as any[])
              .map((itm) => DriverLicenseName[itm as keyof typeof DriverLicenseName])
              .join('; ')) ||
          '--'
        );
      case 'ministry':
        return value || '--';

      default:
        return value?.name ? value.name : value ? value : '--';
    }
  };

  return (
    <div
      className={clsx(
        'col-span-2 gap-y-8 grid',
        ['EMCR CORE Team Sections', 'BCWS CORE Team Sections and Roles'].includes(
          sectionName,
        ) ? 'grid-cols-3' :  'grid-cols-2',
      )}
    >
      {fields
        ?.filter((itm) =>
          itm.program && values.program
            ? handleFilterProgram(itm, values.program)
            : itm,
        )
        .map((field: any, index: number) => (
          <Fragment key={field.name + index.toString()}>
            {!field.nestedFields ? (
              <div
                key={field.name}
                className={clsx(field.colSpan ? `col-span-${field.colSpan}` : 'col-span-1')}
              >
                
                      
                {field.label && (
                  <div className="subtext text-sm pb-2">{field.label}</div>
                )}
                {field.helperText && (
                  <div className="subtext text-sm pb-2">{field.helperText}</div>
                )}
                <div className="text-[#262729]">
                  
                  {getValue(values?.[field.name as keyof typeof values], field.name)}
                </div>
                </div>
                
              
            ) : (
<div className={'col-span-2'}>
                {(values?.[field.name as keyof typeof values] as {}[])?.map(
                  (itm, index) => (
                    <div
                      className={`grid grid-cols-2 pb-8`}
                      key={index.toString() + itm}
                    >
                      {itm &&
                        field.nestedFields?.map((innerField: FormFields) => (
                          <div
                            className="col-span-1 flex flex-col"
                            key={innerField.name}
                          >
                            <div className="subtext text-sm pb-2">
                              {innerField.label}
                            </div>
                            <div className="text-[#262729] ">
                              {getValue(
                                itm?.[innerField.name as keyof typeof itm] ?? '',
                                innerField?.name,
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ),
                )}
              </div>
            )}
          </Fragment>
        ))}
    </div>
  );
};

export const Review = ({ sections }: { sections: FormSectionType[] }) => {
  const { values, errors } = useFormikContext<IntakeFormValues>();

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

  const reviewSections = sections?.map((section) => ({
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

  return (
    <>
      <FormSection section={{ name: 'CORE Team Program (Stream) Selection' }}>
        <>
          <div className={`col-span-2`}>
            <div className="subtext text-sm">Program</div>
            <div className="text-[#262729] ">
              {values.program && values.program === Program.ALL
                ? 'EMCR & BCWS'
                : values.program && values.program.toUpperCase()}
            </div>
          </div>
          <div className={`col-span-2`}>
            <div className="subtext text-sm pb-4">Acknowledgement</div>
            <div className="flex flex-col gap-y-4">
              {values.acknowledgement &&
                values.program === Program.EMCR &&
                expectationsEmcr.map((itm, index) => (
                  <div
                    className="text-[#262729] text-sm"
                    key={index.toString() + 'ack'}
                  >
                    {itm.label}
                  </div>
                ))}

              {values.acknowledgement &&
                values.program === Program.ALL &&
                expectationsBoth.map((itm, index) => (
                  <div
                    className="text-[#262729] text-sm"
                    key={index.toString() + 'ack'}
                  >
                    {itm.label}
                  </div>
                ))}

              {values.acknowledgement &&
                values.program === Program.BCWS &&
                expectationsBcws.map((itm, index) => (
                  <div
                    className="text-[#262729] text-sm"
                    key={index.toString() + 'ack'}
                  >
                    {itm.label}
                  </div>
                ))}
            </div>
          </div>
        </>
      </FormSection>
      {reviewSections?.map((section, index) => (
        <FormSection
          section={section as FormSectionType}
          key={section.name + index.toString()}
        >
          <>
            {section.segments?.map((segment: FormSectionType, index: number) => (
              <Fragment key={segment.name + index.toString()}>
                <div className="col-span-2">
                  <p className="font-bold">{segment.name}</p>
                </div>
                {segment.fields && (
                  <ReviewFields
                    fields={segment.fields}
                    sectionName={segment.name ?? ''}
                  />
                )}
                {index !== section.segments.length - 1 && (
                  <div className="col-span-2 w-full border border-t-1 border-gray-400"></div>
                )}
              </Fragment>
            ))}
          </>
        </FormSection>
      ))}
      <div className="pb-40">
        <label>
          <Field type="checkbox" name="reviewAck" id="reviewAck" />
          <span className="px-2">
            By submitting this form, I acknowledge that the information provided is
            accurate to the best of my knowledge.
            <span className="text-errorRed">*</span>
          </span>
        </label>
        {errors.reviewAck && (
          <div className="font-normal text-sm text-errorRed">{errors.reviewAck}</div>
        )}
      </div>
    </>
  );
};
