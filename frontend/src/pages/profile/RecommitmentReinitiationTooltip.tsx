import { ButtonTypes } from '@/common';
import { Button, DialogUI } from '@/components/ui';

export const RecommitmentReinitiationTooltip = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <DialogUI
      open={open}
      onClose={onClose}
      handleOpen={onClose}
      title={'Reactivate Recommitment'}
      style={'w-3/4 lg:w-1/4 xl:w-1/4'}
    >
      <div className="flex flex-col pt-4 pb-4">
        <div className="px-4 pb-12 gap-y-8 flex flex-col">
          <div className="border-t border-dark-400"></div>
          <p className="text-sm text-defaultGray">
            After the recomitment period, your member may contact you to reactivate
            their recommitment if they have missed the recommitment deadline, or
            their supervisor failed to approve their recommitment request within the
            recommitment period. Please click &quot;Restart Recommitment&quot; upon
            the member&apos;s request.
          </p>
          <p className="text-sm text-defaultGray">
            The active-inactive toggle is used for non-recommitment purposes only. Do
            NOT use the toggle to reinitiate a member&apos;s recommitment.
          </p>
        </div>

        <div className="flex flex-row items-end justify-end gap-x-2 pr-4 pt-3 border-t border-dark-700">
          <Button
            variant={ButtonTypes.SECONDARY}
            type="button"
            onClick={onClose}
            text="Close"
          />
        </div>
      </div>
    </DialogUI>
  );
};
