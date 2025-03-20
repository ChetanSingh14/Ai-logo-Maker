// tailwind.config.mjs
import { join } from 'path';

export default {
  content: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx}'), // If using Next.js App Router
  ],
  theme: {
    extend: {
        colors:{
            
        }
    },
  },
  plugins: [],
};
