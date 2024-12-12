/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
const { colors } = require('tailwindcss/defaultTheme');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],

  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1150px',
      xl: '1440px',
      '2xl': '2500px',
    },
    // overridden here as mui tailwind uses these color values for some of the psuedo classes
    colors: {
      ...colors,
      blue: {
        ...colors.blue,
        600: '#4e7192',
      },
      gray: {
        ...colors.gray,
        900: '#1A5A96',
      },
    },
    extend: {
      gridTemplateColumns: {
        32: 'repeat(32, minmax(0, 1fr))',
      },
      fontFamily: {
        sans: ['"BC Sans"'],
      },
      colors: {
        white: '#FFFFFF',
        grayBackground: '#F6F9FC',
        dark: {
          100: '#FFFFFF',
          300: '#F2F2F2',
          400: '#CFCFCF',
          500: '#878787',
          600: '#606060',
          710: '#313132',
          700: '#262729',
          800: '#000000',
        },
        blue: {
          // Deployed calendar block
          200: '#ECF5FB',
          // Info banner background
          300: '#D9EAF7',
          400: '#BEDAF4',
          700: '#3B8FDD',
          // Info text, background
          800: '#1A5A96',
        },
        ink: {
          300: '#007FFF',
          700: '#004D99',
          // BC gov primary
          900: '#003366',
        },
        skyline: {
          // hover deployed calendar
          100: '#E1EEF9',
          // Hyperlinks, links with underscore
          200: '#3B99FC',
        },
        stormy: {
          100: '#EFF2F6',
          200: '#DFE4EC',
          300: '#BFC9D9',
          // Disabled blue
          500: '#7E93B3',
          // Background
          700: '#38598A',
        },        
        forest: {
          500: '#81917A',
          700: '#576D4D',
          //Success banner text
          900: '#2D4821',
        },
        leaf: {
          // success
          700: '#2E8540',
        },
        sprout: {
          // Available calendar block
          100: '#EFF7EB',
          // Hovered available cal block
          200: '#E5F3E0',
          // Success banner background
          300: '#DFF0D8',
          400: '#C8E1BD',
          700: '#70B054',
        },
        red: {
          // Unavailable calendar block
          100: '#F5E5E5',
          // Error banner background
          200: '#F2DEDE',
          300: '#D9A8A7',
          // Error Banner Text
          600: '#A12622',
        },
        cherry: {
          //Unavailable calendar block
          200: '#F9EFEF',
          // Error text (form fields)
          700: '#D8292F',
        },
        yellow: {
          //Warning banner background
          200: '#F9F1C6',
          //BC Gov Primary Yellow
          300: '#FCBA19',
          400: '#D18F00',
          // Warning banner text
          900: '#6C4A00',
        },
        purple: {
          100: '#EFE8F4',
          // Status tag background
          200: '#E8D9F7',
          300: '#CFBADF',

          500: '#8F5FB5',
          // Status tag border and text
          600: '#5F1A96',
        },
        calGreen: '#eef7eb',
        calGreenTwo: '#84967d',
        calGreenHover: '#dff0d9',
        calRed: '#f9eeef',
        calRedTwo: '#a6312c',
        calRedHover: '#f2dbdd',
        calBlue: '#ecf5fa',
        calBlueTwo: '#1a5b97',
        calBlueHover: '#d8eaf5',
        darkPurple: '#6f2fa2',
        darkYellow: '#826521',
        
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
});
