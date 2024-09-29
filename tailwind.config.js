/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-1': '#FDD3C7',
        'green-1': '#1E2F1D',
        'green-2': '#78A974',
        'green-3': '#507E4D',
        'green-4': '#497246',
        'gray-1': '#F2F2F2',
        'gray-2': '#CCCCCC',
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(to bottom left, #d1fae5, #10b981)',
      },
      width: {
        'cw-1': '96%',
        'cw-2': '80%',
      },
      fontFamily: {
        gurajadaRegular: ['Gurajada-Regular'],
        suravaramRegular: ["Suravaram-Regular"],
        leagueSpartanRegular: ["LeagueSpartan-Regular"],
        leagueSpartanSemiBold: ["LeagueSpartan-SemiBold"],
        leagueSpartanMedium: ["LeagueSpartan-Medium"],
        leagueSpartanLight: ["LeagueSpartan-Light"],
        tenaliRamaKrishnaRegular: ["TenaliRamakrishna-Regular"],
      }
    },
  },
  plugins: [],
}