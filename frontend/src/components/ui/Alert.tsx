import { AlertType, useAlertContext } from '@/providers/Alert';
import { ExclamationCircleIcon } from './Icons';
import clsx from 'clsx';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export const AlertBanner = () => {
  const { type, message, open, title, closeAlert } = useAlertContext();
  const background = clsx(
    'mx-auto rounded-md flex flex-row w-auto py-4 justify-between',
    type === AlertType.ERROR && 'bg-red-200',
    type === AlertType.WARNING && 'bg-yellow-200',
    type === AlertType.INFO && 'bg-blue-300',
    type === AlertType.SUCCESS && 'bg-sprout-300',
  );
  const titleClass = clsx(
    'text-lg px-4 font-bold flex flex-row space-x-4',
    type === AlertType.ERROR && 'text-red-600',
    type === AlertType.WARNING && 'text-yellow-900',
    type === AlertType.INFO && 'text-blue-800',
    type === AlertType.SUCCESS && 'text-green-900',
  );
  const buttonClass = clsx(
    'text-sm underline font-normal px-4',
    type === AlertType.ERROR && 'text-red-600',
    type === AlertType.WARNING && 'text-yellow-900',
    type === AlertType.INFO && 'text-blue-800',
    type === AlertType.SUCCESS && 'text-green-900',
  );
  const iconClass = clsx(
    'h-8 w-8',
    type === AlertType.ERROR && 'text-red-600',
    type === AlertType.WARNING && 'text-yellow-900',
    type === AlertType.INFO && 'text-blue-800',
    type === AlertType.SUCCESS && 'text-green-900',
  );
  return (
    <Dialog
      transition
      className="relative z-50 origin-center transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
      open={open}
      onClose={closeAlert}
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/0" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto mt-32">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-start place-self-end p-4 mr-16">
          {/* The actual dialog panel  */}
          <DialogPanel className={background}>
            <DialogTitle className={titleClass}>
              <ExclamationCircleIcon className={iconClass} type={type} />
              <span>{title}</span>
            </DialogTitle>
            <button aria-label="close" className={buttonClass} onClick={closeAlert}>
              <XMarkIcon className="h-6 w-6" />
            </button>
            {message}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
