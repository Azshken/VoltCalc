import {
  state,
  nf,
  fuelLabel,
  fuelConsumption,
  fuelPrice,
} from "./voltcalc-core.js";

const el = (id) => document.getElementById(id);

export function calc() {
  const km = state.distance;
  const fuelCons = fuelConsumption();
  const fPrice = fuelPrice();
  const evCons = state.evConsumption;
  const elecPrice = state.electricityPrice;
  const petrolCostPer100 = fuelCons * fPrice;
  const evCostPer100 = evCons * elecPrice;
  const petrolCost = (km / 100) * petrolCostPer100;
  const evCost = (km / 100) * evCostPer100;
  const savings = petrolCost - evCost;
  const monthly = savings / 12;
  const evkWh = (km / 100) * evCons;

  el("petrolPer100").textContent = nf(petrolCostPer100);
  el("evPer100").textContent = nf(evCostPer100);
  el("petrolTotal").textContent = nf(petrolCost);
  el("evTotal").textContent = nf(evCost);
  el("savingsAmount").textContent = `${nf(savings)} EUR`;
  el("savingsSub").textContent =
    `vs. ${fuelLabel(state.fuelType)} · ${nf(km, 0)} km/year`;
  el("statMonthly").textContent = `${nf(monthly)} EUR`;
  el("statEVkWh").textContent = `${nf(evkWh, 0)} kWh`;
  el("statSavings5yr").textContent = `${nf(savings * 5)} EUR`;
  el("evConsUnit").textContent =
    state.evMode === "wltp" ? "kWh/100km" : modeLabel();

  const banner = el("savingsBanner");
  const label = el("savingsLabel");
  if (savings < 0) {
    banner.style.background = "linear-gradient(135deg,#d97706 0%,#b45309 100%)";
    label.textContent = "Higher yearly cost with an electric vehicle";
  } else {
    banner.style.background =
      "linear-gradient(135deg,var(--color-ev) 0%,var(--color-primary) 100%)";
    label.textContent = "Annual savings with an electric vehicle";
  }
}

export function updateSlider() {
  const slider = el("distanceSlider");
  const fill = el("sliderFill");
  const display = el("distanceDisplay");
  const min = Number(slider.min);
  const max = Number(slider.max);
  const val = Number(slider.value);
  fill.style.width = `${((val - min) / (max - min)) * 100}%`;
  display.textContent = `${nf(val, 0)} km / year`;
}
