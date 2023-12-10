import { Link } from './Link';
import { FooterProps, LinkProps } from '../common';

export const Footer = ({ links }: FooterProps) => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <ul>
            {links.map(({ href, label }: LinkProps, i: number) => (
              <li key={i}>
                <Link href={href} label={label} />
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
};
