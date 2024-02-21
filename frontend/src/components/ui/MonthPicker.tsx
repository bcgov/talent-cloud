import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';

const MonthPicker = ({
  startYear,
  onSelect,
}: {
  startYear: number;
  onSelect: ({ month, year }: { month: number; year: number }) => void;
}) => {
  const [year, setYear] = useState<number>(startYear);
  const onClickMonth = (month: number) => {
    onSelect({ month, year });
  };

  return (
    <div className="z-50">
      <div className="flex flex-row pl-8">
        <div className="grow text-black font-bold pt-2">{year}</div>
        <div>
          <Button
            size="sm"
            placeholder={''}
            variant="text"
            onClick={() => setYear(year - 1)}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <Button
            size="sm"
            placeholder={''}
            variant="text"
            onClick={() => setYear(year + 1)}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-4 px-4 pt-6">
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(1)}
        >
          Jan
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(2)}
        >
          Feb
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(3)}
        >
          Mar
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(4)}
        >
          Apr
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(5)}
        >
          May
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(6)}
        >
          Jun
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(7)}
        >
          Jul
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(8)}
        >
          Aug
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(9)}
        >
          Sep
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(10)}
        >
          Oct
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(11)}
        >
          Nov
        </Button>
        <Button
          size="sm"
          placeholder={''}
          variant="text"
          onClick={() => onClickMonth(12)}
        >
          Dec
        </Button>
      </div>
    </div>
  );
};

export default MonthPicker;
