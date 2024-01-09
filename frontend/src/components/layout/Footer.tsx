import type { FooterProps, LinkProps } from '@/common';
import { Link } from 'react-router-dom';

export const Footer = ({ links }: FooterProps) => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <ul>
            {links.map(({ href, label, active }: LinkProps, i: number) => (
              <li key={i}>
                <Link to={href} className={active ? 'active' : ''}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
};
