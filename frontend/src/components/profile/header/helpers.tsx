import type { Personnel } from '@/common';
import { Program } from '@/common';
import { PersonnelStatus } from '@/components/ui';

export function HorizontalLine() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth={1}
      stroke="gray"
      className="h-10 w-10"
    >
      <path id="triangle" d="M1 5 L0 35" />
    </svg>
  );
}
export const renderStatus = (personnel: Personnel) => {
  if (
    personnel.bcws?.status &&
    personnel.emcr?.status &&
    personnel.bcws.status === personnel.emcr.status
  ) {
    return <PersonnelStatus status={personnel?.bcws.status} />;
  } else if (
    personnel.bcws?.status &&
    personnel.emcr?.status &&
    personnel.bcws.status !== personnel.emcr.status
  ) {
    return (
      <div>
        <PersonnelStatus status={personnel?.emcr.status} program={Program.EMCR} />
        <PersonnelStatus status={personnel?.bcws.status} program={Program.BCWS} />
      </div>
    );
  } else if (personnel.bcws?.status && !personnel.emcr?.status) {
    <PersonnelStatus status={personnel?.bcws.status} />;
  } else if (personnel.emcr?.status && !personnel.bcws?.status) {
    <PersonnelStatus status={personnel?.emcr.status} />;
  }
};
