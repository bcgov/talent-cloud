import type { ButtonProps } from '@/common';
import { ButtonTypes } from '@/common';
import { button } from './classes';

export const Button = ({ type, variant, text, onClick, disabled }: ButtonProps) => {
  const buttonClass = () => {
    if (variant === ButtonTypes.PRIMARY) {
      return button.primaryButton;
    }
    if (variant === ButtonTypes.SECONDARY) {
      return button.secondaryButton;
    }
    if (variant === ButtonTypes.TERTIARY) {
      return button.tertiaryButton;
    }
    if (variant === ButtonTypes.SECONDARY_LIGHT) {
      return button.secondaryLight;
    }
  };

  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={text}
      className={buttonClass()}
    >
      {text}
    </button>
  );
};
