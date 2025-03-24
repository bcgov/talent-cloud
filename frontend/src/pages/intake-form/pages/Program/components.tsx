export const components = [
  {
    name: 'programCommitment',
    label: 'Program Commitment',
    type: 'accordion',
    required: false,
    placeholder: '',
    component: (
      <>
        <p className="text-sm">
          {
            "Approval into both streams does not guarantee deployment. If you received a deployment request, you may be required to be prepared for deployment on short notice and potentially for extended periods. This may involve travelling to an activation that's located anywhere in the province, and spending time away from family and other personal obligations. However, if you have any personal or work commitments that you must attend at the time of a deployment, you can choose to turn down a deployment opportunity."
          }
        </p>
        <br />
        <p className="text-sm">
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
        <p className="text-sm">
          {
            'To ensure a smooth application process, please make sure you complete and submit the following requirements relevant to the program(s) you are applying to (you can click on the following links to learn more or access the document):'
          }
        </p>
        <br />

        <p className="font-bold text-sm">EMCR Requirements</p>
        <div className="py-4 px-4">
          <ul className="list-disc list-inside text-dark-700 text-sm font-normal">
            <li>Supervisor Approval for EMCR</li>
            <li>
              <a
                href="https://learning.gov.bc.ca/psc/CHIPSPLM/EMPLOYEE/ELM/c/LM_OD_EMPLOYEE_FL.LM_CRS_DTL_FL.GBL?Page=LM_CRS_DTL_FL&#38;Action=U&#38;ForceSearch=Y&#38;LM_CI_ID=19146&#38;"
                target="_blank"
                className="text-linkBlue underline"
                rel="noreferrer"
              >
                Incident Command System (ICS) Training
              </a>
            </li>
          </ul>
        </div>
        <br />
        <p className="font-bold text-sm">BCWS Requirements</p>
        <div className="py-4 px-4">
          <ul className="list-disc list-inside text-dark-700 text-sm font-normal">
            <li>
              <a
                href="https://intranet.gov.bc.ca/bcws/core-team/participating-staff"
                target="_blank"
                className="text-linkBlue underline"
                rel="noreferrer"
              >
                Supervisor Approval for BCWS
              </a>
            </li>
            <li>
              <a
                href="https://www.for.gov.bc.ca/ftp/HPR/gov_internal/!publish/BCWS%20Intranet/Staff%20Development/Wildfire%20TEAMS%20Orientation%20-%20Storyline%20output/story.html"
                target="_blank"
                className="text-linkBlue underline"
                rel="noreferrer"
              >
                Intro to CORE Online Orientation (Video)
              </a>
            </li>
            <li>
              <a
                href="https://intranet.gov.bc.ca/assets/intranet/bcws-intranet/wildfire-teams/documents/willingness_statement_-_last_updated_feb_2025.pdf"
                target="_blank"
                className="text-linkBlue underline"
                rel="noreferrer"
              >
                Willingness Statement
              </a>
            </li>
            <li>
              <a
                href="https://www.for.gov.bc.ca/ftp/hpr/gov_internal/!Publish/wmb/TEAMS/PARQ.pdf"
                target="_blank"
                className="text-linkBlue underline"
                rel="noreferrer"
              >
                {'Physical Activity Readiness Questionnaire for Everyone (PAR-Q+)'}
              </a>
              <span>*</span>
            </li>
          </ul>
        </div>
        <br />
        <br />
        <p className="text-sm">
          {
            '*Please make sure you have completed, signed and submitted your BCWS PAR-Q+ to your Wildfire regional contact after submitting this application.'
          }
        </p>
        <br />
        <p className="text-sm">
          <span className="font-bold text-dark-700">
            {"Don't know which Fire Centre email to submit your documents to? "}
          </span>
          {'You can find your corresponding Fire Centre based on your home location at '}
          
          <a href="#" target="_blank" className="text-linkBlue underline">
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
        <p className="text-sm">
          {
            'You may be asked to do multiple deployments as required by the event. However, you may accept or decline a request depending on your own availability, vacation leave, and/or regular work commitments.'
          }
        </p>
        <br />
        <br />
        <p className="text-sm font-bold">
          {'Deployment Timeframes for each program stream:'}
        </p>
        <div className="py-4 px-4 text-sm">
          <ul className="list-disc list-inside text-dark-700 text-sm font-normal">
            <li>
              <span className="font-bold ext-dark-700 ">EMCR CORE Team:</span>You can be deployed
              for up <span className="font-bold ext-dark-700 ">to 10 consecutive days</span>,
              followed by a<span className="font-bold ext-dark-700 "> mandatory two-day rest period</span> before
              potential redeployment.
            </li>
            <li>
              <span className="text-dark-700  font-bold">BCWS CORE Team:</span> You can be deployed
              for
              <span className="text-dark-700  font-bold">up to 14 consecutive days</span>at a time
              (including travel duration).
            </li>
          </ul>
        </div>
      </>
    ),
  },
];
