import type { Personnel } from '@/common';
import { ButtonTypes, Program } from '@/common';
import { RecommitmentStatus } from '@/common/enums/recommitment-status';
import { Button, DialogUI, Form } from '@/components/ui';
import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { SupervisorReason } from '@/common/enums/supervisor-decision.enum';
import { declineFormFields } from './constants';
import { CheckIcon } from '../ui/Icons';

export const ApprovalCell = ({
  personnel,
  program,
  handleShowBanner,
  year,
}: {
  personnel: Personnel;
  program: Program;
  handleShowBanner: () => void;
  year: number;
}) => {
  const [supervisorDeclinedReason, setSupervisorDeclinedReason] =
    useState<SupervisorReason>();

  const [status, setStatus] = useState<RecommitmentStatus>();

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(RecommitmentStatus[e.target.value as keyof typeof RecommitmentStatus]);
  };

  const [fields, setFields] = useState(declineFormFields);

  const handleSelectReason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSupervisorDeclinedReason(
      SupervisorReason[e.target.value as keyof typeof SupervisorReason],
    );
    if (e.target.value === SupervisorReason.OTHER) {
      setFields((prev) => ({
        ...prev,
        comments: {
          name: 'comments',
          label: 'Comments',
          type: 'textarea',
          required: true,
          error: '',
          span: 'col-span-2',
          value: 'comments',
        },
      }));
    }
  };

  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const handleShowDeclineModal = () => {
    setShowDeclineModal(!showDeclineModal);
  };

  const { AxiosPrivate } = useAxios();

  const handleSubmitDenial = async (values: {
    status?: RecommitmentStatus;
    reason?: SupervisorReason;
    comments?: string;
  }) => {
    const reason =
      values.reason === SupervisorReason.OTHER
        ? `${values.reason}: ${values.comments}`
        : values.reason;
    try {
      await AxiosPrivate.patch(`/supervisor/personnel/${personnel.id}`, {
        status: values.status,
        program,
        reason,
        year,
      });
      handleShowDeclineModal();
      handleShowBanner();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitApproval = async () => {
    try {
      await AxiosPrivate.patch(`/supervisor/personnel/${personnel.id}`, {
        status,
        program,
        year,
      });
      handleShowBanner();
    } catch (e) {
      console.log(e);
    }
  };

  const disabled =
    (program === Program.BCWS &&
      personnel.recommitment?.bcws !== RecommitmentStatus.MEMBER_COMMITTED &&
      personnel.recommitment?.bcws !== RecommitmentStatus.SUPERVISOR_DENIED) ||
    (program === Program.EMCR &&
      personnel.recommitment?.emcr !== RecommitmentStatus.MEMBER_COMMITTED &&
      personnel.recommitment?.emcr !== RecommitmentStatus.SUPERVISOR_DENIED);

  const revertDecision = async () => {
    try {
      await AxiosPrivate.patch(`/supervisor/personnel/${personnel.id}`, {
        status: RecommitmentStatus.MEMBER_COMMITTED,
        program,
        year,
      });
      handleShowBanner();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="flex flex-row gap-x-4 pr-12">
        <select
          disabled={
            disabled ||
            personnel.recommitment?.[
              program as keyof typeof personnel.recommitment
            ] === RecommitmentStatus.SUPERVISOR_DENIED
          }
          className={[
            'rounded-sm  outline-none w-40 text-sm ',
            disabled
              ? 'bg-dark-300 border-none outline-none text-gray-500 '
              : 'text-gray-600 bg-white border-1.5 border-gray-400',
          ].join(', ')}
          onChange={handleChangeStatus}
        >
          <option value="" className="text-sm">
            Select
          </option>
          <option className="text-sm" value={RecommitmentStatus.SUPERVISOR_APPROVED}>
            Approve
          </option>
          <option className="text-sm" value={RecommitmentStatus.SUPERVISOR_DENIED}>
            Decline
          </option>
        </select>
        {personnel?.recommitment?.[
          program as keyof typeof personnel.recommitment
        ] === RecommitmentStatus.SUPERVISOR_APPROVED ? (
          <div className="flex flex-row text-leaf-700 items-center space-x-2">
            <CheckIcon /> <span className="text-sm">Submitted!</span>
          </div>
        ) : personnel?.recommitment?.[
            program as keyof typeof personnel.recommitment
          ] === RecommitmentStatus.SUPERVISOR_DENIED ? (
          <Button
            // disabled={disabled || !status}
            variant={ButtonTypes.TERTIARY}
            text={'Unlock'}
            onClick={revertDecision}
          />
        ) : (
          <Button
            disabled={disabled || !status}
            variant={ButtonTypes.TERTIARY}
            text={'Submit'}
            onClick={
              status === RecommitmentStatus.SUPERVISOR_DENIED
                ? handleShowDeclineModal
                : handleSubmitApproval
            }
          />
        )}
      </div>
      <DialogUI
        open={showDeclineModal}
        onClose={handleShowDeclineModal}
        handleOpen={handleShowDeclineModal}
        title={'Reason for Declining CORE Recommitment'}
      >
        <div className="flex flex-col max-w-screen-sm">
          <div>
            <p className="px-8 pt-8 pb-4">
              Please provide a reason why you have declined this member from
              returning to CORE this year.
            </p>
          </div>
          <div className="text-blue-800 bg-blue-200 mx-8">
            <p className="px-4 py-2">
              While it is expected that you have previously discussed the possibility
              of recommitment with your member,{' '}
              <span className="font-bold">
                your reason for declining their recommitment will only be visible to
                their coordinators once you click “Submit Reason”.
              </span>
            </p>
          </div>
          <Form
            initialValues={{
              memberName: personnel.firstName + ' ' + personnel.lastName,
              memberID: personnel.employeeId,
              program: program,
              reason: supervisorDeclinedReason,
              comments: '',
              status: status,
              year: 2025,
            }}
            onSubmit={handleSubmitDenial}
            validationSchema={undefined}
            handleClose={handleShowDeclineModal}
            fields={{
              ...fields,
              reason: { ...declineFormFields.reason, onChange: handleSelectReason },
            }}
          />
        </div>
      </DialogUI>
    </>
  );
};
