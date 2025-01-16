import { Chip } from '@material-tailwind/react';

/**
 * Possible Columns:
 * - Section (with choice designation) - `section`
 * - Role Name (BCWS) - `role`
 * - Experience Level (Coordinator / Logistics view) - `experience`
 * - Delete Action (Coordinator / Member view) - `delete`
 */
export const MemberItemList = ({
  preferences,
  columns,
  data,
  displayEmpty = false,
}: {
  preferences?: {
    first?: string;
    second?: string;
    third?: string;
  };
  columns: { key: string; name: string }[];
  data: {
    id: string | number;
    [key: string]: string | number;
  }[];
  displayEmpty?: boolean;
}) => {
  const firstChoiceSection = preferences?.first;
  const secondChoiceSection = preferences?.second;
  // const thirdChoiceSection = preferences?.third;

  const Header = ({ columnNames }: { columnNames: string[] }) => (
    <div className="flex flex-row p-2 bg-grayBackground">
      {columnNames.map((columnName) => (
        <div className={`basis-1/${columnNames.length}`} key={columnName}>
          <span className="text-darkGray font-bold">{columnName}</span>
        </div>
      ))}
    </div>
  );

  const EmptyChoiceSection = ({ section }: { section: string }) => (
    <div className="border-t-2 border-gray-100">
      <div className="flex flex-row py-2 items-center justify-between">
        <div className="basis-1/3 text-darkGray px-2">
          <p className="flex flex-row gap-2">
            {section}
            <Chip
              value={section === firstChoiceSection ? '1st Choice' : '2nd Choice'}
              className={
                section === firstChoiceSection
                  ? 'rounded-full capitalize'
                  : 'rounded-full capitalize bg-infoBannerLight text-ministry'
              }
            />
          </p>
        </div>
      </div>
    </div>
  );

  const NoSkills = () => (
    <div className="flex flex-col py-8 gap-2">
      <div className="text-center">
        <h6 className="text-sm font-bold text-primaryBlue">No Skills Shown</h6>
      </div>
      <div className="text-center">
        <p className="text-sm">You have not indicated any skills here.</p>
      </div>
    </div>
  );  

  return (
    <>
      <section>
        <Header columnNames={columns.map((c) => c.name)} />
        {firstChoiceSection &&
          !data.map((d) => d.section).includes(firstChoiceSection) && (
            <EmptyChoiceSection section={firstChoiceSection} />
          )}
        {secondChoiceSection &&
          !data.map((d) => d.section).includes(secondChoiceSection) && (
            <EmptyChoiceSection section={secondChoiceSection} />
          )}
        {displayEmpty === true && data.length === 0 && <NoSkills />}
        {data.map((row, i) => {
          // sort by section name
          const notFirstRowOfSection =
            i !== 0 && row.section === data[i - 1].section;
          return (
            <>
              <div
                key={i}
                className={`flex flex-row p-2 items-center justify-between ${!notFirstRowOfSection && 'border-t-2 border-gray-100'}`}
              >
                {columns.map((c) => (
                  <div
                    key={c.key}
                    className={`basis-1/${columns.length} text-darkGray`}
                  >
                    {c.key === 'section' && (
                      <p className="flex flex-row gap-2">
                        {notFirstRowOfSection ? '' : row.section}
                        {!notFirstRowOfSection &&
                          row.section === firstChoiceSection && (
                            <Chip
                              value="1st Choice"
                              className="rounded-full capitalize"
                            />
                          )}
                        {!notFirstRowOfSection &&
                          row.section === secondChoiceSection && (
                            <Chip
                              value="2nd Choice"
                              className="rounded-full bg-infoBannerLight text-ministry capitalize"
                            />
                          )}
                      </p>
                    )}
                    {c.key === 'role' && (
                      <p>{row[columns[1].key as keyof typeof row]}</p>
                    )}
                    {/* {c.key === 'experience' && <></>} TODO */}
                    {c.key === 'language' && <p>{row['language']}</p>}
                    {c.key === 'proficiency' && <p>{row['proficiency']}</p>}
                    {c.key === 'tool' && <p>{row['tool']}</p>}
                    {c.key === 'certification' && <p>{row['certification']}</p>}
                    {c.key === 'expiry' && <p>{row['expiry']}</p>}
                  </div>
                ))}
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};
