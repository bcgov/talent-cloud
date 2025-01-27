import { Fragment, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import DetailsSection from './DetailsSection';
import usePersonnel from '@/hooks/usePersonnel';
import { useRoleContext } from '@/providers';
import { datePST } from '@/utils';
import { RecommitmentStatus, RecommitmentStatusLabel } from '@/common/enums/recommitment-status';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import {  Recommitment, RecommitmentCycle } from '@/common';

export const RecommitmentDetails = () => {
  const { personnel } = usePersonnel();
  const { program } = useRoleContext();
  const { recommitmentCycle } = useRecommitmentCycle();
  const [open, setOpen] = useState(true);

  const recommitment: Recommitment | undefined = personnel?.recommitment?.find(
    (itm) => itm.program === program,
  );

  const handleOpen = (open: boolean) => setOpen(!open);
  
  if(!recommitment) return null;
  const getFieldData = (recommitment: Recommitment, recommitmentCycle?: RecommitmentCycle) => {  
  switch(recommitment.status){
    case RecommitmentStatus.SUPERVISOR_APPROVED:
    case RecommitmentStatus.SUPERVISOR_DENIED:
      return {
        supervisor: {title: "Supervisor", content: recommitment.supervisorIdir ? recommitment.supervisorIdir : personnel?.supervisorEmail},
        decisionDate: {title: "Date Recommitted", content: recommitment?.supervisorDecisionDate ? datePST(new Date(recommitment?.supervisorDecisionDate)):'--'},
        status: {title: "Status", content: RecommitmentStatusLabel[recommitment.status]},
        reason: {title: "Supervisor Reason", content: '--'},
        year: {title: "Upcoming Year", content: recommitmentCycle?.year},
      }
    case RecommitmentStatus.MEMBER_DENIED:
      return {
        supervisor: {title: "Supervisor", content: recommitment.supervisorIdir ? recommitment.supervisorIdir : personnel?.supervisorEmail},
        decisionDate: {title: "Date Declined", content: recommitment?.memberDecisionDate ? datePST(new Date(recommitment?.memberDecisionDate)):'--'},
        status: {title: "Status", content: RecommitmentStatusLabel[recommitment.status]},
        reason: {title: "Member Reason", content: '--'},
        year: {title: "Upcoming Year", content: recommitmentCycle?.year},
      }
    case RecommitmentStatus.MEMBER_NO_RESPONSE:
    case RecommitmentStatus.SUPERVISOR_NO_RESPONSE:
      return {
        supervisor: {title: "Supervisor", content: recommitment.supervisorIdir ? recommitment.supervisorIdir : personnel?.supervisorEmail},
        decisionDate: {title: "Date Recommitted", content: '--'},
        status: {title: "Status", content: RecommitmentStatusLabel[recommitment.status]},
        reason: {title: "Reason (if declined/denied)", content: '--'},
        year: {title: "Upcoming Year", content: recommitmentCycle?.year},
      }
    default:
      return {
        supervisor: {title: "Supervisor", content: recommitment.supervisorIdir ? recommitment.supervisorIdir : personnel?.supervisorEmail},
        decisionDate: {title: "Date Recommitted", content: '--'},
        status: {title: "Status", content: RecommitmentStatusLabel[recommitment.status]},
        reason: {title: "Reason (if declined/denied)", content: '--'},
        year: {title: "Upoming Year", content: recommitmentCycle?.year},
      }
  }
}
  const fieldData = getFieldData(recommitment, recommitmentCycle);
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
              onClick={() => handleOpen(open)}
            >
              <div className=" w-full justify-between items-center flex lg:flex-row">
                <span>Recommitment Details</span>
              </div>
            </AccordionHeader>

            <AccordionBody>
              <Fragment>
                <div className="px-16">
                  <DetailsSection
                    title={''}
                    columns={[
                      {
                        title: fieldData.year.title,
                        content: 
                          <p>{fieldData.year.content}</p>
                        
                      },
                      {
                        title: fieldData.status.title,
                        content: (
                          <p>
                            {fieldData.status.content}
                          </p>
                        ),
                      },
                      {
                        title: fieldData.decisionDate.title,
                        content: <p>{fieldData.decisionDate.content}</p>
                      },
                      {
                        title: fieldData.supervisor.title,
                        content: <p>{fieldData.supervisor.content}</p>
                      },
                      {
                        title: fieldData.reason.title,
                        content: <p>{fieldData.reason.content}</p>,
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
