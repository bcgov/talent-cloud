// types
import { FormComponent as FormComponentType } from '../constants/types';

// util
import { handleFilterProgram, renderIntakeFormComponent } from '../utils/helpers';

export const FormComponent = (props: {
  fieldItm: FormComponentType;
  program?: string;
}) => {
  const { fieldItm, program } = props;
  return (
    <>
      {handleFilterProgram(fieldItm, program as string) && (
        <div className={'col-span-2'}>{renderIntakeFormComponent(fieldItm)}</div>
      )}
    </>
  );
};
