/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"BCSans"'],
      },
      colors: {
        primary: '#003366',
        // /* header, footer, beta status */
        secondary: '#fcba19',
        // /* headings and paragraphs */
        text: '#313132',
        // /* Links */
        links: '#1a5a96',
        // /* Nav BG */
        bgNav: '#38598a',
        // /* text input, textarea, checkbox, radio button */
        formComponents: '#606060',
        // /* Semantic Colours */
        error: '#d8292f',
        success: '#2e8540',
      },
      backgroundColor: {
        primary: '#f2f2f2',
      },
    },
  },
  plugins: [],
};
