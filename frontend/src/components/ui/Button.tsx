import type { ButtonProps } from '@/common';
import { ButtonTypes } from '@/common';
import { button } from './classes';

export const Button = ({ type, variant, text, onClick, disabled }: ButtonProps) => {
  const buttonClass = (disabled?: boolean) => {
    if (disabled) {
      return button.disabledButton;
    }
    if (variant === ButtonTypes.PRIMARY) {
      return button.primaryButton;
    }
    if (variant === ButtonTypes.SECONDARY) {
      return button.secondaryButton;
    }
    if (variant === ButtonTypes.TERTIARY) {
      return button.tertiaryButton;
    }
  };

  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={buttonClass(disabled)}
    >
      {text}
    </button>
  );
};
