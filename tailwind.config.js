import daisyui from "daisyui"

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
  plugins: [daisyui],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#D0A290",
        "secondary": "#fff8e1",
        "accent": "#A56B55",
        "neutral": "#FAE4C0",
        "info": "#ffffff",
        "base-100": "#ffffff",
      },
    },
    
    ]
  }
}


