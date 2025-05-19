/** @type {import('tailwindcss').Config} */
import twAnimate from 'tw-animate-css';

const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',
                muted: 'var(--color-muted)',
                border: 'var(--color-border)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                destructive: 'var(--color-destructive)',
                success: 'var(--color-success)',
                warning: 'var(--color-warning)',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
            },
        },
    },
    plugins: [twAnimate],
};

export default config;
