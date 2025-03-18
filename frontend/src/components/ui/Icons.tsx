import { AlertType } from '@/providers/Alert';

export const ChevronDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={'currentColor'}
      strokeWidth={3}
      className={`h-4 w-4 stroke-4`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export const ChevronUpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={'currentColor'}
      strokeWidth={3}
      className={`h-4 w-4 stroke-4`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};

export const CloseIcon = ({ color }: { color: string }) => {
  return (
    <span className={`${color}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke={'currentColor'}
        className={`size-6 ${color}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </span>
  );
};

export const ExclamationCircleIcon = ({
  className,
  type,
}: {
  className: string;
  type?: AlertType;
}) => {
  let fill;
  if (type === AlertType.ERROR) {
    fill = '#A12622';
  } else if (type === AlertType.WARNING) {
    fill = '#6C4A00';
  } else if (type === AlertType.INFO) {
    fill = '#1A5A96';
  } else {
    fill = '#2D4821';
  }

  return (
    <span className={className}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.2188 12.1091C24.2188 18.7984 18.7967 24.2185 12.1094 24.2185C5.42202 24.2185 0 18.7984 0 12.1091C0 5.42373 5.42202 -0.000244141 12.1094 -0.000244141C18.7967 -0.000244141 24.2188 5.42373 24.2188 12.1091ZM12.1094 14.5505C10.8689 14.5505 9.86328 15.5562 9.86328 16.7966C9.86328 18.0371 10.8689 19.0427 12.1094 19.0427C13.3499 19.0427 14.3555 18.0371 14.3555 16.7966C14.3555 15.5562 13.3499 14.5505 12.1094 14.5505ZM9.9769 6.477L10.3391 13.1176C10.3561 13.4284 10.613 13.6716 10.9242 13.6716H13.2946C13.6058 13.6716 13.8627 13.4284 13.8796 13.1176L14.2418 6.477C14.2602 6.14136 13.9929 5.85913 13.6568 5.85913H10.5619C10.2258 5.85913 9.95859 6.14136 9.9769 6.477Z"
          fill={fill}
        />
      </svg>
    </span>
  );
};

export const CheckIcon = ({
  fill,
  className,
}: {
  fill?: string;
  className?: string;
}) => {
  if (fill === 'white') {
    fill = '#FFFFFF';
  } else {
    fill = '#2D4821';
  }
  return (
    <span className={className}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.43431 13.7314L0.234305 8.53136C-0.0781016 8.21895 -0.0781016 7.71242 0.234305 7.39998L1.36565 6.26861C1.67805 5.95617 2.18462 5.95617 2.49702 6.26861L5.99999 9.77154L13.503 2.26861C13.8154 1.9562 14.3219 1.9562 14.6343 2.26861L15.7657 3.39998C16.0781 3.71239 16.0781 4.21892 15.7657 4.53136L6.56568 13.7314C6.25324 14.0438 5.74671 14.0438 5.43431 13.7314Z"
          fill={fill}
        />
      </svg>
    </span>
  );
};

export const QuestionIcon = () => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 6C12.5 9.31444 9.81348 12 6.5 12C3.18652 12 0.5 9.31444 0.5 6C0.5 2.68749 3.18652 0 6.5 0C9.81348 0 12.5 2.68749 12.5 6ZM6.66101 1.98387C5.34253 1.98387 4.50161 2.53928 3.84127 3.5264C3.75573 3.65429 3.78435 3.82677 3.90696 3.91974L4.74645 4.55627C4.87238 4.65177 5.0518 4.62905 5.14964 4.50494C5.58183 3.95676 5.87818 3.63888 6.536 3.63888C7.03025 3.63888 7.6416 3.95698 7.6416 4.43625C7.6416 4.79857 7.34249 4.98465 6.85448 5.25825C6.28536 5.57729 5.53226 5.97438 5.53226 6.96774V7.06452C5.53226 7.22485 5.66225 7.35484 5.82258 7.35484H7.17742C7.33775 7.35484 7.46774 7.22485 7.46774 7.06452V7.03227C7.46774 6.34367 9.48031 6.315 9.48031 4.45161C9.48031 3.04834 8.0247 1.98387 6.66101 1.98387ZM6.5 7.98387C5.88633 7.98387 5.3871 8.4831 5.3871 9.09677C5.3871 9.71042 5.88633 10.2097 6.5 10.2097C7.11367 10.2097 7.6129 9.71042 7.6129 9.09677C7.6129 8.4831 7.11367 7.98387 6.5 7.98387Z"
        fill="#1A5A96"
      />
    </svg>
  );
};

export const PlusIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.75 6.3125H9.6875V1.25C9.6875 0.628789 9.18371 0.125 8.5625 0.125H7.4375C6.81629 0.125 6.3125 0.628789 6.3125 1.25V6.3125H1.25C0.628789 6.3125 0.125 6.81629 0.125 7.4375V8.5625C0.125 9.18371 0.628789 9.6875 1.25 9.6875H6.3125V14.75C6.3125 15.3712 6.81629 15.875 7.4375 15.875H8.5625C9.18371 15.875 9.6875 15.3712 9.6875 14.75V9.6875H14.75C15.3712 9.6875 15.875 9.18371 15.875 8.5625V7.4375C15.875 6.81629 15.3712 6.3125 14.75 6.3125Z"
        fill="white"
      />
    </svg>
  );
};
