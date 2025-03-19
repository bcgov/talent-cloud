import { InformationCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export enum AlertType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}
interface AlertContext {
  type: AlertType;
  message?: string;
  open: boolean;
  title?: string;
  showAlert: (_ctx: { type: AlertType; message?: string; title?: string }) => void;
  closeAlert: () => void;
}
export const AlertContext = createContext<AlertContext>({
  type: AlertType.INFO,
  message: '',
  open: false,
  title: '',

  showAlert: (_ctx: { type: AlertType; message?: string; title?: string }) => {},
  closeAlert: (_cb?: () => void) => {},
});

export const useAlertContext = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlertContext must be used within a AlertProvider');
  const {
    type,
    message,
    open,
    title,

    showAlert,
    closeAlert,
  } = ctx;
  return {
    type,
    message,
    open,
    title,

    showAlert,
    closeAlert,
  };
};

export const AlertProvider = ({ children }: { children: ReactElement }) => {
  const [type, setType] = useState<AlertType>(AlertType.INFO);
  const [message, setMessage] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();

  const showAlert = ({
    type,
    message,
    title,
  }: {
    type: AlertType;
    message?: string;
    title?: string;
  }) => {
    setType(type);
    setMessage(message);
    setTitle(title);

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
  };

  const closeAlert = (cb?: () => void) => {
    setOpen(false);
    if (cb) cb();
  };

  const value = useMemo(() => {
    return {
      type,
      message,
      open,
      title,
      showAlert,
      closeAlert,
    };
  }, [type, message, open, title]);

  return (
    <AlertContext.Provider value={value}>
      <>
        {children}
        <ToastContainer />
      </>
    </AlertContext.Provider>
  );
};
