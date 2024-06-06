export const EmcrLogo = () => (
  <img
    width={300}
    src={new URL('/assets/images/emcr_logo.svg', import.meta.url).href}
    alt="emcr logo horizontal light"
    className="-my-2"
  />
);

export const BcGovLogo = () => (
  <img
    src={new URL('/assets/images/bcgov_logo.svg', import.meta.url).href}
    alt="logo"
  />
);

export const BcGovLogoHorizontal = () => (
  <img
    width={262}
    className="-my-2"
    src={new URL('/assets/images/BCID_H_rgb_pos.png', import.meta.url).href}
    alt="bc government logo"
  />
);

export const CoreLogo = () => (
  <img
    width={100}
    className="-my-2"
    src={new URL('/assets/images/CORE_Logo_R_RGB_pos.png', import.meta.url).href}
    alt="core logo"
  />
);

export const CoreLogoHorizontal = () => (
  <img
    width={262}
    className="-my-2"
    src={new URL('/assets/images/CORE_Logo_H_RGB_pos.png', import.meta.url).href}
    alt="core logo"
  />
);

export const UserIcon = () => (
  <img
    src={new URL('/assets/images/profile-icon.svg', import.meta.url).href}
    alt="logo"
  />
);

export const CloudIcon = () => (
  <img
    src={new URL('/assets/images/cloud-icon.svg', import.meta.url).href}
    alt="logo"
  />
);

export const SplashImage = () => (
  <img
    className="w-full h-auto"
    src={new URL('/assets/images/splash.png', import.meta.url).href}
    alt="EMCR Splash"
  />
);
