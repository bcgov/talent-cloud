import type { ReactNode } from 'react';
import { useState } from 'react';

interface Question {
  id: string;
  text: ReactNode;
  followUps?: Question[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: '1. Do you have Arthritis, Osteoporosis, or Back Problems?',
    followUps: [
      {
        id: 'q1_1',
        text: (
          <>
            1a. Do you have difficulty controlling your condition with medications or
            other physician-prescribed therapies? (Answer{' '}
            <span className="font-bold">NO</span> if you are not currently taking
            medications or other treatments)
          </>
        ),
      },
      {
        id: 'q1_2',
        text: '1b. Do you have joint problems causing pain, a recent fracture or fracture caused by osteoporosis or cancer, displaced vertebra (e.g. spondylolisthesis), and/or spondylolysis/oars defect (a crack in the bony ring on the back of the spinal column)?',
      },
      {
        id: 'q1_3',
        text: '1c. Have you had steroid injections or taken steroid tablets regularly for more than 3 months?',
      },
    ],
  },
  {
    id: 'q2',
    text: '2. Do you have Cancer of any kind?',
    followUps: [
      {
        id: 'q2_1',
        text: '2a. Does your cancer diagnosis include any of the following types: lung/bronchogenic, multiple myeloma (cancer of plasma cells), head, and neck?',
      },
      {
        id: 'q2_2',
        text: '2b. Are you currently receiving cancer therapy (such as chemotheraphy or radiotherapy)?',
      },
    ],
  },
  {
    id: 'q3',
    text: (
      <>
        3. Do you have Heart Disease or Cardiovascular Disease?{' '}
        <span className="italic">
          This includes Coronary Artery Disease, High Blood Pressure, Heart Failure,
          Diagnosed Abnormality of Heart Rhythm
        </span>
      </>
    ),
    followUps: [
      {
        id: 'q3_1',
        text: (
          <>
            3a. Do you have difficulty controlling your condition with medications or
            other physician-prescribed therapies? (Answer{' '}
            <span className="font-bold">NO</span> if you are not currently taking
            medications or other treatments)
          </>
        ),
      },
      {
        id: 'q3_2',
        text: '3b. Do you have an irregular heart beat that requires medical management? (e.g., atrial fibrillation, premature ventricular contraction)',
      },
      { id: 'q3_3', text: '3c. Do you have chronic heart failure?' },
      {
        id: 'q3_4',
        text: (
          <>
            3d. Do you have a resting blood pressure equal to or greater than 160/90
            mmHg with or without medication? (Answer{' '}
            <span className="font-bold">YES</span> if you do not know your resting
            blood pressure)
          </>
        ),
      },
      {
        id: 'q3_5',
        text: '3e. Do you have diagnosed coronary artery (cardiovascular) disease and have not participated in regular physical activity in the last 2 months?',
      },
    ],
  },
  {
    id: 'q4',
    text: (
      <>
        4. Do you have any Metabolic Conditions?{' '}
        <span className="italic">
          This includes Type 1 Diabetes, Type 2 Diabetes, Pre-Diabetes
        </span>
      </>
    ),
    followUps: [
      {
        id: 'q4_1',
        text: (
          <>
            4a. Is your blood sugar often above 13.0 mmol/L? (Answer{' '}
            <span className="font-bold">YES</span> if you are not sure)
          </>
        ),
      },
      {
        id: 'q4_2',
        text: '4b. Do you have any signs or symptoms of diabetes complications such as heart or vascular disease and/or complications affecting your eyes, kidneys, and the sensation in your toes and feet?',
      },
      {
        id: 'q4_3',
        text: '4c. Do you have other metabolic conditions (such as thyroid disorders, pregnancy-related diabetes, chronic kidney disease, liver problems)?',
      },
    ],
  },
  {
    id: 'q5',
    text: (
      <>
        5. Do you have any Mental Health Problems or Learning Difficulties?{' '}
        <span className="italic">
          This includes Alzheimer’s, Dementia, Depression, Anxiety Disorder, Eating
          Disorder, Psychotic Disorder, Intellectual Disability, Down Syndrome)
        </span>
      </>
    ),
    followUps: [
      {
        id: 'q5_1',
        text: (
          <>
            5a. Do you have difficulty controlling your condition with medications or
            other physician-prescribed therapies? (Answer NO if you are not currently
            taking medications or other treatments)
          </>
        ),
      },
      {
        id: 'q5_2',
        text: (
          <>
            5b. Do you <span className="font-bold">ALSO</span> have back problems
            affecting nerves or muscles?
          </>
        ),
      },
    ],
  },
  {
    id: 'q6',
    text: (
      <>
        6. Do you have a Respiratory Disease?{' '}
        <span className="italic">
          This includes Chronic Obstructive Pulmonary Disease, Asthma, Pulmonary High
          Blood Pressure
        </span>
      </>
    ),
    followUps: [
      {
        id: 'q6_1',
        text: (
          <>
            6a. Do you have difficulty controlling your condition with medications or
            other physician-prescribed therapies? (Answer NO if you are not currently
            taking medications or other treatments)
          </>
        ),
      },
      {
        id: 'q6_2',
        text: '6b. Has your doctor ever said your blood oxygen level is low at rest or during exercise and/or that you require supplemental oxygen therapy?',
      },
      {
        id: 'q6_3',
        text: '6c. If asthmatic, do you currently have symptoms of chest tightness, wheezing, laboured breathing, consistent cough (more than 2 days/week), or have you used your rescue medication more than twice in the last week?',
      },
      {
        id: 'q6_4',
        text: '6d. Has your doctor ever said you have high blood pressure in the blood vessels of your lungs?',
      },
    ],
  },
  {
    id: 'q7',
    text: (
      <>
        7. Do you have a Spinal Cord Injury?{' '}
        <span className="italic">This includes Tetraplegia and Paraplegia</span>
      </>
    ),
    followUps: [
      {
        id: 'q7_1',
        text: (
          <>
            7a. Do you have difficulty controlling your condition with medications or
            other physician-prescribed therapies? (Answer NO if you are not currently
            taking medications or other treatments)
          </>
        ),
      },
      {
        id: 'q7_2',
        text: '7b. Do you commonly exhibit low resting blood pressure significant enough to cause dizziness, light-headedness, and/or fainting?',
      },
      {
        id: 'q7_3',
        text: '7c. Has your physician indicated that you exhibit sudden bouts of high blood pressure (known as Autonomic Dysreflexia)?',
      },
    ],
  },
  {
    id: 'q8',
    text: (
      <>
        8. Have you had a Stroke?{' '}
        <span className="italic">
          This includes Transient Ischemic Attack (TIA) or Cerebrovascular Event
        </span>
      </>
    ),
    followUps: [
      {
        id: 'q8_1',
        text: (
          <>
            8a. Do you have difficulty controlling your condition with medications or
            other physician-prescribed therapies? (Answer NO if you are not currently
            taking medications or other treatments)
          </>
        ),
      },
      { id: 'q8_2', text: '8b. Do you have any impairment in walking or mobility?' },
      {
        id: 'q8_3',
        text: '8c. Have you experienced a stroke or impairment in nerves or muscles in the past 6 months?',
      },
    ],
  },
  {
    id: 'q9',
    text: '9. Do you have any other medical condition not listed above or do you have two or more medical conditions?',
    followUps: [
      {
        id: 'q9_1',
        text: (
          <>
            9a. Have you experienced a blackout, fainted, or lost consciousness as a
            result of a head injury within the last 12 months{' '}
            <span className="font-bold">OR</span> have you had a diagnosed concussion
            within the last 12 months?
          </>
        ),
      },
      {
        id: 'q9_2',
        text: '9b. Do you have a medical condition that is not listed (such as epilepsy, neurological conditions, kidney problems)?',
      },
      {
        id: 'q9_3',
        text: '9c. Do you currently live with two or more medical conditions?',
      },
    ],
  },
];

