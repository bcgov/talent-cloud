// common
import { Program } from '@/common';

// fields
import { CheckboxGroupField } from '../../fields/CheckBoxGroupField';
import { RadioGroupField } from '../../fields/RadioGroupField';

export const fields = [
  {
    name: 'program',
    label: '',
    type: 'radio-group',
    component: RadioGroupField,
    options: [
      {
        label: (
          <span className="font-normal">
            I am only applying for the{' '}
            <span className="font-bold">EMCR CORE Team program stream.</span>
          </span>
        ),
        value: Program.EMCR,
      },
      {
        label: (
          <span className="font-normal">
            I am only applying for the{' '}
            <span className="font-bold">BCWS CORE Team program stream.</span>
          </span>
        ),
        value: Program.BCWS,
      },
      {
        label: (
          <span className="font-normal">
            I am applying for{' '}
            <span className="font-bold">both CORE Team program streams.</span>
          </span>
        ),
        value: Program.ALL,
      },
    ],
    required: true,
    placeholder: 'Select a program',
  },
  {
    name: 'acknowledgement',
    label: (
      <span>
        Acknowledgement for selected program stream(s){' '}
        <span className="subtext">(Check all to proceed)</span>
      </span>
    ),
    type: 'checkbox-group',
    hidden: true,
    component: CheckboxGroupField,
    required: false,
    options: [],
  },
];
