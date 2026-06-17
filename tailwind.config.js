/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        insurance: {
          blue: {
            50: '#E8F2FE',
            100: '#D1E5FD',
            200: '#A3CBFB',
            300: '#75B1F9',
            400: '#4797F7',
            500: '#1A73E8',
            600: '#155CBA',
            700: '#10458B',
            800: '#0A2E5D',
            900: '#05172E',
          },
          green: {
            50: '#E7F6EC',
            100: '#CFEED9',
            200: '#9FDDB3',
            300: '#6FCC8D',
            400: '#3FBB67',
            500: '#34A853',
            600: '#2A8642',
            700: '#1F6532',
            800: '#154321',
            900: '#0A2211',
          },
          orange: {
            50: '#FFF3E8',
            100: '#FFE7D1',
            200: '#FECFA3',
            300: '#FEB775',
            400: '#FD9F47',
            500: '#FB923C',
            600: '#C97530',
            700: '#975824',
            800: '#653A18',
            900: '#321D0C',
          },
        },
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'scan': 'scan 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'count-up': 'countUp 0.5s ease-out forwards',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
