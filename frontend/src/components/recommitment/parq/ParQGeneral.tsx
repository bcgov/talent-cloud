import type { ReactNode } from 'react';
import { useState } from 'react';

interface Question {
  id: string;
  text: ReactNode;
  subtext?: ReactNode;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: (
      <>
        Has your doctor ever said that you have a heart condition{' '}
        <span className="font-bold">OR</span> high blood pressure?
      </>
    ),
  },
  {
    id: 'q2',
    text: (
      <>
        Do you feel pain in your chest at rest, during your daily activites of
        living, <span className="font-bold">OR</span> when you do physically
        activity?
      </>
    ),
  },
  {
    id: 'q3',
    text: (
      <>
        Do you lose balance because of dizziness{' '}
        <span className="font-bold">OR</span> have you lost consciousness in the last
        12 months?
      </>
    ),
    subtext: (
      <>
        Please select <span className="font-bold">NO</span> if your dizziness was
        associated with over-breathing (including during vigorous exercise.)
      </>
    ),
  },
  {
    id: 'q4',
    text: 'Have you ever been diagnosed with another chronic medical condition (other than heart disease or high blood pressure)?',
  },
  {
    id: 'q5',
    text: 'Are you currently taking prescribed medications for a chronic medical condition?',
  },
  {
    id: 'q6',
    text: 'Do you have a bone or joint problem that could be made worse by becoming more physically active? ',
    subtext: (
      <>
        Please select <span className="font-bold">NO</span> if you had a joint
        problem in the past, but it does not limit your current ability to be
        physically active. (e.g., knee, ankle, shoulder, etc.)
      </>
    ),
  },
  {
    id: 'q7',
    text: 'Has your doctor ever said that you should only do medically supervised physical activity?',
  },
];

interface ParQGeneralProps {
  onAnswersChange: (answers: Record<string, boolean | null>) => void;
}

export const ParQGeneral = ({ onAnswersChange }: ParQGeneralProps) => {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(() =>
    QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: null }), {}),
  );

  const handleAnswer = (questionId: string, value: boolean) => {
    const newAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(newAnswers);
    onAnswersChange(newAnswers);
  };

  return (
    <div className="max-w-3xl px-8">
      <h5 className="text-md font-semibold text-primaryBlue">
        PAR-Q+ Step 1 of 3: General Health Questions
      </h5>
      <p className="text-sm">
        Please read the seven questions below carefully and answer each one honestly:
        check YES or NO. If you answered NO to all the questions below, you will be
        directly taken to step 3 “Participate Declaration”.
      </p>
      <div className="py-2 border-b-2" />
      {QUESTIONS.map((question) => (
        <div key={question.id} className="flex items-center justify-between py-2">
          <div className="flex-grow pr-4">
            <p className="text-sm text-gray-700">{question.text}</p>
            {question.subtext && (
              <p className="text-xs text-gray-500">{question.subtext}</p>
            )}
          </div>

          <div className="flex">
            <button
              onClick={() => handleAnswer(question.id, true)}
              className={`px-4 py-2 text-sm font-semibold rounded-none ${
                answers[question.id] === true
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(question.id, false)}
              className={`px-4 py-2 text-sm font-semibold rounded-none ${
                answers[question.id] === false
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
