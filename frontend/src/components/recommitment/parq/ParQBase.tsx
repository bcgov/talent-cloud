import { ParQGeneral, ParQFollowUp, ParQDeclaration, ParQIntro } from './';

interface ParQBaseProps {
  currentPage: number;
  onGeneralAnswersChange: (answers: Record<string, boolean | null>) => void;
  onFollowUpAnswersChange: (answers: Record<string, boolean | null>) => void;
  onDeclarationChange: (declaration: {
    fullName: string;
    dateSigned: string;
    witnessName: string;
  }) => void;
}

export const ParQBase: React.FC<ParQBaseProps> = ({
  currentPage,
  onGeneralAnswersChange,
  onFollowUpAnswersChange,
  onDeclarationChange,
}: ParQBaseProps) => {
  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <ParQIntro />;
      case 1:
        return <ParQGeneral onAnswersChange={onGeneralAnswersChange} />;
      case 2:
        return <ParQFollowUp onAnswersChange={onFollowUpAnswersChange} />;
      case 3:
        return <ParQDeclaration onDeclarationChange={onDeclarationChange} />;
      default:
        return <ParQIntro />;
    }
  };

  return <div className="flex-grow pb-8">{renderPage()}</div>;
};
