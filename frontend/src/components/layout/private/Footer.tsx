import type { LinkProps } from '@/common';
import { footerLinks } from '@/common/links';

export const Footer = () => {
  return (
    <footer className="max-w-full bg-backgroundBlue mt-auto py-4">
      <ul className="text-white   space-x-4 flex flex-row no-wrap justify-start items-center text-sm py-2 md:px-8 overflow-x-hidden">
        {footerLinks.map(({ href, label }: LinkProps, i: number) => (
          <li key={i.toString() + label}>
            <a
              href={href}
              className="border-r border-gray-100 pr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
