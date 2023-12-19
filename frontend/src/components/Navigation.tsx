import { Link } from 'react-router-dom';
import { LinkProps, NavProps } from './types';

//TODO replace img url with static img
export const Navigation = ({ links }: NavProps) => {
  return (
    <nav className="navigation-main" id="navbar">
      <div className="container">
        <ul>
          {links.map(({ href, label }: LinkProps, i: number) => (
            <li key={i}>
              <Link
                to={href}
                className={
                  window.location.pathname.includes(label.toLowerCase())
                    ? 'active'
                    : ''
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
