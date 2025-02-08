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
  const [supervisorDeclinedReason, setSupervisorDeclinedReason] =
    useState<SupervisorReason>();

  const [fields, setFields] = useState(declineFormFields);

  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const { AxiosPrivate } = useAxios();

  const handleShowDeclineModal = () => {
    setShowDeclineModal(!showDeclineModal);
  };

  const [value, setValue] = useState<RecommitmentStatus | string>(status);

  const submit = async (selectedStatus: RecommitmentStatus) => {
    const values = {
      program,
      year: year,
      status: selectedStatus,
      reason: supervisorDeclinedReason ?? '',
    };

    try {
      await AxiosPrivate.patch(`/recommitment/${personnelId}`, {
        [program]: values,
      });

      if (selectedStatus === RecommitmentStatus.SUPERVISOR_DENIED) {
        handleShowDeclineModal();
      }

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
          hidden: false,
          error: '',
          span: 'col-span-2',
          value: 'comments',
          placeholder: 'If you selected “Other”, please provide more details here.',
        },
      }));
    } else {
      setFields((prev) => ({
        ...prev,
        comments: {
          name: 'comments',
          label: 'Additional Comments',
          type: 'textarea',
          required: false,
          hidden: true,
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
      <div className="flex flex-row gap-x-4 pr-12 relative">
        <select
          disabled={status !== RecommitmentStatus.MEMBER_COMMITTED}
          onChange={(e) => setValue(e.target.value as RecommitmentStatus)}
          className={[
            'rounded-sm  outline-none w-40 text-sm ',
            status !== RecommitmentStatus.MEMBER_COMMITTED
              ? 'bg-gray-200 border-none outline-none text-gray-500 '
              : 'text-gray-600 bg-white border-1.5 border-gray-400',
          ].join(', ')}
          value={value}
        >
          <option value="">Select</option>
          <option value={RecommitmentStatus.SUPERVISOR_APPROVED}>Approve</option>
          <option value={RecommitmentStatus.SUPERVISOR_DENIED}>Decline</option>
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
            setValue('');
            submit(RecommitmentStatus.MEMBER_COMMITTED);
          }}
        />
      ) : (
        <Button
          disabled={status !== RecommitmentStatus.MEMBER_COMMITTED}
          variant={ButtonTypes.TERTIARY}
          text={'Submit'}
          onClick={() => {
            if (value === RecommitmentStatus.SUPERVISOR_DENIED) {
              setFields((prev) => ({
                ...prev,
                comments: {
                  name: 'comments',
                  label: 'Additional Comments',
                  type: 'textarea',
                  required: false,
                  hidden: true,
                  error: '',
                  span: 'col-span-2',
                  value: 'comments',
                  placeholder:
                    'If you selected “Other”, please provide more details here.',
                },
              }));
              setShowDeclineModal(true);
            } else value && submit(RecommitmentStatus.SUPERVISOR_APPROVED);
          }}
        />
      )}
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
