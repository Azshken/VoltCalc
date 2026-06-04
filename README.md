# VoltCalc

A lightweight web calculator for comparing yearly driving costs of **electric vehicles vs petrol, diesel, and hybrid cars**.

### Live demo: https://voltcalc-lake.vercel.app/

## Features

- Compare yearly running costs based on:
  - annual distance
  - fuel or electricity price
  - vehicle consumption
- Adjust petrol, diesel, hybrid, and EV consumption manually
- See live **cost per 100 km** and **yearly total cost**
- View **monthly EV savings** and **5-year savings**
- Browse a table of popular EV models with WLTP consumption data
- Click a model to load its consumption into the calculator
- Responsive UI inspired by the ČSOB EV calculator design
- Light and dark mode support

## Tech

- Plain HTML
- CSS
- Vanilla JavaScript

No framework, no build step, and no dependencies.

# VoltCalc

VoltCalc is a static B2B EV running-cost calculator with iframe embed support, per-client branding, and a modular front-end structure.

## What it does

- Compares yearly running costs for EVs vs petrol, diesel, and hybrid cars.
- Calculates cost per 100 km, yearly total cost, monthly EV savings, and 5-year savings.
- Lets users change annual distance, fuel prices, and consumption values.
- Shows a table of EV models with WLTP and real-world consumption modes.
- Supports white-label embeds through a separate `embed.html` page and `embed.js` loader.
- Supports responsive layout and light/dark theme switching.

## Project layout

```text
VoltCalc/
├── index.html
├── embed.html
├── embed.js
├── README.md
├── LICENSE.md
└── assets/
    ├── voltcalc.css
    ├── voltcalc-core.js
    ├── voltcalc-ui.js
    ├── voltcalc-theme.js
    └── voltcalc-app.js
```

Then open the local URL shown in the terminal.

## Local testing

Run a static server from the project root:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html` for the full app.
- `http://localhost:8000/embed.html` for the iframe version.

For a local dev server in WSL or Node:

```bash
npx serve .
```

## Embed usage

Example customer snippet:

```html
<div
  id="voltcalc-widget"
  data-client="dealer-123"
  data-primary-color="#0f9e6e"
  data-accent-color="#007c8c"
  data-logo-text="ACME Motors"
  data-language="en"
  data-theme="light"
  data-min-height="600"
></div>
<script
  src="https://your-domain.com/embed.js"
  async
  data-target="voltcalc-widget"
></script>
```

## Deployment

This project is suitable for static hosting on:

- Vercel
- GitHub Pages
- Netlify

For B2B use, keep the repo public for credibility, but protect commercial usage with a license.

## License

VoltCalc is released under the Business Source License 1.1. Commercial use requires a separate license from the copyright holder.

## Disclaimer

VoltCalc is for informational purposes only. It does not include vehicle purchase price, maintenance, insurance, charging losses, or other ownership costs.
