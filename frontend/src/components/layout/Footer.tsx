import type { FooterProps, LinkProps } from '@/common';
import { Link } from 'react-router-dom';

export const Footer = ({ links }: FooterProps) => {
  return (
    <footer className="relative">
      <div className="fixed w-full bg-backgroundBlue bottom-0">
        <ul className="text-white   space-x-4 flex flex-row no-wrap justify-start items-center text-sm py-2 md:px-8 ">
          {links.map(({ href, label }: LinkProps, i: number) => (
            <li key={i}>
              <Link to={href} className="border-r border-gray-100 pr-4">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
