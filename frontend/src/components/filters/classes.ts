export const classes = {
  menu: {
    container:
      'bg-white rounded-md  shadow-sm w-full font-normal h-12 mt-2 text-sm px-4 focus:outline-none flex flex-row items-center justify-between aria-disabled="true" aria-haspopup="false" aria-expanded="false" aria-controls="" text-[#828282] border border-[#606060] color-[#828282]',

    buttonContainer: 'flex flex-row items-center justify-end',
    button:
      'bg-white flex flex-row justify-between items-center no-wrap fill-[#606060]',
    listLabel: 'flex cursor-pointer items-center justify-start text-list-header',
    listItem: 'flex cursor-pointer items-center justify-start text-list-item',
    chipsContainer: 'flex flex-row items-center justify-start',
    chip: 'rounded-full text-sm font-bold text-info bg-infoBannerLight text-transform-none',
    placeholder: 'text-[#828282]',
    checkbox: 'checkbox',
    checkboxContainer: 'checkboxContainer',
  },
};

export const menuItemClass: { [key: string]: string } = {
  region: classes.menu.container + ' md:rounded-tr-none md:rounded-br-none',
  location:
    classes.menu.container + ' md:rounded-tl-none md:rounded-bl-none md:border-l-0',
  function: classes.menu.container,
  name: classes.menu.container,
  availabilityDates:
    classes.menu.container + ' md:rounded-tl-none md:rounded-bl-none md:border-l-0',
  availabilityType:
    classes.menu.container + ' md:rounded-tr-none md:rounded-br-none',
};

export const calendarClass: { [key: string]: string } = {
  caption: 'flex pl-2 py-2 relative self-start text-black',
  caption_label: 'text-sm text-black font-bold',
  nav: 'flex items-center',
  nav_button:
    'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
  nav_button_previous: 'absolute right-5',
  nav_button_next: 'absolute right-1',
  table: 'w-full border-collapse',
  head_row: 'flex font-medium text-gray-900',
  head_cell: 'm-0.5 w-9 font-normal text-sm',
  row: 'flex w-full',
  cell: 'text-gray-600  h-10 w-10 text-center text-sm p-0 m-0 relative  focus-within:relative focus-within:z-20 aria-selected:bg-infoBannerLight',
  day: 'h-10 w-10 p-0 font-normal aria-selected:infoBannerLight aria-selected:rounded-none',
  day_range_middle: 'bg-infoBannerLight',
  dropdown_year: 'text-sm',
  day_selected: 'bg-infoBannerLight rounded-none',
  day_range_end: 'aria-selected:bg-infoBannerLight aria-selected:rounded-r-full',
  day_range_start: 'aria-selected:bg-infoBannerLight aria-selected:rounded-l-full',
  day_today: ' rounded-full bg-gray-200 text-gray-900 ',
  day_outside:
    'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
  day_disabled: 'text-gray-500 opacity-50',
  day_hidden: 'invisible',
};
