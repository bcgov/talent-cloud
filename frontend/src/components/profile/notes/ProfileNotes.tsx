import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

import type { Personnel } from '@/common';
import { Role } from '@/common';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { classes } from '@/components/filters/classes';
import { DialogUI } from '@/components/ui';
import { EditNotes } from './EditNotes';

export const ProfileNotes = ({
  personnel,
  updatePersonnel,
  role,
}: {
  role?: Role;
  personnel: Personnel;

  updatePersonnel: (props: Partial<Personnel>) => void;
}) => {
  const [open, setOpen] = useState(true);
  const [openEditNotes, setOpenEditNotes] = useState(false);
  const [openEditCoordinatorNotes, setOpenEditCoordinatorNotes] = useState(false);
  const handleOpenEditNotes = () => {
    setOpenEditNotes(!openEditNotes);
  };

  const handleOpenEditCoordinatorNotes = () => {
    setOpenEditCoordinatorNotes(!openEditCoordinatorNotes);
  };

  return (
    <>
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
      <DialogUI
        open={openEditCoordinatorNotes}
        onClose={handleOpenEditCoordinatorNotes}
        handleOpen={handleOpenEditCoordinatorNotes}
        title={'Edit Coordinator Notes'}
        style={'lg:w-2/3 xl:w-1/2'}
      >
        <EditNotes
          name={'coordinatorNotes'}
          label="Coordinator Notes"
          notes={{ coordinatorNotes: personnel?.coordinatorNotes ?? '' }}
          onSubmit={updatePersonnel}
          handleClose={handleOpenEditCoordinatorNotes}
        />
      </DialogUI>

      <DialogUI
        open={openEditNotes}
        onClose={handleOpenEditNotes}
        handleOpen={handleOpenEditNotes}
        title={'Edit Notes'}
        style={'lg:w-2/3 xl:w-1/2'}
      >
        <EditNotes
          name={'logisticsNotes'}
          label="Notes"
          notes={{ logisticsNotes: personnel?.logisticsNotes ?? '' }}
          onSubmit={updatePersonnel}
          handleClose={handleOpenEditNotes}
        />
      </DialogUI>
    </>
  );
};
