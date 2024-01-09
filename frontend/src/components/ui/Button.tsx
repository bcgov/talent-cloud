import type { ButtonProps } from '../../common';
import { ButtonTypes } from '../../common';

export const Button = ({ type, text, onClick, disabled = false }: ButtonProps) => {
  return (
    <>
      {type === ButtonTypes.PRIMARY && (
        <button
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled}
          className={
            disabled ? 'BC-Gov-PrimaryButton-disabled' : 'BC-Gov-PrimaryButton'
          }
        >
          {text}
        </button>
      )}

      {type === ButtonTypes.SECONDARY && (
        <button
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled}
          className={
            disabled ? 'BC-Gov-SecondaryButton-disabled' : 'BC-Gov-SecondaryButton'
          }
        >
          {text}
        </button>
      )}
    </>
  );
};
