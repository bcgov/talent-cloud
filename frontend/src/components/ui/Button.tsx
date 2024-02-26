import type { ButtonProps } from '@/common';
import { ButtonTypes } from '@/common';

const secondaryButton =
  'bg-transparent border border-2 rounded-md f px-6 py-2 border-primaryBlue text-center block font-bold text-decoration-none whitespace-nowrap';

const primaryButton =
  'bg-transparent  border-2 border-white text-white rounded-sm opacity-100  px-6 py-2 text-center block font-bold text-decoration-none text-transform-none whitespace-nowrap w-auto flex flex-row justify-center items-center no-underline';
const tertiaryButton =
  'bg-primaryBlue text-white rounded-md f px-6 py-2 border-primaryBlue text-center block font-bold text-decoration-none whitespace-nowrap';
const disabledButton =
  'bg-gray-300 text-gray-500 rounded-md f px-6 py-2 border-gray-300 text-center block font-bold text-decoration-none whitespace-nowrap';
export const Button = ({
  type,
  variant,
  text,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <>
      {variant === ButtonTypes.PRIMARY && (
        <button
          type={type ?? 'button'}
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled}
          className={disabled ? 'BC-Gov-PrimaryButton-disabled' : primaryButton}
        >
          {text}
        </button>
      )}

      {variant === ButtonTypes.SECONDARY && (
        <button
          type={type ?? 'button'}
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled}
          className={disabled ? 'BC-Gov-SecondaryButton-disabled' : secondaryButton}
        >
          {text}
        </button>
      )}
      {variant === ButtonTypes.TERTIARY && (
        <button
          type={type ?? 'button'}
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled}
          className={disabled ? disabledButton : tertiaryButton}
        >
          {text}
        </button>
      )}
    </>
  );
};
