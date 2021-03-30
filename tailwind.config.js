module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        "bg-texture": "url('/images/BG-black.png')",
        "hd-graphic": "url('/images/HD-graphic.png')",
        "small-box": "url('/images/smallbox.png')"
      }),
      colors: theme => ({
        "green-tooltip": "#349e51",
        "gray-tooltip": "#414241",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
