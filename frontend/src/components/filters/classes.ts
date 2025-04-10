export const classes = {
  menu: {
    container:
      'bg-white rounded-sm  shadow-sm w-full font-normal h-10 mt-2 text-sm px-4 focus:outline-none flex flex-row flex-nowrap items-center text-ellipsis text-nowrap  justify-between border border-[#606060] text-black placeholder-gray-500 truncate ',
    formContainer:
      'bg-white rounded-[4px]  shadow-sm w-full font-normal h-[34px] pt-[5px] pb-[5px] text-sm px-[7px]  focus:outline-none flex flex-row flex-nowrap items-center text-ellipsis text-nowrap   border border-[#606060] border-opacity-60 text-black placeholder-gray-500 truncate flex flex-row items-center justify-between grid w-full cursor-default grid-cols-1 rounded-md bg-white  text-left text-dark-800 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#3B8FDD]',
    textArea:
      'placeholder:text-dark text-dark textarea resize flex flex-row  p-2.5 w-full font-normal bg-white min-h-[300px] rounded-sm border border-[#606060]  outline outline-0 transition-all  focus:outline-0 disabled:resize-none disabled:border-0 disabled:text-dark',
    textAreaError:
      'textarea resize flex flex-row  p-2.5 text-sm w-full font-normal bg-white min-h-[300px] rounded-sm text-[#828282] border border-errorRed color-[#828282] outline outline-0 transition-all  focus:outline-0 disabled:resize-none disabled:border-0 ',
    error:
      'bg-white rounded-sm  shadow-sm w-full font-normal h-10 mt-2 text-sm px-4 focus:outline-none flex flex-row items-center justify-between text-defaultGray border border-errorRed color-[#828282] ',
    buttonContainer: 'flex flex-row items-center justify-end',
    button:
      'bg-white flex flex-row justify-between items-center no-wrap fill-[#606060]',
    listLabel: 'flex cursor-pointer items-center justify-start text-list-header',
    listItem: 'flex cursor-pointer items-center justify-start text-list-item',
    chipsContainer: 'flex flex-row items-center justify-start space-x-2 mb-1',
    chip: 'rounded-full text-sm font-bold text-info bg-infoBannerLight text-transform-none',
    placeholder:
      'truncate inline text-defaultGray  text-sm text-defaultGray text-ellipsis text-nowrap text-gray-500',
    checkbox: 'checkbox',
    checkboxContainer: 'checkboxContainer',
    disabled:
      'rounded-sm  shadow-md bg-gray-200  border-0  w-full font-normal h-10 mt-2 text-sm px-4 focus:outline-none flex flex-row items-center justify-between text-[#828282] border border-[#606060] color-[#828282] ',
    disabledForm: 'bg-gray-100 rounded-[4px]  shadow-sm w-full font-normal h-[34px] pt-[5px] pb-[5px] text-sm px-[7px]  focus:outline-none outline-none text-gray-500 flex flex-row flex-nowrap items-center text-ellipsis text-nowrap   placeholder-gray-500 truncate flex flex-row items-center justify-between grid w-full cursor-default grid-cols-1    text-left border border-gray-200'
  },
};

export const menuItemClass: { [key: string]: string } = {
  region: classes.menu.container + ' md:rounded-tr-none md:rounded-br-none',
  driverLicense: classes.menu.container,
  fireCentre: classes.menu.container + ' md:rounded-tr-none md:rounded-br-none',
  location:
    classes.menu.container +
    ' md:rounded-tl-none md:rounded-bl-none md:border-l-0 w-full',
  function: classes.menu.container,
  section: classes.menu.container,
  singleSelect: classes.menu.container,
  role: classes.menu.container,
  availabilityDates:
    classes.menu.container + ' md:rounded-tl-none md:rounded-bl-none md:border-l-0',
  availabilityType:
    classes.menu.container + ' md:rounded-tr-none md:rounded-br-none',
  disabled:
    'rounded-sm  shadow-sm w-full font-normal h-10 mt-2 text-sm px-4 focus:outline-none flex flex-row items-center justify-between text-defaultGray border border-[#606060] color-[#828282] md:rounded-tl-none md:rounded-bl-none md:border-l-0 bg-gray-200',
};

export const calendarClass: { [key: string]: string } = {
  caption: 'flex pl-2 py-2 relative self-start text-black',
  caption_label: 'text-sm text-black font-bold',
  nav: 'flex items-center',
  nav_button:
    'h-6 w-6 bg-transparent hover:bg-primaryBlue-gray-50 p-1 rounded-md transition-colors duration-300',
  nav_button_previous: 'absolute right-5',
  nav_button_next: 'absolute right-1',
  table: 'w-full border-collapse',
  head_row: 'flex font-medium text-gray-900',
  head_cell: 'm-0.5 w-9 font-normal text-sm',
  row: 'flex w-full',
  cell: 'text-gray-600  h-10 w-10 text-center text-sm p-0 m-0 relative  focus-within:relative focus-within:z-20',
  day: 'h-10 w-10 p-0 font-normal aria-selected:bg-infoBannerLight aria-selected:rounded-none',
  dropdown_year: 'text-sm',
  day_range_end: 'aria-selected:bg-infoBannerLight aria-selected:rounded-r-full',
  day_range_start: 'aria-selected:bg-infoBannerLight aria-selected:rounded-l-full',
  day_selected: 'bg-infoBannerLight rounded-none',
  day_today: ' rounded-full bg-gray-200 text-gray-900 ',
  day_outside:
    'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
};
