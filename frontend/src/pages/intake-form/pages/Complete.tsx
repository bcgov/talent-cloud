// router
import { Routes } from '@/routes';
import { useNavigate } from 'react-router';

// types
import { ButtonTypes } from '@/common';

// ui
import { Button } from '@/components';

export const Complete = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-4">
      <p className="mb-2">
        You can go to your dashboard to view and make changes to your profile by
        clicking “Go to My Dashboard”.
      </p>
      <Button
        text="Go to My Dashboard"
        variant={ButtonTypes.TERTIARY}
        onClick={() => navigate(Routes.MemberProfile)}
      />
    </div>
  );
};
