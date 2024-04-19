import { useEffect, useState } from 'react';

import type { AvailabilityInterface, AvailabilityRange } from '@/pages/dashboard';
import { useAxios } from './useAxios';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

const useAvailability = ({ personnelId }: { personnelId: string }) => {
  const { AxiosPrivate } = useAxios();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [numMonths, setNumMonths] = useState<number>(3);

  const [availability, setAvailability] = useState<AvailabilityInterface[]>([]);
  const [availabilityQuery, setAvailabilityQuery] = useState<DateRange>({
    from: new Date(currentYear, currentMonth, 1),
    to: new Date(currentYear, currentMonth + numMonths, 0),
  });

  const getAvailability = async () => {
    const { data } = await AxiosPrivate.get(
      encodeURI(
        `/personnel/${personnelId}/availability?from=${format(availabilityQuery.from!, 'yyyy-MM-dd')}&to=${format(availabilityQuery.to!, 'yyyy-MM-dd')}`,
      ),
    );

    setAvailability(data);
  };

  useEffect(() => {
    (async () => {
      await getAvailability();
    })();
  }, [availabilityQuery]);
  const deleteAvailability = async (dates: AvailabilityRange) => {
    await AxiosPrivate.patch(
      encodeURI(`/personnel/${personnelId}/availability`),
      dates,
    );
  };
  const saveAvailability = async (dates: AvailabilityRange) => {
    await AxiosPrivate.patch(
      encodeURI(`/personnel/${personnelId}/availability`),
      dates,
    );
    await getAvailability();
  };

  return {
    availability,
    availabilityQuery,
    numMonths,
    handleQuery: (range: DateRange) => setAvailabilityQuery(range),
    handleChangeNumMonths: (num: number) => setNumMonths(num),
    saveAvailability,
    deleteAvailability,
  };
};

export default useAvailability;
