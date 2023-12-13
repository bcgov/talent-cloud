import { ReactComponent as ReactLogo } from '../assets/images/bcgovlogo.svg';
import logo2 from '../assets/images/logo-banner.png';

export const Header = ({ header }: { header: string }) => {
  return (
    <header>
      <div className="banner">
        <a href="https://gov.bc.ca">
          <img src={logo2} alt="navigate to BC Gov website" />
        </a>
        <h1>{header}</h1>
      </div>
      <div className="other">
        <a className="nav-btn">
          <i className="fas fa-bars" id="menu"></i>
        </a>
      </div>
    </header>
  );
};
