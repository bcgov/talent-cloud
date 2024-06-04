import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import type { Personnel } from '../dashboard';
import { Role } from '@/common';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { classes } from '@/components/filters/classes';

const ProfileNotes = ({
  personnel,
  handleOpenEditNotes,
  handleOpenEditCoordinatorNotes,
  role,
}: {
  role?: Role;
  personnel: Personnel;
  handleOpenEditNotes: () => void;
  handleOpenEditCoordinatorNotes: () => void;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <section className="bg-white pb-32 ">
      <div className="pt-6">
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
                aria-label="edit notes"
                onClick={handleOpenEditNotes}
                className="z-20 flex text-primaryBlue flex-row items-center"
              />
            </div>
          </AccordionHeader>

          <AccordionBody>
            <div className="py-5 px-8 h-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 pt-4 gap-24`}>
                <div>
                  <div className="py-2">
                    <div className="flex flex-row items-center space-x-2">
                      <p className="subtext ml-2">Notes</p>
                      <button
                        aria-label="open logistics notes"
                        onClick={handleOpenEditNotes}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <textarea
                      disabled
                      placeholder="Please add any additional notes or comments."
                      value={personnel.logisticsNotes}
                      className={classes.menu.textArea}
                    />
                  </div>
                </div>

                {role === Role.COORDINATOR && (
                  <div>
                    <div className="py-2">
                      <div className="flex flex-row items-center space-x-2">
                        <p className="ml-2 subtext">Coordinator Notes</p>
                        <button
                          aria-label="open coordinator notes"
                          onClick={handleOpenEditCoordinatorNotes}
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <textarea
                        placeholder="Please add any additional notes or comments."
                        className={classes.menu.textArea}
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
