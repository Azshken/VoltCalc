# VoltCalc

A lightweight web calculator for comparing yearly driving costs of **electric vehicles vs petrol, diesel, and hybrid cars**.

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

## Run locally

Just open `index.html` in your browser.

For a local dev server in WSL or Node:

```bash
npx serve .
```

Then open the local URL shown in the terminal.

## Project structure

```text
VoltCalc/
├── index.html
└── README.md
```

## Deployment

This project can be deployed easily on:

- Vercel
- GitHub Pages
- Netlify

Because it is fully static, no backend or build configuration is required.

## Use case

VoltCalc is intended for:

- EV savings comparison
- leasing or dealership landing pages
- lead generation widgets
- white-label calculator embeds

## Notes

This calculator is for informational purposes only. It does not include vehicle purchase price, maintenance, insurance, charging losses, or other ownership costs.
