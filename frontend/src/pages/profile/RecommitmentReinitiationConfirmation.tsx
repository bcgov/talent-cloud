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
      style={'w-3/4 lg:w-1/3 xl:w-1/4'}
    >
      <div className="flex flex-col gap-y-8 pt-4 pb-12 px-8">
        <div>
          Are you sure you want to restart this member&apos;s recommitment process
          until {format(reinitiationEndDate, 'MMMM dd, yyyy')}?
        </div>
        <div>Once confirmed you cannot undo this action.</div>

        <div className="flex flex-row items-center justify-center gap-x-8">
          <Button
            variant={ButtonTypes.TERTIARY}
            text="Confirm"
            type="button"
            onClick={onConfirm}
          />
          <Button
            variant={ButtonTypes.SECONDARY}
            type="button"
            onClick={onClose}
            text="Cancel"
          />
        </div>
      </div>
    </DialogUI>
  );
};
