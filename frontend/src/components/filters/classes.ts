export const classes = {
  menu: {
    container:
      'bg-white rounded-sm  shadow-sm w-full font-normal h-10 mt-2 text-sm px-4 focus:outline-none flex flex-row flex-nowrap items-center text-ellipsis text-nowrap  justify-between border border-[#606060] text-dark-600 truncate ',
    textArea:
      'placeholder:text-dark text-dark textarea resize flex flex-row  p-2.5 w-full font-normal bg-white min-h-[300px] rounded-sm border border-[#606060]  outline outline-0 transition-all  focus:outline-0 disabled:resize-none disabled:border-0 disabled:text-dark',
    textAreaError:
      'textarea resize flex flex-row  p-2.5 text-sm w-full font-normal bg-white min-h-[300px] rounded-sm text-[#828282] border border-errorRed color-[#828282] outline outline-0 transition-all  focus:outline-0 disabled:resize-none disabled:border-0 ',
    error:
      'bg-white rounded-sm  shadow-sm w-full font-normal h-10 mt-2 text-sm px-4 focus:outline-none flex flex-row items-center justify-between text-dark-600 border border-errorRed color-[#828282] ',
    buttonContainer: 'flex flex-row items-center justify-end',
    button:
      'bg-white flex flex-row justify-between items-center no-wrap fill-[#606060]',
    listLabel: 'flex cursor-pointer items-center justify-start text-list-header',
    listItem: 'flex cursor-pointer items-center justify-start text-list-item',
    chipsContainer: 'flex flex-row items-center justify-start',
    chip: 'rounded-full text-sm font-bold text-blue-800 bg-blue-200 text-transform-none',
    placeholder:
      'truncate inline text-dark-600  text-sm text-dark-600 text-ellipsis text-nowrap',
    checkbox: 'checkbox',
    checkboxContainer: 'checkboxContainer',
    disabled:
      'rounded-sm  shadow-md bg-dark-300  border-0  w-full font-normal h-10 mt-2 text-sm px-4 focus:outline-none flex flex-row items-center justify-between text-[#828282] border border-[#606060] color-[#828282] ',
  },
};

export const menuItemClass: { [key: string]: string } = {
  region: classes.menu.container + ' md:rounded-tr-none md:rounded-br-none',
  driverLicense: classes.menu.container,
  fireCentre: classes.menu.container + ' md:rounded-tr-none md:rounded-br-none',
  location:
    classes.menu.container + ' md:rounded-tl-none md:rounded-bl-none md:border-l-0',
  function: classes.menu.container,
  section: classes.menu.container,
  role: classes.menu.container,
  availabilityDates:
    classes.menu.container + ' md:rounded-tl-none md:rounded-bl-none md:border-l-0',
  availabilityType:
    classes.menu.container + ' md:rounded-tr-none md:rounded-br-none',
  disabled:
    'rounded-sm  shadow-sm w-full font-normal h-10 mt-2 text-sm px-4 focus:outline-none flex flex-row items-center justify-between text-dark-600 border border-[#606060] color-[#828282] md:rounded-tl-none md:rounded-bl-none md:border-l-0 bg-dark-300',
};

export const calendarClass: { [key: string]: string } = {
  caption: 'flex pl-2 py-2 relative self-start text-dark-800',
  caption_label: 'text-sm text-dark-800 font-bold',
  nav: 'flex items-center',
  nav_button:
    'h-6 w-6 bg-transparent hover:bg-blue-800-gray-50 p-1 rounded-md transition-colors duration-300',
  nav_button_previous: 'absolute right-5',
  nav_button_next: 'absolute right-1',
  table: 'w-full border-collapse',
  head_row: 'flex font-medium text-gray-900',
  head_cell: 'm-0.5 w-9 font-normal text-sm',
  row: 'flex w-full',
  cell: 'text-gray-600  h-10 w-10 text-center text-sm p-0 m-0 relative  focus-within:relative focus-within:z-20',
  day: 'h-10 w-10 p-0 font-normal aria-selected:bg-blue-200 aria-selected:rounded-none',
  dropdown_year: 'text-sm',
  day_range_end: 'aria-selected:bg-blue-200 aria-selected:rounded-r-full',
  day_range_start: 'aria-selected:bg-blue-200 aria-selected:rounded-l-full',
  day_selected: 'bg-blue-200 rounded-none',
  day_today: ' rounded-full bg-dark-300 text-gray-900 ',
  day_outside:
    'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
};
