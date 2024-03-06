import type { AxiosError } from 'axios';
import type { ReactElement } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { ErrorComponent } from '@/components/ui/ErrorComponent';

export const ErrorContext = createContext<{
  error?: Error | null;
  handleError: (e: unknown) => void;
}>({
  handleError: (e: unknown) => {
    console.log(e);
  },
});

export const ErrorProvider = ({ children }: { children: ReactElement }) => {
  const [error, setError] = useState<Error | AxiosError | null>(null);

  useEffect(() => {
    window.addEventListener('error', (e) => setError(e.error as Error));
    return () => {
      window.removeEventListener('error', () => setError(null));
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
