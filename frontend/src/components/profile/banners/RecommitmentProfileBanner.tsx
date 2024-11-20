import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';

import type { Personnel } from '@/common';
import { Program } from '@/common';

type BannerProps = {
  personnel: Personnel;
  program?: Program;
};

// TODO - make me look nice
export const RecommitmentProfileBanner = ({ personnel, program }: BannerProps) => {
  return (
    <div className="xl:mr-12">
      <div className="px-6 pb-12 bg-white pt-4">
        <Banner
          content={
            <p className="flex flex-col text-sm text-warningDark">
              <span className="font-bold">Recommitment Banner</span>
              {(program === Program.BCWS || program === Program.ALL) && (
                <span className="pt-2">
                  BCWS Status: {personnel.recommitment?.bcws}
                </span>
              )}
              {(program === Program.EMCR || program === Program.ALL) && (
                <span className=" pt-2">
                  EMCR Status: {personnel.recommitment?.emcr}
                </span>
              )}
            </p>
          }
          onClick={() => alert('Complete Review')}
          buttonText={'Complete Review'}
          type={BannerType.INFO}
        />
      </div>
    </div>
  );
};
