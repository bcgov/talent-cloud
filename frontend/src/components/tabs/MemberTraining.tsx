import type { Member } from '@/common';
import { Banner } from '@/components/ui/Banner';
import { BannerType } from '../../common/enums/banner-enum';
import { differenceInDays } from 'date-fns';
import { offsetTimezoneDate } from '../../utils';
import { MemberItemList } from '../profile';

export const MemberTraining = ({ member }: { member: Member }) => {
  return (
    <section>
      {!member.chipsProfileMissing ? (
        <div className="flex flex-col gap-4">
          <Banner
            type={BannerType.INFO}
            content={
              <>
                <div className="flex items-center">
                  {member.chipsLastPing && (
                    <span className="text-sm text-gray-600">
                      Profile data synced{' '}
                      {differenceInDays(
                        new Date(),
                        offsetTimezoneDate(member.chipsLastPing),
                      )}{' '}
                      days ago
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <p className="text-sm text-defaultGray">
                    Note that the courses displayed here represent only a subset of
                    the courses you have completed within the BC Public Service
                    Learning System. This list may not include all courses you have
                    taken in the system, and courses completed outside of it will not
                    be recorded here.
                  </p>
                </div>
              </>
            }
          />
          <MemberItemList
            columns={[
              {
                name: 'Course',
                key: 'courseId',
                size: '1/6',
              },
              {
                name: 'Title',
                key: 'courseTitle',
                size: '1/2',
              },
              {
                name: 'Date Completed',
                key: 'completedDate',
                size: '1/3',
              },
            ]}
            data={member.chipsTrainingData.map((t) => ({
              id: t.courseId,
              courseId: t.courseId,
              courseTitle: t.courseTitle,
              completedDate: t.completedDate,
            }))}
          />
        </div>
      ) : (
        <Banner
          type={BannerType.ERROR}
          content={
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold text-errorRed">
                  Government Profile Syncing Errors Detected
                </span>
              </div>
              <div className="mt-1">
                <p className="text-sm text-errorRed">
                  Your profile cannot be found in the government system.
                </p>
              </div>
            </>
          }
        />
      )}
    </section>
  );
};
