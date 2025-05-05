/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./src/Components/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        pmmGrit: "#0279FF", // brand color changed to blue
        pmmEvry1: "#3D8C9B",
        pmmResilience: "#510221",
        pmmSilver: "#929191",
        pmmGreen: "#494B31",
        pmmTan: "#C4BAAF",
        pmmGold: "#00E02B", // brand color changed to green
        pmmBlue: "#9EC6CD",
        pmmRed: "#DE5950",
        pmmSelect: "#DFB140",
        pmmDark: "#333"

      },
      backgroundImage: {
        'utc-logo': "url('Components/img/UTC-logo.png')",
        'pmm-logo': "url(Components/img/PivotalMomentsMedia_LOGO_Dark.png)"
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        'logo': '100%',
        
      }
    },
  },
  plugins: [],
}
