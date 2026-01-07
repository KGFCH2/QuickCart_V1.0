module.exports = {
    content: [
        './index.html',
        './App.tsx',
        './pages/**/*.{js,ts,jsx,tsx}',
        './services/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    850: '#1e293b',
                    950: '#0f172a',
                },
            },
        },
    },
    plugins: [],
}
