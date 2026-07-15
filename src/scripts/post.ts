const COPY_RESET_DELAY = 900;

let scrollUpdatePending = false;

function getScrollProgress() {
  const root = document.documentElement;
  const scrollTotal = root.scrollHeight - root.clientHeight;

  if (scrollTotal <= 0) return 0;
  return Math.min(Math.max(root.scrollTop / scrollTotal, 0), 1);
}

function updateScrollUI() {
  const scrollProgress = getScrollProgress();
  const scrollPercent = Math.round(scrollProgress * 100);
  const readingProgressBar = document.querySelector<HTMLElement>(
    "[data-reading-progress-bar]"
  );
  const buttonContainer =
    document.querySelector<HTMLElement>("#btt-btn-container");
  const progressIndicator = document.querySelector<HTMLElement>(
    "#progress-indicator"
  );

  if (readingProgressBar) {
    readingProgressBar.style.width = `${scrollPercent}%`;
  }

  if (progressIndicator) {
    progressIndicator.style.backgroundImage = `conic-gradient(var(--accent), var(--accent) ${scrollPercent}%, transparent ${scrollPercent}%)`;
  }

  if (buttonContainer) {
    const isVisible = scrollProgress > 0.3;
    buttonContainer.classList.toggle("opacity-100", isVisible);
    buttonContainer.classList.toggle("translate-y-0", isVisible);
    buttonContainer.classList.toggle("opacity-0", !isVisible);
    buttonContainer.classList.toggle("translate-y-14", !isVisible);
  }
}

function scheduleScrollUpdate() {
  if (scrollUpdatePending) return;

  scrollUpdatePending = true;
  window.requestAnimationFrame(() => {
    updateScrollUI();
    scrollUpdatePending = false;
  });
}

function addHeadingLinks() {
  const headings = document.querySelectorAll<HTMLElement>(
    "#article h2, #article h3, #article h4, #article h5, #article h6"
  );

  for (const heading of headings) {
    if (!heading.id || heading.querySelector(":scope > .heading-link"))
      continue;

    heading.classList.add("group");

    const link = document.createElement("a");
    link.className =
      "heading-link ms-2 no-underline opacity-75 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100";
    link.href = `#${heading.id}`;
    link.ariaLabel = `链接到“${heading.textContent?.trim() ?? "此章节"}”`;

    const marker = document.createElement("span");
    marker.ariaHidden = "true";
    marker.textContent = "#";
    link.appendChild(marker);
    heading.appendChild(link);
  }
}

function setupCopyButtons() {
  const codeBlocks = document.querySelectorAll<HTMLElement>("#article pre");

  for (const codeBlock of codeBlocks) {
    if (codeBlock.dataset.copyReady === "true") continue;
    codeBlock.dataset.copyReady = "true";
    codeBlock.tabIndex = 0;

    const wrapper = document.createElement("div");
    wrapper.className = "relative";

    const hasFileNameOffset =
      getComputedStyle(codeBlock)
        .getPropertyValue("--file-name-offset")
        .trim() !== "";
    const topClass = hasFileNameOffset ? "top-(--file-name-offset)" : "-top-3";

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = `copy-code absolute end-3 ${topClass} rounded border border-muted bg-muted px-2 py-1 text-xs leading-4 font-medium text-foreground`;
    copyButton.textContent = "复制";
    copyButton.ariaLabel = "复制代码";

    codeBlock.appendChild(copyButton);
    codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    copyButton.addEventListener("click", async () => {
      const code = codeBlock.querySelector("code")?.innerText ?? "";

      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = "已复制";
      } catch {
        copyButton.textContent = "复制失败";
      }

      window.setTimeout(() => {
        copyButton.textContent = "复制";
      }, COPY_RESET_DELAY);
    });
  }
}

function setupBackToTopButton() {
  const button = document.querySelector<HTMLButtonElement>(
    "[data-button='back-to-top']"
  );

  if (!button || button.dataset.ready === "true") return;

  button.dataset.ready = "true";
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupPostFeatures() {
  if (!document.querySelector("#article")) return;

  addHeadingLinks();
  setupCopyButtons();
  setupBackToTopButton();
  scheduleScrollUpdate();
}

document.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
document.addEventListener("astro:page-load", setupPostFeatures);

setupPostFeatures();
