import { ButtonTypes } from '@/common';
import { Button } from '@/components/ui';

export const ReviewApplicant = ({
  onClick,
  onClose,
}: {
  onClick: () => void;
  onClose: () => void;
}) => {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-y-8 p-12">
      <div>
        Are you sure you have reviewed this applicant and want to change their member
        status to active?{' '}
      </div>
      <div>Once confirmed you cannot undo this action.</div>

      <div className="flex flex-row items-center justify-center gap-x-8">
        <Button
          variant={ButtonTypes.TERTIARY}
          text="Confirm"
          type="button"
          onClick={onClick}
        />
        <Button
          variant={ButtonTypes.SECONDARY}
          type="button"
          onClick={onClose}
          text="Cancel"
        />
      </div>
    </div>
  );
};
