import type { FooterProps, LinkProps } from '@/common';
import { Link } from 'react-router-dom';

export const Footer = ({ links }: FooterProps) => {
  return (
    <footer className="max-w-full bg-backgroundBlue mt-auto">
        <ul className="text-white   space-x-4 flex flex-row no-wrap justify-start items-center text-sm py-2 md:px-8 overflow-x-hidden">
          {links.map(({ href, label }: LinkProps, i: number) => (
            <li key={i.toString()+label}>
              <Link to={href} className="border-r border-gray-100 pr-4">
                {label}
              </Link>
            </li>
          ))}
        </ul>
    </footer>
  );
};
