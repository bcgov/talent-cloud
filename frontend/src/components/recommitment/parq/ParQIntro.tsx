export const ParQIntro = () => (
  <div className="px-8">
    <h5 className="text-md font-semibold text-primaryBlue">
      Complete the Physical Activity Readiness Questionnaire for Everyone (PAR-Q+)
    </h5>
    <p className="text-sm pt-2 pb-4">
      To be an active member of <span className="font-bold">BCWS</span>, a PAR-Q+
      response is required. Your PAR-Q+ response will inform your coordinator of any
      health concerns, allowing them to make necessary accommodations for your
      deployment. Your supervisor may be contacted if any accommodations affecting
      your health are needed.
    </p>

    <div className="bg-yellow-200 p-2">
      <p className="text-sm font-semibold">Important Notice</p>
      <ul className="text-sm list-disc px-4">
        <li>
          At the end of the PAR-Q+, please download a copy of your response and email
          it to your Fire Centre. Your PAR-Q+ responses will NOT be saved in CORE
          Team once this step is completed.
        </li>
        <li>
          A witness signature is needed to complete the PAR-Q+ process. Please make
          sure you have found someone to be your witness before proceeding.
        </li>
        <li>
          Exiting this window at any point during the recommitment process will NOT
          save your progress. You will have to restart the entire recommitment
          process, so please exit wisely.{' '}
        </li>
      </ul>
    </div>

    <div className="py-6">
      <p className="text-md font-semibold">
        The PAR-Q+ consists of the following sections:
      </p>
      <ol className="text-sm list-decimal px-4">
        <li>General health questions</li>
        <li>Follow-up questions about your medical condition(s)</li>
        <li>Participant declaration and response download</li>
      </ol>
    </div>

    <div className="p-4 bg-blue-300">
      <p className="text-md font-semibold text-blue-800">
        Recommendations for any Medical Condition(s):
      </p>
      <p className="text-sm text-blue-600">
        If you answered <span className="font-semibold">YES</span> to{' '}
        <span className="font-semibold">one or more of the follow-up questions</span>{' '}
        about your medical condition, you should seek further information before
        becoming more physically active or engaging in a fitness appraisal. You
        should complete the specially designed online screening and exercise
        recommendations program - the{' '}
        <span className="font-bold">ePARmed-X+ at www.eparmedx.com</span> and/or
        visit a qualified exercise professional (CSEP-CEP) to work through the
        ePARmed-X+ and for further information.
      </p>
      <p className="text-md font-semibold text-blue-800 pt-6">
        Delay becoming Active if:
      </p>
      <ol className="text-sm list-disc px-4 text-blue-600">
        <li>
          You are not feeling well because of a temporary illness such as a cold or
          fever - wait until you feel better
        </li>
        <li>
          You are pregnant - talk to your health care practitioner, your physician, a
          qualified exercise professional, and/or complete the{' '}
          <span className="font-bold">ePARmed-X+ at www.eparmedx.com</span> before
          becoming more physically active
        </li>
        <li>
          Your health changes - talk to your doctor or qualified exercise
          professional (CSEP-CEP) before continuing with any physical activity
          program.
        </li>
      </ol>
    </div>
  </div>
);
