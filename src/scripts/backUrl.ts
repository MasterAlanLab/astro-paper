document.addEventListener("astro:page-load", () => {
  const el = document.querySelector<HTMLElement>("[data-backurl]");
  const backUrl = el?.dataset?.backurl;
  if (backUrl) {
    sessionStorage.setItem("backUrl", backUrl);
  }
});
