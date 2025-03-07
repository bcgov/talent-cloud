import { useField, useFormikContext, type FormikProps } from 'formik';
import type { IntakeFormPersonnelData } from '../fields';
import { classes } from '@/components/filters/classes';
import type { FormFields } from '../types';
import { useProgramFieldData } from '@/hooks';
import { SectionName } from '@/common/enums/sections.enum';

export const SelectField = (
  props: FormFields & FormikProps<IntakeFormPersonnelData>,
) => {
  const { values } = useFormikContext<IntakeFormPersonnelData>();
  const [field] = useField(props.name);
  const { functions, locations, sections, tools, certificates } =
    useProgramFieldData(values.program);

  const getOptions = () => {
    switch (props.name) {
      case 'homeLocation':
        return locations.map((loc) => ({
          label: loc.locationName,
          value: loc.id,
        })) as unknown as { label: string; value: string }[];
      case 'tools':
        return tools.map((tool) => ({
          label: tool.fullName,
          value: tool.id,
        })) as unknown as { label: string; value: string }[];
      case 'certificates':
        return certificates.map((cert) => ({
          label: cert.name,
          value: cert.id,
        })) as unknown as { label: string; value: string }[];
      case 'bcws.firstChoiceSection':
      case 'bcws.secondChoiceSection':
      case 'bcws.thirdChoiceSection':
        return Object.keys(sections).map((itm) => ({
          label: SectionName[itm as keyof typeof SectionName],
          value: itm,
        })) as unknown as { label: string; value: string }[];
      case 'emcr.firstChoiceFunction':
      case 'emcr.secondChoiceFunction':
      case 'emcr.thirdChoiceFunction':
        return functions.map((itm) => ({
          label: itm.name,
          value: itm.id,
        })) as unknown as { label: string; value: string }[];
      default:
        return props.options;
    }
  };
  const options = getOptions();

  return (
    <select className={classes.menu.container} {...props} {...field} value={undefined} defaultValue={''}>
      <option disabled value={''}>
        {props.placeholder}
      </option>
      {options?.map((o: { label: string; value: string }) => (
        <option value={o.value as string} key={o.value as string} disabled={false}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
