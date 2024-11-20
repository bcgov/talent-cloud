import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import type { RecommitmentCycle } from '@/common';

// TODO - make me look nice
export const RecommitmentDashBanner = ({
  recommitment,
}: {
  recommitment: RecommitmentCycle;
}) => {
  return (
    <div className="xl:mr-12">
      <div className="px-6 pb-12 bg-white pt-4">
        <Banner
          type={BannerType.INFO}
          content={`Recommitment Start Date: ${recommitment?.startDate} / Recommitment End Date: ${recommitment?.endDate}`}
        />
      </div>
    </div>
  );
};
