import { ButtonTypes } from '@/common';
import { Button, DialogUI } from '@/components/ui';

export const RecommitmentConfirmation = ({
  open,
  onClose,
  onConfirm,
  handleOpen,
}: {
  open: boolean;
  onClose: () => void;
  handleOpen: () => void;
  onConfirm: (e: React.MouseEvent) => void;
}) => {
  return (
    <DialogUI
      open={open}
      onClose={onClose}
      handleOpen={handleOpen}
      title={'Confirm Review'}
      style={'w-3/4 lg:w-1/3 xl:w-1/4'}
    >
      <div className="text-center flex flex-col items-center justify-center gap-y-8 p-12">
        <div>
          Are you sure you want to reinitiate recommitment for this member outside of
          the recommitment cycle?
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
