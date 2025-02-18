import { ButtonTypes } from '@/common';
import { Button, DialogUI } from '@/components/ui';
import { format } from 'date-fns';

export const RecommitmentReinitiationConfirmation = ({
  open,
  reinitiationEndDate,
  onClose,
  onConfirm,
  handleOpen,
}: {
  open: boolean;
  reinitiationEndDate: Date;
  onClose: () => void;
  handleOpen: () => void;
  onConfirm: (e: React.MouseEvent) => void;
}) => {
  return (
    <DialogUI
      open={open}
      onClose={onClose}
      handleOpen={handleOpen}
      title={'Confirm Recommitment Reactivation'}
      style={'w-3/4 lg:w-1/4 xl:w-1/4'}
    >
      <div className="flex flex-col pt-4 pb-4">
        <div className="px-6 pb-20 gap-y-8 flex flex-col">
          <div className="border-t border-dark-400"></div>
          <p className="text-sm text-defaultGray">
            Are you sure you want to restart this member&apos;s recommitment process
            until {format(reinitiationEndDate, 'MMMM dd, yyyy')}?
          </p>
          <p className="text-sm text-defaultGray">
            Once you click &quot;Confirm&quot;, you cannot undo this action.
          </p>
        </div>

        <div className="flex flex-row items-end justify-end gap-x-2 pr-4 pt-3 border-t border-dark-700">
          <Button
            variant={ButtonTypes.SECONDARY}
            type="button"
            onClick={onClose}
            text="Cancel"
          />
          <Button
            variant={ButtonTypes.TERTIARY}
            text="Confirm"
            type="button"
            onClick={onConfirm}
          />
        </div>
      </div>
    </DialogUI>
  );
};
