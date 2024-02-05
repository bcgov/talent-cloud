/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  
  theme: {
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
      fontFamily: {
        sans: ['"BCSans"'],
      },
      colors: {
        transparent: 'transparent',
        primaryBlue: '#003366',
        primaryYellow: '#fcba19',
        activeGreen: '#d6ebd0',
        inputGray: '#606060',
        disabledGray: '#CFCFCF',
        textGray: '#696a6a',
        linkBlue: '#1a5a96',
        // semantic colours
        error: '#A12622',
        success: '#2e8540',
        warning: '#EED202',
        info: '#1a5a96',
        focus: '#3B99FC',
        active: '#2D4821',
        inactive: '#343633',
      },
      backgroundColor: {
        backgroundBlue: '#003366',
        grayBackground: '#F6F9FC',
        transparent: 'transparent',
        active: '#EFF7EB',
        inactive: '#F4F4F4',
        defaultGray: '#f2f2f2',
        blue: '#38598A',
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
        info: '#1a5a96',
        active: '#2D4821',
        inactive: '#343633',
        dark: '#313132',
        darkGrey: "#3A3A3A", 
        light: '#FFFFFF',
        black: '#000000',
        ministry: '#1A5A96',
        error: '#A12622'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
});
