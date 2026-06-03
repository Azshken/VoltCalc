export const evModels = [
  {
    model: "Tesla Model Y",
    variant: "Long Range RWD",
    segment: "SUV",
    color: "#e11d48",
    wltp: 12.7,
    c90: 15.0,
    c120: 19.5,
  },
  {
    model: "Tesla Model 3",
    variant: "Long Range RWD",
    segment: "Sedan",
    color: "#dc2626",
    wltp: 10.93,
    c90: 11.5,
    c120: 15,
  },
  {
    model: "Škoda Elroq",
    variant: "85 (77 kWh)",
    segment: "SUV",
    color: "#16a34a",
    wltp: 13.75,
    c90: 14,
    c120: 21,
  },
  {
    model: "Škoda Enyaq",
    variant: "85 (77 kWh) RWD",
    segment: "SUV",
    color: "#16a34a",
    wltp: 13.14,
    c90: 15.5,
    c120: 21,
  },
  {
    model: "Renault 4 E-Tech",
    variant: "52 kWh 150hp",
    segment: "Crossover",
    color: "#f59e0b",
    wltp: 12.71,
    c90: 14.69,
    c120: 19.92,
  },
  {
    model: "Renault 5 E-Tech",
    variant: "52 kWh 150hp",
    segment: "Hatchback",
    color: "#f59e0b",
    wltp: 13,
    c90: 14.69,
    c120: 22,
  },
  {
    model: "Hyundai Kona Electric",
    variant: "64.8 kWh Long Range",
    segment: "Crossover",
    color: "#0891b2",
    wltp: 12.72,
    c90: 16.83,
    c120: 22.82,
  },
  {
    model: "Hyundai IONIQ 6",
    variant: "84 kWh RWD",
    segment: "Sedan",
    color: "#0891b2",
    wltp: 12.05,
    c90: 13,
    c120: 19.02,
  },
  {
    model: "Hyundai IONIQ 5",
    variant: "84 kWh AWD",
    segment: "SUV",
    color: "#0891b2",
    wltp: 14.65,
    c90: 16.99,
    c120: 24.02,
  },
  {
    model: "Volkswagen ID.4",
    variant: "Pro (77 kWh)",
    segment: "SUV",
    color: "#2563eb",
    wltp: 14.56,
    c90: 14.5,
    c120: 21.5,
  },
  {
    model: "Volkswagen ID.3",
    variant: "Neo 79 kWh",
    segment: "Hatchback",
    color: "#2563eb",
    wltp: 12.56,
    c90: 14.99,
    c120: 22,
  },
  {
    model: "Kia EV6",
    variant: "Long Range RWD",
    segment: "Crossover",
    color: "#ea580c",
    wltp: 13.75,
    c90: 17.5,
    c120: 23.53,
  },
  {
    model: "Kia EV3",
    variant: "Long Range",
    segment: "SUV",
    color: "#ea580c",
    wltp: 13,
    c90: 15.99,
    c120: 21.97,
  },
  {
    model: "Dacia Spring",
    variant: "65HP",
    segment: "City",
    color: "#15803d",
    wltp: 11.36,
    c90: 13.96,
    c120: 22.94,
  },
  {
    model: "Volvo EX30",
    variant: "Single Motor ER",
    segment: "SUV",
    color: "#0f766e",
    wltp: 13.45,
    c90: 15.8,
    c120: 22,
  },
  {
    model: "MG MG4",
    variant: "Long Range",
    segment: "Hatchback",
    color: "#be123c",
    wltp: 14.18,
    c90: 14.92,
    c120: 20.9,
  },
  {
    model: "BYD Seal",
    variant: "82.5 kWh RWD",
    segment: "Sedan",
    color: "#0369a1",
    wltp: 15.87,
    c90: 21,
    c120: 25,
  },
  {
    model: "BMW iX1",
    variant: "eDrive20",
    segment: "SUV",
    color: "#1d4ed8",
    wltp: null,
    c90: null,
    c120: null,
  },
  {
    model: "BMW i4",
    variant: "eDrive40",
    segment: "Sedan",
    color: "#1d4ed8",
    wltp: null,
    c90: null,
    c120: null,
  },
  {
    model: "Peugeot e-208",
    variant: "54 kWh",
    segment: "Hatchback",
    color: "#9333ea",
    wltp: null,
    c90: null,
    c120: null,
  },
  {
    model: "Opel Corsa Electric",
    variant: "54 kWh",
    segment: "Hatchback",
    color: "#b45309",
    wltp: null,
    c90: null,
    c120: null,
  },
  {
    model: "Polestar 2",
    variant: "Long Range RWD",
    segment: "Fastback",
    color: "#065f46",
    wltp: null,
    c90: null,
    c120: null,
  },
];

export const state = {
  distance: 25000,
  fuelType: "petrol",
  petrolConsumption: 6.5,
  dieselConsumption: 6.0,
  hybridConsumption: 5.0,
  evConsumption: 17,
  petrolPrice: 1.75,
  dieselPrice: 1.65,
  hybridPrice: 1.65,
  electricityPrice: 0.173,
  evMode: "wltp",
  isEmbed: false,
  branding: {},
};

export const nf = (n, d = 2, locale = "en-GB") =>
  Number(n).toLocaleString(locale, {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });

export const isNumber = (v) => typeof v === "number" && Number.isFinite(v);
export const fuelLabel = (f) =>
  ({ petrol: "Petrol", diesel: "Diesel", hybrid: "Hybrid" })[f] || "Petrol";
export const fuelConsumption = () =>
  ({
    petrol: state.petrolConsumption,
    diesel: state.dieselConsumption,
    hybrid: state.hybridConsumption,
  })[state.fuelType];
export const fuelPrice = () =>
  ({
    petrol: state.petrolPrice,
    diesel: state.dieselPrice,
    hybrid: state.hybridPrice,
  })[state.fuelType];
export const evConsumptionFor = (ev) =>
  state.evMode === "90" ? ev.c90 : state.evMode === "120" ? ev.c120 : ev.wltp;
export const modeLabel = () =>
  state.evMode === "90"
    ? "kWh/100km at 90 km/h"
    : state.evMode === "120"
      ? "kWh/100km at 120 km/h"
      : "WLTP kWh/100km";
export const modeNote = () =>
  state.evMode === "90"
    ? "Mode: EVKX 90 km/h real-world cruise"
    : state.evMode === "120"
      ? "Mode: EVKX 120 km/h real-world cruise"
      : "Mode: WLTP combined";
