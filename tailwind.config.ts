import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-900": "#0A196F",
        "primary-800": "#102587",
        "primary-700": "#1A37A7",
        "primary-600": "#264BC8",
        "primary-500": "#3563E9",
        "primary-400": "#658DF1",
        "primary-300": "#85A8F8",
        "primary-200": "#AEC8FC",
        "primary-100": "#D6E4FD",

        "secondary-900": "#040815",
        "secondary-800": "#080C19",
        "secondary-700": "#0D121F",
        "secondary-600": "#131825",
        "secondary-500": "#1A202C",
        "secondary-400": "#596780",
        "secondary-300": "#90A3BF",
        "secondary-200": "#C3D4E9",
        "secondary-100": "#E0E9F4",
        
        "background": "#F6F7F9",
        
        "dark-background-2": "#363636",
        "dark-background": "#2f2f2f"
      },
    },
  },
  plugins: [],
};
export default config;
