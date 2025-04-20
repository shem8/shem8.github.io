// Create middle post ad
function createMiddleAd() {
  const adContainer = document.createElement("div");

  const ins = document.createElement("ins");
  ins.className = "adsbygoogle";
  ins.style.display = "block";
  ins.setAttribute("data-ad-client", "ca-pub-5508892730714185");
  ins.setAttribute("data-ad-slot", "8208560155");
  ins.setAttribute("data-ad-format", "auto");

  adContainer.appendChild(ins);

  (adsbygoogle = window.adsbygoogle || []).push({});

  return adContainer;
}
