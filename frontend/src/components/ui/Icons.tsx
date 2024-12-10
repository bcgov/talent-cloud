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

export const ExclamationCircleIcon = ({ className }: { className: string }) => {
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
          fill="#1A5A96"
        />
      </svg>
    </span>
  );
};
