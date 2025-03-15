import type { ReactElement } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

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

  const showAlert = (ctx: { type: AlertType; message?: string; title?: string }) => {
    const { type, message, title } = ctx;
    setType(type);
    setMessage(message);
    setTitle(title);
    setOpen(true);
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

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};
