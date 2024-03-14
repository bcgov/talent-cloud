export const TableFooterNavButton = ({
  disabled,
  icon,
  onClick,
  ariaLabel,
}: {
  disabled: boolean;
  icon: any;
  onClick: any;
  ariaLabel: string;
}) => {
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={
        'relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 '
      }
    >
      {icon}
    </button>
  );
};
