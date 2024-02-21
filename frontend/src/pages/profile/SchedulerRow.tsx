import dayjs from 'dayjs';

const Cell = (
  { dayOfMonthStatus, cellClass, startClass, textClass, month }: {
    dayOfMonthStatus?: {
      dayOfMonth: number,
      status: string,
      start?: boolean,
      numDays?: number,
    },
    cellClass: string,
    startClass?: string,
    textClass?: string,
    month?: string,
  }
) => {
  const startDateString = dayOfMonthStatus?.start && !!month ? `${month} ${dayOfMonthStatus.dayOfMonth} ${new Date().getFullYear()}` : '';
  const dateString = () => {
    const startDate = dayjs(startDateString);
    if (dayOfMonthStatus?.numDays) {
      const endDate = dayjs(startDateString).add(dayOfMonthStatus?.numDays, 'days');
      const endDateString = startDate.month() === endDate.month() ? endDate.format('D') : endDate.format('MMM D');
      return `${startDate.format('MMM D')} - ${endDateString}`;
    }
    return startDate.format('MMM D');
  }

  let status = dayOfMonthStatus?.status;
  let dates = '';

  const daysInMonth = dayjs(startDateString).daysInMonth();
  if (dayOfMonthStatus?.dayOfMonth && status) {
    dates = dateString();
    if (dayOfMonthStatus?.numDays === 1 || daysInMonth - dayOfMonthStatus?.dayOfMonth < 1) {
      status = status.charAt(0);
      dates = '';
    }
  }
  
  return (
    <div className={dayOfMonthStatus?.start && !!startClass ? startClass : cellClass}>
      {dayOfMonthStatus?.start && dayOfMonthStatus?.numDays && status && textClass &&
        <div className="flex flex-col">
          <span className={`${textClass} font-bold`}>{status}</span>
          <span className={textClass}>{dates}</span>
        </div>
      }
    </div>
  );
};

const SchedulerRow = ({ month }: { month: string }) => {
  const data = [
    {
      dayOfMonth: 1,
      status: 'Available',
    },
    {
      dayOfMonth: 2,
      status: 'Available',
    },
    {
      dayOfMonth: 3,
      status: 'Deployed',
      start: true,
      numDays: 7,
    },
    {
      dayOfMonth: 4,
      status: 'Deployed',
    },
    {
      dayOfMonth: 5,
      status: 'Deployed',
    },
    {
      dayOfMonth: 6,
      status: 'Deployed',
    },
    {
      dayOfMonth: 7,
      status: 'Deployed',
    },
    {
      dayOfMonth: 8,
      status: 'Deployed',
    },
    {
      dayOfMonth: 9,
      status: 'Deployed',
    },
    {
      dayOfMonth: 10,
      status: 'Available',
      start: true,
      numDays: 3,
    },
    {
      dayOfMonth: 11,
      status: 'Available',
    },
    {
      dayOfMonth: 12,
      status: 'Available',
    },
    {
      dayOfMonth: 13,
      status: 'Unavailable',
      start: true,
      numDays: 8,
    },
    {
      dayOfMonth: 14,
      status: 'Unavailable',
    },
    {
      dayOfMonth: 15,
      status: 'Unavailable',
    },
    {
      dayOfMonth: 16,
      status: 'Unavailable',
    },
    {
      dayOfMonth: 17,
      status: 'Unavailable',
    },
    {
      dayOfMonth: 18,
      status: 'Unavailable',
    },
    {
      dayOfMonth: 19,
      status: 'Unavailable',
    },
    {
      dayOfMonth: 20,
      status: 'Unavailable',
    },
    {
      dayOfMonth: 21,
      status: 'Deployed',
      start: true,
      numDays: 5,
    },
    {
      dayOfMonth: 22,
      status: 'Deployed',
    },
    {
      dayOfMonth: 23,
      status: 'Deployed',
    },
    {
      dayOfMonth: 24,
      status: 'Deployed',
    },
    {
      dayOfMonth: 25,
      status: 'Deployed',
    },
    {
      dayOfMonth: 26,
      status: 'Unavailable',
      start: true,
      numDays: 1,
    },
    {
      dayOfMonth: 27,
      status: 'Unknown',
    },
    {
      dayOfMonth: 28,
      status: 'Unknown',
    },
    {
      dayOfMonth: 29,
      status: 'Unknown',
    },
    {
      dayOfMonth: 30,
      status: 'Unknown',
    },
    {
      dayOfMonth: 31,
      status: 'Available',
      start: true,
      numDays: 6,
    },
  ];

  const availableStartClass = 'h-20 border-l-4 border-calGreenTwo bg-calGreen hover:bg-transparent cursor-pointer text-sm z-10 pl-2 pt-10';
  const availableClass = 'h-20 border-l border-cyan-950 bg-calGreen hover:bg-transparent cursor-pointer';
  const availableTextClass = `text-nowrap font-bold text-calGreenTwo text-xs`;
  const deployedStartClass = 'h-20 border-l-4 border-calBlueTwo bg-calBlue hover:bg-transparent cursor-pointer text-sm z-10 pl-2 pt-10';
  const deployedClass = 'h-20 border-l border-cyan-950 bg-calBlue hover:bg-transparent cursor-pointer';
  const deployedTextClass = `text-nowrap font-bold text-calBlueTwo text-xs`;
  const unavailableStartClass = 'h-20 border-l-4 border-calRedTwo bg-calRed hover:bg-transparent cursor-pointer text-sm z-10 pl-2 pt-10';
  const unavailableClass = 'h-20 border-l border-cyan-950 bg-calRed hover:bg-transparent cursor-pointer';
  const unavailableTextClass = `text-nowrap font-bold text-calRedTwo text-xs`;
  const notIndicatedClass = 'h-20 border-l border-cyan-950 bg-white hover:bg-transparent cursor-pointer';
  const noDateClass = 'h-20 border-l border-cyan-950 bg-disabledGray';
  
  return (
    <div className="grid grid-cols-32 border border-cyan-950">
      <div className="h-20 border-l border-cyan-950 bg-white text-xs font-bold pl-1 pt-2">{month}</div>
      {[...Array(32).keys()].slice(1).map(dayOfMonth => {
        const dayOfMonthStatus = data.find(d => d.dayOfMonth === dayOfMonth);
        if (!dayOfMonthStatus) { return <Cell cellClass={noDateClass} />; }
        switch (dayOfMonthStatus.status) {
          case 'Deployed': return <Cell dayOfMonthStatus={dayOfMonthStatus} cellClass={deployedClass} startClass={deployedStartClass} textClass={deployedTextClass} month={month} />;
          case 'Available': return <Cell dayOfMonthStatus={dayOfMonthStatus} cellClass={availableClass} startClass={availableStartClass} textClass={availableTextClass} month={month} />;
          case 'Unavailable': return <Cell dayOfMonthStatus={dayOfMonthStatus} cellClass={unavailableClass} startClass={unavailableStartClass} textClass={unavailableTextClass} month={month} />;
          default: return <Cell cellClass={notIndicatedClass} />;
        }
      })}
    </div>
  );
}

export default SchedulerRow;