interface ParQFollowUpProps {
  onAnswersChange: (answers: Record<string, boolean | null>) => void;
}

export const ParQFollowUp = ({ onAnswersChange }: ParQFollowUpProps) => {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(() => {
    const initial: Record<string, boolean | null> = {};
    QUESTIONS.forEach((q) => {
      initial[q.id] = null;
      q.followUps?.forEach((f) => {
        initial[f.id] = null;
      });
    });
    return initial;
  });

  const handleAnswer = (questionId: string, value: boolean) => {
    const newAnswers = {
      ...answers,
      [questionId]: value,
      ...(value === false &&
        QUESTIONS.find((q) => q.id === questionId)?.followUps?.reduce(
          (acc, f) => ({
            ...acc,
            [f.id]: null,
          }),
          {},
        )),
    };
    setAnswers(newAnswers);
    onAnswersChange(newAnswers);
  };

  const renderQuestion = (question: Question, isFollowUp: boolean = false) => (
    <div key={question.id} className="flex items-center justify-between py-2">
      <div className="flex-grow pr-4">
        <p className={`text-sm text-gray-700 ${!isFollowUp ? 'font-semibold' : ''}`}>
          {question.text}
        </p>
      </div>

      <div className="flex">
        <button
          onClick={() => handleAnswer(question.id, true)}
          className={`px-3 py-2 text-sm font-medium ${
            answers[question.id] === true
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer(question.id, false)}
          className={`px-3 py-2 text-sm font-medium border-l border-white ${
            answers[question.id] === false
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          No
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl px-8">
      <h5 className="text-md font-semibold text-primaryBlue">
        PAR-Q+ Step 2 of 3: Follow-up Questions about your Medical Condition(s)
      </h5>
      <div className="py-2 border-b-2" />
      {QUESTIONS.map((question) => (
        <div key={question.id}>
          {renderQuestion(question)}
          {answers[question.id] === true &&
            question.followUps?.map((followUp) => renderQuestion(followUp, true))}
        </div>
      ))}
    </div>
  );
};
