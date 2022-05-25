module.exports = {
  content: ["./public/index.html", "./src/**/*.svelte"],
  theme: {
    extend: {
      colors: {
        primary: "#4E6AFC",
        tertiary: "#ffffff",
        secondary: "#101014",
        "tertiary-dark": "#191a26",
        green: "#48CD95",
        red: "#FC344C",
        yellow: "#ECAC09",
      },
      fontFamily: {
        "red-hat-display": "'Red Hat Display', sans-serif",
        "red-hat-mono": "'Red Hat Mono', monospace",
      },
      dropShadow: {
        tight: "0px 1px 0.5px rgba(0, 0, 0, 0.8)",
      },
      boxShadow: {
        input: "0px 1px 0 #7589f3",
      },
    },
  },
  plugins: [],
};
