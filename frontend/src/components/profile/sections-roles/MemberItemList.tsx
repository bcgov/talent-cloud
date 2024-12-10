import { Chip } from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/outline';

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
  removeRow,
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
  removeRow?: (id: number | string) => void;
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
                    {c.key === 'remove' && !!removeRow && (
                      <button
                        className="flex items-center gap-2 px-3 py-1 border border-primaryBlue text-primaryBlue rounded-none text-sm"
                        onClick={() => removeRow(row.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                        Remove
                      </button>
                    )}
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
