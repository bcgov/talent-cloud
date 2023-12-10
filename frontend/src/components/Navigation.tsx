import { Link } from './Link';
import { LinkProps, NavProps } from '../common';

//TODO replace img url with static img
export const Navigation = ({ links, header }: NavProps) => {
  return (
    <>
      <header>
        <div className="banner">
          <a href="https://gov.bc.ca">
            <img
              src="https://www2.gov.bc.ca/errors/images/bc_logo_transparent.png"
              alt="Go to the Government of British Columbia website"
            />
          </a>
          <h1>{header}</h1>
        </div>
        {/* // right side of logo */}
        <div className="other">
          <a className="nav-btn">
            <i className="fas fa-bars" id="menu"></i>
          </a>
        </div>
      </header>
      <nav className="navigation-main" id="navbar">
        <div className="container">
          <ul>
            {links.map(({ href, label }: LinkProps, i: number) => (
              <li key={i}>
                <Link
                  href={href}
                  active={window.location.pathname.includes(label.toLowerCase())}
                  label={label}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};
