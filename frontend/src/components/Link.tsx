import { LinkProps, LinkTypes } from '../common';

export const Link = ({
  href,
  label,
  type = LinkTypes.INTERNAL,
  active = false,
}: LinkProps) => {
  return (
    <>
      {type === LinkTypes.INTERNAL && (
        <a className={active ? 'active' : ''} href={href}>
          {label}
        </a>
      )}

      {type === LinkTypes.EXTERNAL && (
        <>
          <a className={active ? 'active' : ''} href={href}>
            {label}
          </a>{' '}
          <i className="fas fa-external-link-alt"></i>
        </>
      )}

      {type === LinkTypes.PHONE && (
        <a className={active ? 'active' : ''} href={`tel:+1-${href}`}>
          {label}
        </a>
      )}
    </>
  );
};
