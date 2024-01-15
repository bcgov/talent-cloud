import type { ButtonProps } from '@/common';
import { ButtonTypes } from '@/common';

const secondaryButton =
  'bg-transparent underline border-none text-center block font-bold text-md w-auto flex flex-row whitespace-nowrap';
const primaryButton =
  'bg-primaryBlue border-none text-center block font-bold text-md w-auto flex flex-row whitespace-nowrap text-white px-6 py-2 rounded-sm';

export const Button = ({ type, text, onClick, disabled = false }: ButtonProps) => {
  return (
    <>
      {type === ButtonTypes.PRIMARY && (
        <button
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled}
          className={disabled ? 'BC-Gov-PrimaryButton-disabled' : primaryButton}
        >
          {text}
        </button>
      )}

      {type === ButtonTypes.SECONDARY && (
        <button
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled}
          className={disabled ? 'BC-Gov-SecondaryButton-disabled' : secondaryButton}
        >
          {text}
        </button>
      )}
    </>
  );
};
