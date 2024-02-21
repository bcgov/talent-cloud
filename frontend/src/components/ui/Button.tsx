import type { ButtonProps } from '@/common';
import { ButtonTypes } from '@/common';

const secondaryButton =
  'bg-transparent underline border border-2 rounded-md f px-6 py-2 border-primaryBlue text-center block font-bold text-decoration-none whitespace-nowrap';
const primaryButton =
  'bg-transparent  border-2 border-white text-white rounded-sm opacity-100  px-6 py-2 text-center block font-bold text-decoration-none text-transform-none whitespace-nowrap w-auto flex flex-row justify-center items-center no-underline';

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
