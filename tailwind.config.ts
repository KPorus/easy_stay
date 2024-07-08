import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'md-mobile': '768px',
        'sm-mobile':{'max':'500px'},
        'lg-desktop': {'max': '1320px'},
        'md-desktop': {'max': '960px'},
        'sm-desktop': {'max': '820px'}
      },
    },
  },
  plugins: [],
};
export default config;
