// fade-in + color cycle + basic song highlighting
window.addEventListener("DOMContentLoaded", () => {
  // fade-in
  setTimeout(() => document.body.classList.remove("not-loaded"), 800);

  const iframes = Array.from(document.querySelectorAll(".songs iframe"));
  const flowersContainer = document.querySelector(".flowers");

  // color palette pairs (flower primary, secondary)
  const colorPairs = [
    ["#ffb6c1", "#d8b4f8"],
    ["#a0c4ff", "#bde0fe"],
    ["#fddde6", "#fbcfe8"],
    ["#c084fc", "#f9a8d4"]
  ];

  let idx = 0;
  function applyColors(i){
    const [primary, secondary] = colorPairs[i % colorPairs.length];
    document.documentElement.style.setProperty("--flower-primary", primary);
    document.documentElement.style.setProperty("--flower-secondary", secondary);
    document.body.style.background = `linear-gradient(160deg, ${primary}, ${secondary}, #a0c4ff)`;
    flowersContainer.style.filter = `drop-shadow(0 0 25px ${primary})`;
    iframes.forEach(f => f.classList.remove("playing"));
    if (iframes[i % iframes.length]) iframes[i % iframes.length].classList.add("playing");
  }

  // init
  applyColors(idx);

  // cycle every 10s
  setInterval(() => { idx = (idx + 1) % colorPairs.length; applyColors(idx); }, 10000);

  // attempt autoplay for first iframe (may be blocked by browsers)
  if (iframes[0]) {
    try {
      const url = new URL(iframes[0].src);
      if (!url.searchParams.get("auto_play")) {
        url.searchParams.set("auto_play", "true");
        iframes[0].src = url.toString();
      }
    } catch (e) { /* ignore */ }
  }

  // pointerenter on iframes sets color to that song index (visual sync)
  iframes.forEach((frame, i) => {
    frame.addEventListener("pointerenter", () => {
      idx = i;
      applyColors(idx);
    });
  });
});
