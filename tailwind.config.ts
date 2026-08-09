import type { Config } from 'tailwindcss';
export default {
  darkMode:['class'],
  content:['./pages/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./app/**/*.{ts,tsx}','./src/**/*.{ts,tsx}'],
  theme:{container:{center:true,padding:{DEFAULT:'1rem',sm:'2rem',lg:'3rem',xl:'4rem'},screens:{sm:'640px',md:'768px',lg:'1024px',xl:'1280px','2xl':'1400px'}},extend:{fontFamily:{sans:['Inter','sans-serif'],display:['Bebas Neue','Impact','sans-serif'],mono:['JetBrains Mono','monospace']},colors:{ink:'#12100F',paper:'#F2EDE4',red:'#E8432E',cyan:'#3DD9E8',yellow:'#F5C518',border:'hsl(var(--border))',input:'hsl(var(--input))',ring:'hsl(var(--ring))',background:'hsl(var(--background))',foreground:'hsl(var(--foreground))'}}},
  plugins:[require('tailwindcss-animate')]
} satisfies Config;
