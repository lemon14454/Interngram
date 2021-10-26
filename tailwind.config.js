module.exports = {
  purge: ["./src/**/.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "Noto Sans TC", "sans-serif"],
      },
      fill: (theme) => ({
        red: theme("colors.red.primary"),
      }),
      colors: {
        blue: {
          medium: "#005c98",
        },
        black: {
          light: "#262626",
          faded: "#00000059",
        },
        gray: {
          base: "#616161",
          background: "#fafafa",
          primary: "#dbdbdb",
        },
        red: {
          primary: "#ed4956",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
