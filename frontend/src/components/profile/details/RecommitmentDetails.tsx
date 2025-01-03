import { Fragment, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import DetailsSection from './DetailsSection';
import usePersonnel from '@/hooks/usePersonnel';
import { useRoleContext } from '@/providers';
import { datePST } from '@/utils';
import { RecommitmentStatusLabel } from '@/common/enums/recommitment-status';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';

export const RecommitmentDetails = () => {
  const { personnel } = usePersonnel();
  const { program } = useRoleContext();
  const {recommitmentCycle} = useRecommitmentCycle()
  const [open, setOpen] = useState(true);

  const recommitment = personnel?.recommitment?.find(itm=>itm.program === program)

  const handleOpen = (open: boolean) => setOpen(!open);

  return (
    <>
      <section className="bg-white">
        <div className="pt-6">
          <Accordion
            className="border-2 border-slate-950"
            placeholder={'Recommittment Details'}
            open={open}
            icon={
              open ? (
                <ChevronUpIcon className="cursor-pointer h-8 w-5 fill-[#606060]" />
              ) : (
                <ChevronDownIcon className="cursor-pointer h-8 w-5 fill-[#606060]" />
              )
            }
          >
            <AccordionHeader
              placeholder={'Member Details'}
              className="bg-grayBackground px-8"
              onClick={()=> handleOpen(open)}
            >
              <div className=" w-full justify-between items-center flex lg:flex-row">
                <span>

                    Recommitment   Details
                </span>
                
              </div>
            </AccordionHeader>

            <AccordionBody>
              <Fragment>
                <div className="px-16">
                  
                    <DetailsSection
                      title={''}
                      columns={[
                        {
                          title: 'Upcoming Year',
                          content:
                            recommitmentCycle?.year ? <p>{recommitmentCycle.year}</p> :  '--'
                        },
                        {
                          title: 'Status',
                          content:  <p>{RecommitmentStatusLabel[recommitment?.status as keyof typeof  RecommitmentStatusLabel]}</p> ,
                        },
                        {
                          title: 'Date Recommitted',
                          content: recommitment?.supervisorDecisionDate
                            ? datePST(
                                new Date(
                                    recommitment?.supervisorDecisionDate,
                                ),
                              )
                            : '--',
                        },
                        {
                          title: 'Declined By',
                          content: recommitment?.supervisorIdir ?? '--',
                        },
                        {
                          title: 'Reason for Declining',
                          content:
                          <p>{recommitment?.supervisorReason ?? '--'}</p>,
                        },
                      ]}
                    />
                </div>
                
              </Fragment>
            </AccordionBody>
          </Accordion>
        </div>
      </section>
      
    </>
  );
};
