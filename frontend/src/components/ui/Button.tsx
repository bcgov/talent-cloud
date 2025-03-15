import type { ButtonProps } from '@/common';
import { ButtonTypes } from '@/common';
import { button } from './classes';
import { ButtonLoading } from './Loading';

export const Button = ({
  id,
  type,
  variant,
  text,
  onClick,
  disabled,
  loading,
  textIcon,
}: ButtonProps) => {
  const buttonClass = () => {
    if (variant === ButtonTypes.PRIMARY || variant === ButtonTypes.OUTLINED) {
      return button.primaryButton;
    }
    if (variant === ButtonTypes.SECONDARY) {
      return button.secondaryButton;
    }
    if (variant === ButtonTypes.TERTIARY || variant === ButtonTypes.SOLID) {
      return button.tertiaryButton;
    }
    if (variant === ButtonTypes.SECONDARY_LIGHT) {
      return button.secondaryLight;
    }
    if (variant === ButtonTypes.TEXT) {
      return button.textButton;
    }
  };

  return (
    <button
      id={id}
      type={type ?? 'button'}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={text}
      className={buttonClass()}
    >
      {loading ? (
        <ButtonLoading />
      ) : (
        <div className="flex flex-row gap-2 items-center">
          {textIcon}
          {text}
        </div>
      )}
    </button>
  );
};
