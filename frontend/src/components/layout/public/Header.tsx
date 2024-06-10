import { CoreLogoHorizontal } from '../../images';
import { headerLink } from '@/common/links';

export const Header = () => {
  return (
    <header className="relative w-full border-b z-40 py-0">
      <div className="w-full md:flex justify-start md:justify-between items-start md:items-center fixed top-0 mt-0 bg-white border-b border-[#D9D9D9] shadow-sm lg:px-12 xl:px-24 py-0 2xl:pl-64">
        <div className="lg:flex">
          <a
            href={headerLink}
            className="p-2"
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            <CoreLogoHorizontal />
          </a>
        </div>
      </div>
    </header>
  );
};
