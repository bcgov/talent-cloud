import { AlertType } from '@/providers/Alert';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Flip, toast } from 'react-toastify';

export const useAlert = () => {
  const showAlert = ({ type, message }: { type: AlertType; message?: string }) =>
    toast(message, {
      className: clsx(
        type === AlertType.ERROR && 'bg-red-200 text-red-600',
        type === AlertType.WARNING && 'bg-yellow-200 text-yellow-900',
        type === AlertType.INFO && 'bg-blue-300 text-blue-800',
        type === AlertType.SUCCESS && 'bg-sprout-300 text-green-900',
      ),
      type,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: true,
      pauseOnHover: true,
      icon: InformationCircleIcon,
      transition: Flip,
    });
  return {
    showAlert,
  };
};
