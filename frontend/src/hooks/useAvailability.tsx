import { useEffect, useState } from 'react';

import type { Availability, AvailabilityRange, SchedulerRowItem } from '@/common';
import { useAxios } from './useAxios';
import { parseAvailability } from './parseAvailability';
import dayjs from 'dayjs';

const useAvailability = ({
  personnelId,
}: {
  personnelId: string;
}): {
  availability: Availability[];
  getAvailability: (from: string, to: string) => Promise<void>;
  availabilityQuery: { from: string; to: string };
  saveConfirmedUntil: (date: Date) => Promise<void>;
  schedulerRows: { [key: string]: SchedulerRowItem[] };
  saveAvailability: (dates: AvailabilityRange) => Promise<void>;
  onChangeAvailabilityQuery: (from: string, to: string) => Promise<void>;
} => {
  const { AxiosPrivate } = useAxios();
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [availabilityQuery, setAvailabilityQuery] = useState<{
    from: string;
    to: string;
  }>({
    from: dayjs().startOf('month').format('YYYY-MM-DD'),
    to: dayjs().endOf('month').format('YYYY-MM-DD'),
  });
  const [schedulerRows, setSchedulerRows] = useState<{
    [key: string]: SchedulerRowItem[];
  }>({});

  const getAvailability = async (from: string, to: string) => {
    const response = await AxiosPrivate.get(
      encodeURI(`/personnel/${personnelId}/availability?from=${from}&to=${to}`),
    );
    setAvailability(response.data);
  };

  const saveAvailability = async (dates: AvailabilityRange) => {
    await AxiosPrivate.patch(
      encodeURI(`/personnel/${personnelId}/availability`),
      dates,
    );
    await getAvailability(availabilityQuery.from, availabilityQuery.to);
  };

  const saveConfirmedUntil = async (date: Date) => {
    console.log(date);
    await AxiosPrivate.patch(
      encodeURI(`/personnel/${personnelId}/availability/confirm`),
      { date: date },
    );
  };
  const onChangeAvailabilityQuery = async (from: string, to: string) => {
    setAvailabilityQuery({ from, to });
    await getAvailability(from, to);
  };

  useEffect(() => {
    const months = parseAvailability(availability);
    setSchedulerRows(months);
  }, [availability]);

  return {
    availability,
    getAvailability,

    saveConfirmedUntil,
    schedulerRows,
    availabilityQuery,
    saveAvailability,
    onChangeAvailabilityQuery,
  };
};

export default useAvailability;
