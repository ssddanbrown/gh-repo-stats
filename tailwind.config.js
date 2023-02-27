const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['public/index.html'],

    theme: {
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
        },
        container: {
            center: true,
            padding: '2rem',
        },
        extend: {
            fontFamily: {
                sans: ['Roboto', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },

    plugins: [],
};
