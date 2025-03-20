export default {
  content: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx}'), // If using Next.js App Router
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ed1e61', // ✅ Now `text-primary` will work!
        foreground: 'hsl(var(--primary-foreground))',
      },
    },
  },
  plugins: [],
};
