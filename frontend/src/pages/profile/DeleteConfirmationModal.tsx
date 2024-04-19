import { Button } from '@material-tailwind/react';

export const DeleteConfirmContent = ({
  confirmAction,
  handleConfirmModal,
}: {
  confirmAction: () => void;
  handleConfirmModal: () => void;
}) => (
  <div className="py-4 px-4">
    <p className="font-bold text-lg">Delete availability from Calendar?</p>
    <div className="pt-12 flex justify-end">
      <Button
        aria-label="close"
        variant="text"
        className="text-sm text-primaryBlue underline normal-case cursor-pointer"
        onClick={handleConfirmModal}
        placeholder={''}
      >
        Cancel
      </Button>
      <Button
        aria-label="confirm"
        onClick={confirmAction}
        placeholder={''}
        className="normal-case bg-primaryBlue cursor-pointer"
      >
        Confirm Delete
      </Button>
    </div>
  </div>
);
