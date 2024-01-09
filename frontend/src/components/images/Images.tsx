const src = new URL('../../../public/assets/images/logo.svg', import.meta.url).href;
export const Logo = () => <img src={src} alt="logo" />;
