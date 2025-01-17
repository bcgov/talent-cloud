export const FAQ = [
  {
    title: (
      <p className="font-bold text-blue-900">
        {'Supervisor Approval for Recommitment vs. for Deployment'}
      </p>
    ),
    content: (
      <p>
        {
          "At the start of each year, we'll request your initial approval for your employees' return to CORE. After that, we still need you to approve or decline each member deployment."
        }
        <strong>
          {' '}
          {
            "Approving members' participation in the CORE program does NOT mean you have to approve all their deployments."
          }
        </strong>
      </p>
    ),
  },
  {
    title: (
      <p className="font-bold text-blue-900">
        {"I have APPROVED of my employee's recommitment to CORE. What happens next?"}
      </p>
    ),
    content: (
      <p>
        {
          "Your employee and their regional CORE coordinator will be notified of your approval. Your employee will be marked as 'Active' for the upcoming season, which means that they would be deployable for the season unless stated otherwise."
        }
      </p>
    ),
  },
  {
    title: (
      <p className="font-bold text-blue-900">
        {"I have DECLINED my employee's recommitment to CORE. What does that mean?"}
      </p>
    ),
    content: (
      <p>
        {
          "If you have declined your employee's recommitment, they will be marked as 'Inactive' for the upcoming season. This means they will not be called for deployments for the remaining of the year. Your employee and their regional CORE coordinator will be notified of your declined approval. You will be asked to provide a reason why you have declined a recommitment request. Note thats"
        }
        <strong> only CORE coordinators </strong>
        {"scan see your reason for declining your employee's recommitment."}
      </p>
    ),
  },
  {
    title: (
      <p className="font-bold text-blue-900">
        {
          "I submitted my decision on an employee's recommitment. Can I change my approval decision after that?"
        }
      </p>
    ),
    content: (
      <p>
        {'Selecting '}
        <strong>{'APPROVE'}</strong>
        {
          ' for an employees recommitment is a final action and cannot be undone. However, if you initially selected '
        }
        <strong>{'DECLINE'}</strong>
        {
          ', you can change it before the recommitment deadline. After the deadline, please reach out to'
        }{' '}
        <a
          style={{ color: '#1A5A96', textDecoration: 'underline' }}
          href="mailto:EMCR.CORETeam@gov.bc.ca"
        >
          EMCR.CORETeam@gov.bc.ca
        </a>{' '}
        {'or'}{' '}
        <a
          style={{ color: '#1A5A96', textDecoration: 'underline' }}
          href="mailto:BCWS.CORETeam@gov.bc.ca"
        >
          BCWS.CORETeam@gov.bc.ca
        </a>{' '}
        {'if you wish to change your decision.'}
      </p>
    ),
  },
];
