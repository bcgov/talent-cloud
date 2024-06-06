import { main, landAcknowledgement, footer } from './constants';
import { SplashFooter } from './SplashFooter';
import { SplashMain } from './SplashMain';
import { SplashBanner } from './SplashBanner';

const SplashPage = () => {
  return (
    <div className="bg-white h-screen">
      <SplashMain content={main} />
      <SplashBanner content={landAcknowledgement} />
      <SplashFooter content={footer} />
    </div>
  );
};

export default SplashPage;
