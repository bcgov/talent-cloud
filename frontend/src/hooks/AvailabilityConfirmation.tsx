import { ButtonTypes } from '@/common';
import { Button } from '@/components/ui';
import { offsetTimezoneDate } from '@/utils';
import { format } from 'date-fns';

export const AvailabilityConfirmation = ({
  availabilityQuery,
  openConfirmAvailability,
  handleConfirmAvailability,
}: {
  availabilityQuery: { to: string; from: string };
  openConfirmAvailability: () => void;
  handleConfirmAvailability: (date: Date) => void;
}) => {
  return (
    <div className="px-8 py-4 flex flex-col justify-between space-y-12">
      <div className="flex flex-col justify-between space-y-12">
        <p className="text-xs">
          Are you sure you want to send to your coordinator updates to your
          availability between{' '}
          <strong>
            {format(offsetTimezoneDate(availabilityQuery.from), 'MMM dd, yyyy')} and{' '}
            {format(offsetTimezoneDate(availabilityQuery.to), 'MMM dd, yyyy')}?
          </strong>
        </p>

        <p className="text-xs">
          {
            'Once confirmed, all the unmarked dates within the date range above will appear as "available" (green) to your coordinator.'
          }
        </p>
      </div>

      <div className="w-full border-t border-gray-400">
        <div>
          <div className="flex flex-row space-x-8 justify-end pt-4">
            <Button
              onClick={openConfirmAvailability}
              text="Cancel"
              variant={ButtonTypes.PRIMARY}
            />
            <Button
              onClick={() =>
                handleConfirmAvailability(new Date(availabilityQuery.to))
              }
              text="Confirm"
              variant={ButtonTypes.TERTIARY}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
