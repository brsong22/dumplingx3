import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primarybg: "#FDF6EC",
                primary: "#D4A373",
                secondary: "#cddfd1",
                primarytext: "#333333",
                primaryaccent: "#9A3B3B",
                secondaryaccent: "#A1B57D",
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
} satisfies Config;
