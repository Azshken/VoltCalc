import {
  state,
  evModels,
  isNumber,
  evConsumptionFor,
  modeLabel,
  modeNote,
} from "./voltcalc-core.js";
import { calc, updateSlider } from "./voltcalc-ui.js";
import { initTheme } from "./voltcalc-theme.js";
const $ = (id) => document.getElementById(id);
const qs = new URLSearchParams(location.search);
const isEmbed = qs.get("embed") === "1";
function sendHeight() {
  if (!isEmbed || window.parent === window) return;
  requestAnimationFrame(() =>
    window.parent.postMessage(
      {
        source: "voltcalc",
        type: "resize",
        height: document.documentElement.scrollHeight,
      },
      "*",
    ),
  );
}
function applyBranding() {
  const root = document.documentElement;
  const primary = qs.get("primaryColor");
  const accent = qs.get("accentColor");
  const logoText = qs.get("logoText");
  const lang = qs.get("lang") || "en";
  if (primary) {
    root.style.setProperty("--color-ev", primary);
    root.style.setProperty("--color-ev-hover", primary);
  }
  if (accent) {
    root.style.setProperty("--color-primary", accent);
    root.style.setProperty("--color-primary-hover", accent);
  }
  if (logoText) {
    const el = document.querySelector(".logo-text");
    if (el) el.textContent = logoText;
  }
  root.setAttribute("lang", lang);
  if (isEmbed) document.body.classList.add("voltcalc-embed");
  state.isEmbed = isEmbed;
}
function renderTable() {
  const tbody = $("evTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  evModels.forEach((ev, idx) => {
    const cons = evConsumptionFor(ev);
    const canUse = isNumber(cons);
    const yearly = canUse
      ? (state.distance / 100) * cons * state.electricityPrice
      : null;
    const tr = document.createElement("tr");
    tr.dataset.idx = String(idx);
    tr.innerHTML = `<td><div class='ev-model-cell'><span class='ev-category-dot' style='background:${ev.color}'></span><div><div class='ev-model-name'>${ev.model}</div><div class='ev-model-variant'>${ev.variant}</div></div></div></td><td>${ev.segment}</td><td><span class='cons-badge ${canUse ? (cons <= 15.5 ? "cons-great" : cons <= 17.5 ? "cons-good" : "cons-avg") : "cons-na"}'>${canUse ? cons.toFixed(2) : "NA"}</span></td><td><span class='yearly-cost-cell ${canUse ? "" : "na"}' id='evRowCost${idx}'>${canUse ? yearly.toFixed(0) : "NA"}</span></td><td><button class='use-btn' ${canUse ? "" : "disabled"} type='button'>Use</button></td>`;
    if (canUse) {
      tr.addEventListener("click", () => loadEV(idx));
      tr.querySelector(".use-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        loadEV(idx);
      });
    }
    tbody.appendChild(tr);
  });
}
function updateTableCosts() {
  evModels.forEach((ev, idx) => {
    const cons = evConsumptionFor(ev);
    const cell = $("evRowCost" + idx);
    if (!cell) return;
    if (isNumber(cons))
      cell.textContent = (
        (state.distance / 100) *
        cons *
        state.electricityPrice
      ).toFixed(0);
    else cell.textContent = "NA";
  });
}
function loadEV(idx) {
  const ev = evModels[idx];
  const cons = evConsumptionFor(ev);
  if (!isNumber(cons)) return;
  state.evConsumption = cons;
  $("evConsumptionVal").textContent = cons.toFixed(1);
  document
    .querySelectorAll("#evTableBody tr")
    .forEach((r) => r.classList.remove("selected-row"));
  document
    .querySelector(`#evTableBody tr[data-idx='${idx}']`)
    ?.classList.add("selected-row");
  calc();
  sendHeight();
}
export function initApp() {
  applyBranding();
  initTheme();
  renderTable();
  const slider = $("distanceSlider");
  const fuelTabs = document.querySelectorAll(".vc-tab");
  const stepperBtns = document.querySelectorAll("[data-stepper]");
  slider?.addEventListener("input", () => {
    state.distance = Number(slider.value);
    updateSlider();
    calc();
    updateTableCosts();
    sendHeight();
  });
  fuelTabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      fuelTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      state.fuelType = tab.dataset.fuel;
      const val =
        state.fuelType === "petrol"
          ? state.petrolConsumption
          : state.fuelType === "diesel"
            ? state.dieselConsumption
            : state.hybridConsumption;
      $("petrolConsumptionVal").textContent = val.toFixed(1);
      $("petrolPrice").value =
        state.fuelType === "petrol"
          ? state.petrolPrice
          : state.fuelType === "diesel"
            ? state.dieselPrice
            : state.hybridPrice;
      calc();
      sendHeight();
    }),
  );
  stepperBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const kind = btn.dataset.stepper;
      const delta = Number(btn.dataset.delta);
      if (kind === "fuel") {
        const key = `${state.fuelType}Consumption`;
        state[key] =
          Math.round(Math.max(1, Math.min(30, state[key] + delta)) * 10) / 10;
        $("petrolConsumptionVal").textContent = state[key].toFixed(1);
      } else {
        state.evConsumption =
          Math.round(
            Math.max(5, Math.min(40, state.evConsumption + delta)) * 10,
          ) / 10;
        $("evConsumptionVal").textContent = state.evConsumption.toFixed(1);
      }
      calc();
      updateTableCosts();
      sendHeight();
    }),
  );
  ["petrolPrice", "electricityPrice"].forEach((id) =>
    $(id)?.addEventListener("input", (e) => {
      const v = Number(e.target.value);
      if (!Number.isFinite(v) || v < 0) return;
      if (id === "electricityPrice") state.electricityPrice = v;
      else if (state.fuelType === "petrol") state.petrolPrice = v;
      else if (state.fuelType === "diesel") state.dieselPrice = v;
      else state.hybridPrice = v;
      calc();
      updateTableCosts();
      sendHeight();
    }),
  );
  $("tableModeBtn")?.addEventListener("click", () => {
    state.evMode =
      state.evMode === "wltp" ? "90" : state.evMode === "90" ? "120" : "wltp";
    $("tableModeBtn").textContent = modeLabel();
    $("evTableModeNote").textContent = modeNote();
    renderTable();
    updateTableCosts();
    sendHeight();
  });
  updateSlider();
  calc();
  updateTableCosts();
  setTimeout(sendHeight, 50);
  window.addEventListener("resize", sendHeight);
}
