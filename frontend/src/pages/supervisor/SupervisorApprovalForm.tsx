import { useState } from 'react';
import type { Program } from '../../common';
import { ButtonTypes } from '../../common';
import { RecommitmentStatus } from '../../common/enums/recommitment-status';
import { Button, DialogUI, Form } from '../../components';
import {
  declineFormFields,
  supervisorDeclinedValidation,
} from '../../components/supervisor/constants';
import { CheckIcon } from '../../components/ui/Icons';
import { SupervisorReason } from '../../common/enums/supervisor-decision.enum';
import { useAxios } from '../../hooks/useAxios';

export const SupervisorApprovalForm = ({
  year,
  memberId,
  personnelId,
  program,
  status,
  handleShowSuccessBanner,
  handleRefetch,
  name,
}: {
  memberId: string;
  status: RecommitmentStatus;
  year: number;
  personnelId: string;
  program: Program;
  handleRefetch: () => void;
  handleShowSuccessBanner: (banner: boolean) => void;

  name: string;
}) => {
  const [selectedStatus, setStatus] = useState<RecommitmentStatus>();

  const [supervisorDeclinedReason, setSupervisorDeclinedReason] =
    useState<SupervisorReason>();

  const [fields, setFields] = useState(declineFormFields);

  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const { AxiosPrivate } = useAxios();

  const submit = async (status?: RecommitmentStatus) => {
    const values = {
      program,
      year: year,
      status: status ?? selectedStatus,
      reason: supervisorDeclinedReason ?? '',
    };

    try {
      await AxiosPrivate.patch(`/recommitment/${personnelId}`, {
        [program]: values,
      });
      setShowDeclineModal(false);
      handleShowSuccessBanner(true);
      handleRefetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectReason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSupervisorDeclinedReason(
      SupervisorReason[e.target.value as keyof typeof SupervisorReason],
    );
    if (e.target.value === SupervisorReason.OTHER) {
      setFields((prev) => ({
        ...prev,
        comments: {
          name: 'comments',
          label: 'Additional Comments',
          type: 'textarea',
          required: true,
          error: '',
          span: 'col-span-2',
          value: 'comments',
          placeholder: 'If you selected “Other”, please provide more details here.',
        },
      }));
    }
  };

  return (
    <div className="flex flex-col gap-y-1 lg:gap-y-0 lg:flex-row">
      <div className="flex flex-row gap-x-4 pr-12">
        <select
          disabled={status !== RecommitmentStatus.MEMBER_COMMITTED}
          className={[
            'rounded-sm  outline-none w-40 text-sm ',
            status !== RecommitmentStatus.MEMBER_COMMITTED
              ? 'bg-gray-200 border-none outline-none text-gray-500 '
              : 'text-gray-600 bg-white border-1.5 border-gray-400',
          ].join(', ')}
          onChange={(e) => {
            setStatus(e.target.value as RecommitmentStatus);
          }}
        >
          <option value="" className="text-sm">
            {status === RecommitmentStatus.SUPERVISOR_APPROVED
              ? 'Approved'
              : status === RecommitmentStatus.SUPERVISOR_DENIED
                ? 'Declined'
                : 'Select'}
          </option>
          <option className="text-sm" value={RecommitmentStatus.SUPERVISOR_APPROVED}>
            Approve
          </option>
          <option className="text-sm" value={RecommitmentStatus.SUPERVISOR_DENIED}>
            Decline
          </option>
        </select>
      </div>

      {status === RecommitmentStatus.SUPERVISOR_APPROVED ? (
        <div className="flex flex-row text-success items-center space-x-2">
          <CheckIcon /> <span className="text-sm">Submitted!</span>
        </div>
      ) : status === RecommitmentStatus.SUPERVISOR_DENIED ? (
        <Button
          variant={ButtonTypes.TERTIARY}
          text={'Unlock'}
          onClick={() => {
            submit(RecommitmentStatus.MEMBER_COMMITTED);
          }}
        />
      ) : (
        <Button
          disabled={
            !selectedStatus || status !== RecommitmentStatus.MEMBER_COMMITTED
          }
          variant={ButtonTypes.TERTIARY}
          text={'Submit'}
          onClick={() =>
            selectedStatus === RecommitmentStatus.SUPERVISOR_DENIED
              ? setShowDeclineModal(true)
              : submit()
          }
        />
      )}
      <DialogUI
        open={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        handleOpen={() => setShowDeclineModal(true)}
        title={'Reason for Declining CORE Recommitment'}
      >
        <div className="flex flex-col max-w-screen-sm">
          <div>
            <p className="px-8 pt-8 pb-4">
              Please provide a reason why you have declined this member from
              returning to CORE this year.
            </p>
          </div>
          <div className="text-info bg-infoBannerLight mx-8">
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
              reason: '',
              comments: '',
              year: year,
              memberID: memberId,
              program: program,
              memberName: name,
            }}
            onSubmit={() => submit(RecommitmentStatus.SUPERVISOR_DENIED)}
            validationSchema={supervisorDeclinedValidation}
            handleClose={() => setShowDeclineModal(false)}
            fields={{
              ...fields,
              reason: {
                ...declineFormFields.reason,
                onChange: handleSelectReason,
              },
            }}
          />
        </div>
      </DialogUI>
    </div>
  );
};
