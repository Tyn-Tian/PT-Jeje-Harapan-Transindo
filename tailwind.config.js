/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gray ramp (warna dasar UI)
        'gray-50':  '#F1EFE8',
        'gray-100': '#D3D1C7',
        'gray-200': '#B4B2A9',
        'gray-400': '#888780',
        'gray-600': '#5F5E5A',
        'gray-800': '#444441',
        'gray-900': '#2C2C2A',

        // Green ramp (Assigned / Success)
        'green-50':  '#EAF3DE',
        'green-100': '#C0DD97',
        'green-600': '#3B6D11',
        'green-800': '#27500A',

        // Amber ramp (Not Assigned / Warning)
        'amber-50':  '#FAEEDA',
        'amber-600': '#854F0B',
        'amber-800': '#633806',

        // Red ramp (Error / Danger)
        'red-50':  '#FCEBEB',
        'red-100': '#F7C1C1',
        'red-600': '#A32D2D',
        'red-800': '#501313',

        // Purple ramp (Avatar / Info)
        'purple-50':  '#EEEDFE',
        'purple-800': '#3C3489',
      },
      borderRadius: {
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      }
    },
  },
  plugins: [],
}
