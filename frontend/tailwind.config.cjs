/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 const { colors } = require('tailwindcss/defaultTheme');
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
        ...colors,
        blue: {
        ...colors.blue, 
          600: "#4e7192",
        },
        gray: {
          ...colors.gray,
          900: "#1A5A96",
        },
      },
    extend: {
      gridTemplateColumns: {
        '32': 'repeat(32, minmax(0, 1fr))',
      },
      fontFamily: {
        sans: ['"BC Sans"'],
      },
      colors: {
        blue:{
          100: '#F2F9FF',
          200: '#E6F3FF',
          300: '#CCE6FF',
          400: '#99CCFF',
          500: '#66B2FF',
          600: '#338EFF',
          700: '#134573',
          800: '#1A5A96',
          900: '#0D324F',
        },
        dark: {
          100: '#FFFFFF',
          200: '#FAFAFA',
          300: '#F2F2F2',
          400: '#CFCFCF',
          500: '#878787',
          600: '#606060',
          700: '#313132',
          800: '#262729',
          900: '#000000',
        },
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
        lightPurple: '#E8D9F7',
        darkYellow: '#826521',
        lightYellow: '#F9F1C6'
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
        successBannerLight: '#E5F3E0',
        warningBannerDark: '#6C4A00',
        warningBannerLight: '#FDFAE6',
        infoBannerDark: '#1A5A96',
        infoBannerLight: '#ECF5FB',
        
      },
      textColor: {
        defaultGray: "#606060",
        backgroundBlue: '#003366',
        blue700: "#004D99",
        info: '#1a5a96',
        active: '#2D4821',
        inactive: '#343633',
        
        dark: {
          100: '#FFFFFF',
          200: '#FAFAFA',
          300: '#F2F2F2',
          400: '#CFCFCF',
          500: '#878787',
          600: '#606060',
          700: '#313132',
          800: '#262729',
          900: '#000000',
        },
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
