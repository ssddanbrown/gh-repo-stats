module.exports = {
    from: 'css/app.css',
    to: 'public/gen/app.css',
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
    ],
}
