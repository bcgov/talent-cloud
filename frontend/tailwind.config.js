/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"BCSans"'],
      },
      colors: {
        primaryBlue: '#003366',
        primaryYellow: '#fcba19',
        inputGray: '#606060',
        disabledGray: '#CFCFCF',
        linkBlue: '#1a5a96',
        // semantic colours
        error: '#d8292f',
        success: '#2e8540',
        warning: '#EED202',
        info: '#1a5a96',
        focus: '#3B99FC',
        active: '#2D4821',
        inactive: '#343633',
      },
      backgroundColor: {
        
        active: '#EFF7EB',
        inactive: '#D1D1D1',
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
        active: '#2D4821',
        inactive: '#343633',
        dark: '#313132',
        light: '#FFFFFF',
        black: '#000000',
        ministry: '#1A5A96',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
