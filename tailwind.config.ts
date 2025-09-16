import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        emerald: {
          400: "hsl(160, 84%, 39%)",
          500: "hsl(160, 84%, 39%)",
        },
        blue: {
          400: "hsl(202, 89%, 53%)",
          500: "hsl(202, 89%, 53%)",
        },
        slate: {
          100: "hsl(210, 40%, 98%)",
          300: "hsl(212, 14%, 75%)",
          400: "hsl(215, 20%, 65%)",
          500: "hsl(215, 16%, 47%)",
          700: "hsl(215, 28%, 17%)",
          800: "hsl(222, 47%, 11%)",
          900: "hsl(222, 84%, 5%)",
        },
        zinc: {
          900: "hsl(240, 10%, 4%)",
        },
        red: {
          400: "hsl(0, 84%, 60%)",
          500: "hsl(0, 72%, 51%)",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
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
        breath: {
          "0%, 100%": { 
            transform: "scale(1)", 
            opacity: "0.8" 
          },
          "50%": { 
            transform: "scale(1.1)", 
            opacity: "1" 
          }
        },
        particle: {
          "0%, 100%": { 
            transform: "translateY(0px) rotate(0deg)" 
          },
          "50%": { 
            transform: "translateY(-20px) rotate(180deg)" 
          }
        },
        float: {
          "0%, 100%": { 
            transform: "translateY(0px)" 
          },
          "50%": { 
            transform: "translateY(-10px)" 
          }
        },
        "pulse-slow": {
          "0%, 100%": { 
            opacity: "1" 
          },
          "50%": { 
            opacity: "0.5" 
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        breath: "breath 4s ease-in-out infinite",
        particle: "particle 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
