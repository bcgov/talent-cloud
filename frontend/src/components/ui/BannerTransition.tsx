import { Transition } from '@headlessui/react';
import type { ReactElement } from 'react';

export const BannerTransition = ({
  children,
  show,
}: {
  children: ReactElement;
  show: boolean;
}) => {
  return (
    <Transition
      show={show}
      appear={true}
      enter="ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="pb-6">{children}</div>
    </Transition>
  );
};
