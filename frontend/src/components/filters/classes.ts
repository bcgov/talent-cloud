export const classes = {
  menu: {
    container:
    'bg-white rounded-md  shadow-sm w-full font-normal h-12 mt-2 text-sm px-4 focus:outline-none flex flex-row items-center justify-between aria-disabled="true" aria-haspopup="false" aria-expanded="false" aria-controls="" text-[#828282] border border-[#606060] color-[#828282]',    
   
    buttonContainer: 'flex flex-row items-center justify-end',
    button: 'bg-white flex flex-row justify-between items-center no-wrap fill-[#606060]',
    listLabel: 'flex cursor-pointer items-center justify-start text-list-header',
    listItem: 'flex cursor-pointer items-center justify-start text-list-item',
    chipsContainer: 'flex flex-row items-center justify-start',
    chip: 'rounded-full text-sm font-bold text-info bg-infoBannerLight text-transform-none',
    placeholder: "text-[#828282]",
    checkbox: 'checkbox',
    checkboxContainer: 'checkboxContainer',
  },
};

export const menuItemClass: {[key:string]: string} = {  
    region: classes.menu.container + ' md:rounded-tr-none md:rounded-br-none', 
    location:  classes.menu.container + ' md:rounded-tl-none md:rounded-bl-none md:border-l-0', 
    function: classes.menu.container,
    name: classes.menu.container,
  }
