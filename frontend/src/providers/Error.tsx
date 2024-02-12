import { AxiosError } from 'axios';
import { ReactElement, createContext, useEffect, useMemo, useState } from 'react';
import { ErrorComponent } from '@/components/ui/Error';

export const ErrorContext = createContext<{
  error: Error | null | undefined;
  handleError: (e: unknown) => void;
}>({ error: null, handleError: (e: unknown) => {} });

export const ErrorProvider = ({ children }: { children: ReactElement }) => {
  const [error, setError] = useState<Error | AxiosError | null>();

  useEffect(() => {
    window.addEventListener('error', (e) => setError(e.error as Error));
    return () => {
      window.removeEventListener('error', (e) => setError(null));
    };
  }, [error]);
  
  const value = useMemo(
    () => ({
      error,
      handleError: (e: unknown) => setError(e as Error),
    }),
    [error],
  );

  return (
    <ErrorContext.Provider value={value}>
      {error ? <ErrorComponent /> : children}
    </ErrorContext.Provider>
  );
};
