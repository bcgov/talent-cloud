import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import type { ReactElement } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

type DialogProps = {
  open: boolean;
  onClose: (e: Event) => void;
  handleOpen: (e: React.MouseEvent<HTMLElement>) => void;
  title: string;
  children: ReactElement;
  style?: string;
};

export const DialogUI = ({
  open,
  onClose,
  handleOpen,
  title,
  children,
  style,
}: DialogProps) => {
  return (
    <Dialog
      transition
      className="relative z-50 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
      open={open}
      onClose={(...props: any) => onClose(props.event)}
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className={`mx-auto rounded bg-white ${style}`}>
            <DialogTitle className="flex flex-row w-full justify-between pt-6 px-6 text-primaryBlue font-bold">
              <h4 className="font-bold">{title}</h4>
              <button
                aria-label="close"
                className="text-sm text-primaryBlue underline font-normal"
                onClick={handleOpen}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </DialogTitle>

            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
