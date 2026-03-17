import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "sm-md": { min: "640px", max: "768px" }, // Between sm and md
        "md-lg": { min: "768px", max: "1024px" }, // Between md and lg
        "lg-xl": { min: "1024px", max: "1280px" }, // Between lg and xl
        "sm-lg": { min: "640px", max: "1024px" }, // Between sm and lg
        "sm-xl": { min: "640px", max: "1280px" }, // Between sm and xl
        "md-xl": { min: "768px", max: "1280px" }, // Between md and xl
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        disabled: "#F1F3F6",
        primary: {
          "50": "#F4F5FF",
          "100": "#EAEBFF",
          "200": "#C6CAFF",
          "300": "#A1A7FF",
          "400": "#7C84FF",
          "500": "#5761FF",
          "600": "#394CFF",
          "700": "#2F3FCC",
          "800": "#262F99",
          "900": "#1D2266",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        black: "#0F1B31",
        error: {
          "100": "#FFEEEB",
          "200": "#FFDCD7",
          "300": "#FFB9AE",
          "400": "#FF9786",
          "500": "#FF745D",
          "600": "#FF5135",
          "700": "#CC412A",
          "800": "#993120",
          "900": "#662015",
          "1000": "#33100B",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // @ts-ignore
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        // @ts-ignore
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out", // @ts-ignore
        "accordion-down": "accordion-down 0.2s ease-out", // @ts-ignore
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        lexend: ["var(--font-lexend)", ...fontFamily.sans],
        ibmPlex: ["var(--font-ibm-plex)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: false,
  },
};
export default config;
