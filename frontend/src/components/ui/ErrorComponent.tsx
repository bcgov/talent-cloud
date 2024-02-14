import { useError } from '@/hooks';
import type { AxiosError } from 'axios';

export const ErrorComponent = () => {
  const { error } = useError();

  return (
    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
      <div className="max-w-xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center space-y-8 text-center justify-center">
        <div className="items-center pt-8 sm:justify-start sm:pt-0  flex flex-row">
          <div className="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
            {(error as AxiosError)?.request?.status ?? (error as Error)?.name}
          </div>
          <div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">
            {(error as AxiosError)?.request?.statusText ?? (error as Error)?.message}
          </div>
        </div>
      </div>
    </div>
  );
};
