const DEFAULT_ORIGIN = "https://voltcalc-lake.vercel.app";

(function () {
  const script = document.currentScript;
  if (!script) return;

  const targetId = script.getAttribute("data-target") || "voltcalc-widget";
  const src = script.getAttribute("data-src") || `${DEFAULT_ORIGIN}/embed.html`;
  const container = document.getElementById(targetId);
  if (!container || container.dataset.voltcalcMounted === "1") return;
  container.dataset.voltcalcMounted = "1";

  const cfg = {
    client: container.dataset.client || "",
    primaryColor: container.dataset.primaryColor || "",
    accentColor: container.dataset.accentColor || "",
    logoText: container.dataset.logoText || "",
    language: container.dataset.language || "en",
    theme: container.dataset.theme || "light",
    minHeight: container.dataset.minHeight || "600",
  };

  const url = new URL(src, window.location.href);
  url.searchParams.set("embed", "1");
  Object.entries(cfg).forEach(([k, v]) => v && url.searchParams.set(k, v));

  const iframe = document.createElement("iframe");
  iframe.title = "VoltCalc EV Cost Calculator";
  iframe.src = url.toString();
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.allow = "clipboard-write";
  iframe.style.cssText = `width:100%;border:0;display:block;min-height:${cfg.minHeight}px;height:${cfg.minHeight}px;overflow:hidden;background:transparent;`;

  container.style.width = "100%";
  container.appendChild(iframe);

  const expectedOrigin = new URL(url.toString()).origin;
  let lastHeight = 0;

  function onMessage(event) {
    if (event.origin !== expectedOrigin) return;
    const data = event.data;
    if (!data || data.source !== "voltcalc" || data.type !== "resize") return;
    const height = Number(data.height);
    if (!Number.isFinite(height) || height < 300 || height === lastHeight)
      return;
    lastHeight = height;
    iframe.style.height = `${height}px`;
  }

  window.addEventListener("message", onMessage);
})();
