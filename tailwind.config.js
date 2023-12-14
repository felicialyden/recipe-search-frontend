/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#D0A290",
        "secondary": "#A56B55",
        "neutral": "#FAE4C0",
        "success": "#769F78",
        "error": "#C1564B",
        "base-100": "#ffffff",
      },
    },
    
    ]
  }
}


