export const components = [
  {
    name: 'programCommitment',
    label: 'Program Commitment',
    type: 'accordion',
    required: false,
    placeholder: '',
    component: (
      <>
        <p>
          {
            "Approval into both streams does not guarantee deployment. If you received a deployment request, you may be required to be prepared for deployment on short notice and potentially for extended periods. This may involve travelling to an activation that's located anywhere in the province, and spending time away from family and other personal obligations. However, if you have any personal or work commitments that you must attend at the time of a deployment, you can choose to turn down a deployment opportunity."
          }
        </p>
        <br />
        <p>
          {
            'You are expected to have a high level of adaptability, commitment, and professionalism in all of your endeavours for both EMCR and BCWS CORE Team.'
          }
        </p>
      </>
    ),
  },
  {
    name: 'applicationRequirements',
    label: 'Application Requirements',
    type: 'accordion',
    required: false,
    placeholder: '',
    component: (
      <>
        <p>
          {
            'To ensure a smooth application process, please make sure you complete and submit the following requirements relevant to the program(s) you are applying to (you can click on the following links to learn more or access the document):'
          }
        </p>
        <br />

        <p className="font-bold">EMCR Requirements</p>
        <div className="py-4 px-4">
          <ul className="list-disc list-inside text-darkGrey text-base font-normal">
            <li>Supervisor Approval for EMCR</li>
            <li>
              <a href="#" target="_blank" className="text-linkBlue hover:underline">
                Incident Command System (ICS) Training
              </a>
            </li>
          </ul>
        </div>
        <br />
        <p className="font-bold">BCWS Requirements</p>
        <div className="py-4 px-4">
          <ul className="list-disc list-inside text-darkGrey text-base font-normal">
            <li>
              <a href="#" target="_blank" className="text-linkBlue hover:underline">
                Supervisor Approval for BCWS
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="text-linkBlue hover:underline">
                Intro to CORE Online Orientation (Video)
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="text-linkBlue hover:underline">
                Willingness Statement
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="text-linkBlue hover:underline">
                {'Physical Activity Readiness Questionnaire for Everyone (PAR-Q+)'}
              </a>
              <span>*</span>
            </li>
          </ul>
        </div>
        <br />
        <br />
        <p>
          {
            '*Please make sure you have completed, signed and submitted your BCWS PAR-Q+ to your Wildfire regional contact after submitting this application.'
          }
        </p>
        <br />
        <p>
          <span className="font-bold">
            {"Don't know which Fire Centre email to submit your documents to?"}
          </span>{' '}
          {'You can find your corresponding Fire Centre based on your home location'}
          at{' '}
          <a href="#" target="_blank" className="text-linkBlue hover:underline">
            {'Where is my closest Fire Centre?'}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    name: 'whatToExpectDuringDeployment',
    label: 'What to expect during deployment',
    type: 'accordion',
    required: false,
    placeholder: '',
    component: (
      <>
        <p>
          {
            'You may be asked to do multiple deployments as required by the event. However, you may accept or decline a request depending on your own availability, vacation leave, and/or regular work commitments.'
          }
        </p>
        <br />
        <br />
        <p className="font-bold">
          {'Deployment Timeframes for each program stream:'}
        </p>
        <div className="py-4 px-4">
          <ul className="list-disc list-inside text-darkGrey text-base font-normal">
            <li>
              <span className="font-bold">EMCR CORE Team:</span>You can be deployed
              for up <span className="font-bold">to 10 consecutive days</span>,
              followed by a
              <span className="font-bold">mandatory two-day rest period</span> before
              potential redeployment.
            </li>
            <li>
              <span className="font-bold">BCWS CORE Team:</span> You can be deployed
              for
              <span className="font-bold">up to 14 consecutive days</span>at a time
              (including travel duration).
            </li>
          </ul>
        </div>
      </>
    ),
  },
];
