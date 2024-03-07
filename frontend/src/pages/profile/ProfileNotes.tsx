import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import type { Personnel } from '../dashboard';
import { Role } from '@/common';
import { useRole } from '@/hooks';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const ProfileNotes = ({
  personnel,
  handleOpenEditNotes,
  handleOpenEditCoordinatorNotes,
}: {
  personnel: Personnel;
  handleOpenEditNotes: () => void;
  handleOpenEditCoordinatorNotes: () => void;
}) => {
  const { role } = useRole();
  const [open, setOpen] = useState(true);

  return (
    <section className="bg-white pb-32 ">
      <div className="pt-6 lg:px-10">
        <Accordion
          className="border-2 border-slate-950"
          placeholder={'Notes'}
          open={open}
          icon={
            open ? (
              <ChevronUpIcon className="cursor-pointer  h-8 w-5 fill-[#606060]" />
            ) : (
              <ChevronDownIcon className="cursor-pointer h-8 w-5 fill-[#606060]" />
            )
          }
        >
          <AccordionHeader
            placeholder={'Notes'}
            className="bg-grayBackground px-8"
            onClick={() => setOpen(!open)}
          >
            <div className=" w-full justify-between items-center flex lg:flex-row">
              <span>Notes</span>
              <button
                onClick={handleOpenEditNotes}
                className="z-20 flex text-primaryBlue flex-row items-center"
              ></button>
            </div>
          </AccordionHeader>

          <AccordionBody>
            <div className="py-5 px-8 h-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 pt-4 gap-24`}>
                <div>
                  <div className="py-2">
                    <div className="flex flex-row items-center space-x-2">
                      <h5>Notes</h5>
                      <button onClick={handleOpenEditNotes}>
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <textarea
                      disabled
                      value={personnel.logisticsNotes}
                      className="w-full resize-auto border-none outline-none min-h-[300px]"
                    />
                  </div>
                </div>

                {role === Role.COORDINATOR && (
                  <div>
                    <div className="py-2">
                      <div className="flex flex-row items-center space-x-2">
                        <h5>Coordinator Notes</h5>
                        <button onClick={handleOpenEditCoordinatorNotes}>
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <textarea
                        className="w-full resize-none border-none outline-none min-h-[300px]"
                        disabled
                        value={personnel.coordinatorNotes}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </section>
  );
};

export default ProfileNotes;
