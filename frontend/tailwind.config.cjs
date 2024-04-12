/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px', 
      'xl': '1440px',
      '2xl': '2500px',
    },
    // overridden here as mui tailwind uses these color values for some of the psuedo classes
      colors: {
        blue: {
          600: "#4e7192",
        },
        gray: {
          900: "#1A5A96",
        },
      },
    extend: {
      gridTemplateColumns: {
        '32': 'repeat(32, minmax(0, 1fr))',
      },
      fontFamily: {
        sans: ['"BCSans"'],
      },
      colors: {
        errorRed: '#D8292F',
        
        transparent: 'transparent',
        primaryBlue: '#38598A',
        primaryYellow: '#fcba19',
        activeGreen: '#d6ebd0',
        inputGray: '#606060',
        disabledGray: '#CFCFCF',
        linkBlue: '#1a5a96',
        // semantic colours
        error: '#A12622',
        success: '#2e8540',
        warning: '#EED202',
        info: '#1a5a96',
        focus: '#3B99FC',
        active: '#2D4821',
        inactive: '#343633',
        warningDark: '#6C4A00',
        successDark: '#2D4821',
        infoDark: '#1A5A96',
        white: '#FFFFFF',
        calGreen: '#eef7eb',
        calGreenTwo: '#84967d',
        calGreenHover: '#dff0d9',
        calGreenText: "#2D4821",
        calRed: '#f9eeef',
        calRedTwo: '#a6312c',
        calRedHover: '#f2dbdd',
        calBlue: '#ecf5fa',
        calBlueTwo: '#1a5b97',
        calBlueHover: '#d8eaf5',
        darkPurple: '#6f2fa2',
        darkYellow: '#826521',
      },
      backgroundColor: {
        primaryBackgroundBlue: "#38598A", 
        backgroundBlue: '#003366',
        grayBackground: '#F6F9FC',
        transparent: 'transparent',
        active: '#EFF7EB',
        inactive: '#F4F4F4',
        defaultGray: '#f2f2f2',
        
        white: '#FFFFFF',
        errorBannerDark: '#A12622',
        errorBannerLight: '#F2DEDE',
        successBannerDark: '#2D4821',
        successBannerLight: '#DFF0D8',
        warningBannerDark: '#6C4A00',
        warningBannerLight: '#F9F1C6',
        infoBannerDark: '#1A5A96',
        infoBannerLight: '#D9EAF7',
        
      },
      textColor: {
        defaultGray: "#606060",
        info: '#1a5a96',
        active: '#2D4821',
        inactive: '#343633',
        dark: '#000000',
        darkGrey: '#313132', 
        light: '#FFFFFF',
        black: '#000000',
        ministry: '#1A5A96',
        error: '#A12622', 
        warning: '#6C4A00',
        
        icon: "#606060"
        
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
});
